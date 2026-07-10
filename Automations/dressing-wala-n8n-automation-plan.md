# Dressing Wala — n8n Automation Plan

A complete, implementation-ready plan for automating the Dressing Wala booking flow (WhatsApp + Website) using n8n, Firebase Firestore, Twilio, Google Maps, and Razorpay.

---

## 1. High-Level Architecture

```
Customer (WhatsApp / Website)
        │
        ▼
   Twilio WhatsApp API  ◄────────────┐
        │                            │
        ▼                            │
   n8n (Main Workflow + Sub-Workflows)
        │
        ├──► Firebase Firestore (data store)
        ├──► Google Maps API (Geocoding / Routes)
        ├──► Razorpay (payments)
        ├──► AWS S3 (invoices, images — Phase 2)
        └──► Admin Dashboard (notifications)
```

**Design principle:** Build this as **one main workflow** that triggers **multiple sub-workflows** (Execute Workflow node) rather than one giant linear flow. This keeps it maintainable and lets you re-trigger a customer at any state (e.g., after a reply) without replaying the whole flow.

Recommended sub-workflows:
1. `SW - Customer Onboarding`
2. `SW - Location & Address Resolution`
3. `SW - Service Selection & Pricing`
4. `SW - Payment Handling`
5. `SW - Doctor Matching & Dispatch`
6. `SW - Booking Lifecycle (Start/Arrive/Begin/Done)`
7. `SW - Invoice Generation`
8. `SW - Feedback Collection`
9. `SW - Error/Reminder Handler`

---

## 2. Trigger Layer

| Trigger | n8n Node | Notes |
|---|---|---|
| WhatsApp message in | **Webhook** node (Twilio callback URL) | Twilio sends `From`, `Body`, `Latitude`/`Longitude` (if location shared) as POST params |
| Website booking | **Webhook** node (separate path, e.g. `/website-booking`) | Normalize payload to same internal schema as WhatsApp so downstream logic is shared |

**Best practice:** Immediately after the Webhook node, add a **Set** node to normalize both entry points into one common JSON shape:
```json
{
  "channel": "whatsapp" | "website",
  "phone": "+91xxxxxxxxxx",
  "message": "raw text",
  "lat": null,
  "lng": null
}
```
This lets everything downstream be channel-agnostic.

---

## 3. Customer Identification & Registration

### 3.1 Check Existing Customer
```
Webhook → Set (normalize) → Firestore (Get: customers, where phone = X)
   → IF (document exists)
        TRUE  → Merge (load customer profile) → Go to Section 4 (Booking Flow)
        FALSE → Go to Section 3.2 (Register Customer)
```

**Firestore node config:** Operation = `Get`, Collection = `customers`, Query field = `phone`, Query value = `{{$json.phone}}`.

### 3.2 Register New Customer (conversation state machine)

Since WhatsApp is asynchronous (one message per webhook call), registration must be modeled as a **state machine stored in Firestore**, not a single linear n8n run.

Add a field on the customer/session document: `onboarding_step`.

| Step | Bot Asks | On Reply |
|---|---|---|
| `ASK_NAME` | "What's your name?" | Save `name`, set step → `ASK_EMAIL` |
| `ASK_EMAIL` | "Email (optional, reply SKIP)" | Save `email` or null, set step → `ASK_ADDRESS` |
| `ASK_ADDRESS` | "Your address?" | Save `address`, set step → `ASK_LOCATION` |
| `ASK_LOCATION` | "Please share your live location 📍" | Save `lat`/`lng` from WhatsApp location payload, set step → `DONE` |

**n8n implementation pattern:**
```
Webhook → Firestore(Get session) → Switch (on onboarding_step)
   ├─ ASK_NAME    → Save name  → Twilio(Send: Ask Email) → Firestore(Update step)
   ├─ ASK_EMAIL   → Save email → Twilio(Send: Ask Address) → Firestore(Update step)
   ├─ ASK_ADDRESS → Save addr  → Twilio(Send: Ask Location) → Firestore(Update step)
   └─ ASK_LOCATION→ Save lat/lng → Firestore(Write customers doc) → Proceed to Section 4
```

Use a **Switch** node keyed on `onboarding_step` — this is the cleanest way to implement a chat wizard in n8n without complex branching.

---

## 4. Location Resolution

```
Trigger: lat/lng received (from onboarding OR new booking with location share)
   ↓
HTTP Request → Google Geocoding API
   (reverse geocode: latlng={{lat}},{{lng}})
   ↓
Set node → extract formatted_address, city, pincode
   ↓
Firestore Update → customers/{id}
   { lat, lng, formatted_address }
```

**Node:** HTTP Request, Method GET, URL:
`https://maps.googleapis.com/maps/api/geocode/json?latlng={{lat}},{{lng}}&key={{$credentials.googleMapsApiKey}}`

Store the Google Maps API key in **n8n Credentials**, not hardcoded in the URL.

---

## 5. Service Selection

```
Twilio Send Menu:
  1. Dressing
  2. Injection
  3. Catheter
  4. Home Nurse
  5. Physiotherapy
   ↓
Webhook (reply) → Switch (on numeric reply 1–5)
   ↓
Firestore Update → bookings/{bookingId}.service = <selected>
```

Create the `bookings` document **at this point** (not earlier), with:
```json
{
  "customer_id": "...",
  "phone": "...",
  "service": "Dressing",
  "status": "REGISTERED",
  "created_at": "timestamp"
}
```

---

## 6. Preferred Time

```
Twilio Send Menu: Now / Today Evening / Tomorrow / Custom
   ↓
IF Custom → Ask for free-text date/time → parse with a Function/Code node
   ↓
Firestore Update → bookings/{id}.preferred_time
```

---

## 7. Pricing Calculation

```
Firestore Get → services/{service} → base_price
   ↓
HTTP Request → Google Routes API (Distance Matrix)
   origin = clinic/doctor hub lat,lng
   destination = customer lat,lng
   ↓
Code node → compute:
   travel_charge = distance_km * rate_per_km
   total = base_price + travel_charge
   ↓
Firestore Update → bookings/{id} { base_price, travel_charge, total }
   ↓
Twilio Send → itemized bill to customer
```

Example message template (build with a **Set**/**Code** node so amounts are dynamic, not hardcoded):
```
Consultation: ₹{{consultation}}
Travel: ₹{{travel}}
{{service}}: ₹{{servicePrice}}
-----------------
Total: ₹{{total}}

Reply YES to confirm or NO to cancel.
```

---

## 8. Customer Confirmation

```
Webhook (reply) → IF reply == "NO"
   TRUE  → Firestore Update status = CANCELLED → Twilio "Booking cancelled" → END
   FALSE (YES) → Continue to Payment
```

---

## 9. Payment Handling

```
Twilio Send Menu: Cash / UPI / Card
   ↓
Switch
   ├─ Cash → Firestore Update payment_status = PENDING → go to Section 10
   └─ Online (UPI/Card) →
        HTTP Request → Razorpay: Create Payment Link
        ↓
        Twilio Send → payment link to customer
        ↓
        Webhook (Razorpay callback / payment webhook) → Verify signature
        ↓
        Firestore Update payment_status = SUCCESS
        ↓
        Continue to Section 10
```

**Note (Phase 2 — marked "Later" in spec):** Razorpay integration can initially be stubbed; route straight to "Cash/Pending" until this is built. Keep the Switch branch in place so it's a drop-in later.

---

## 10. Nearest Doctor Matching & Sequential Dispatch

This is the most complex part of the workflow — implement as its own sub-workflow with a **loop**.

```
Firestore Get (List) → doctors WHERE availability = "Available"
   ↓
Loop Over Items (Split In Batches, batch size 1) — OR compute all at once:
   ↓
For each doctor → HTTP Request → Google Routes API
   (doctor location → customer location)
   ↓
Aggregate → Sort by distance ascending
   ↓
Set → doctorQueue = [sorted list], currentIndex = 0
   ↓
Firestore Update bookings/{id}.doctorQueue
```

### Sequential Offer Loop
```
Function/Code: get doctorQueue[currentIndex]
   ↓
Twilio Send to Doctor:
  "New Booking
   Customer: {{name}}
   Service: {{service}}
   Distance: {{distance}} KM
   Earning: ₹{{earning}}
   Reply 1 to Accept, 2 to Decline"
   ↓
Wait node (60 seconds) — OR Webhook wait pattern (see note below)
   ↓
Firestore Get → check if doctor replied within window
   ↓
Switch:
   ├─ Reply = 1 (Accept) → Assign doctor → Firestore Update → Notify Customer → EXIT LOOP
   ├─ Reply = 2 (Decline) → currentIndex++ → loop back to offer next doctor
   └─ No reply (timeout) → currentIndex++ → loop back
   ↓
IF currentIndex >= doctorQueue.length (nobody accepted)
   → Notify Admin (Twilio/Email) → Manual Assignment flow
```

**Important n8n implementation detail:** n8n's `Wait` node pauses the *entire workflow execution* — this works, but for a 60-second wait per doctor across many doctors it's fine. However, doctor replies come in via a **separate Webhook call** (their WhatsApp reply). Two common patterns:

- **Pattern A (Wait + Webhook resume):** Use n8n's `Wait` node configured to resume on a webhook call. When the doctor replies, their message hits a resume webhook that matches this specific execution, waking it up immediately (instead of waiting the full 60s).
- **Pattern B (Polling state machine):** Store `offer_status: PENDING`, `offered_to: doctorId`, `offer_expires_at: timestamp` on the booking. The doctor's reply webhook independently updates this doc. A **Cron-triggered workflow** runs every 10–15 seconds, checks for expired/declined offers, and advances the queue.

**Recommendation:** Use **Pattern A** for instant accept/decline responsiveness, with **Pattern B as the timeout fallback** (a scheduled workflow checks for offers that timed out and auto-advances).

---

## 11. Booking Assignment & Customer Notification

```
Firestore Update bookings/{id}:
   { doctor_id, status: "DOCTOR ASSIGNED" }
   ↓
Firestore Get doctor profile (name, phone)
   ↓
Twilio Send to Customer:
   "Doctor Assigned: {{name}}
    Phone: {{phone}}
    ETA: {{eta}}
    Track: {{googleMapsLink}}"
```

---

## 12. Live Status Updates (Doctor-Driven State Machine)

Each of these is a **Webhook trigger listening for a specific keyword from the doctor's WhatsApp number**, matched against their currently assigned booking.

| Doctor Sends | Action | Firestore Status | Customer Notified |
|---|---|---|---|
| `START` | Log trip start | `DOCTOR STARTED` | "Doctor started, ETA 20 min" |
| `ARRIVED` | Log arrival | `DOCTOR ARRIVED` | "Doctor has arrived" |
| `BEGIN` | Log treatment start | `TREATMENT STARTED` | (optional) |
| `DONE` | Log completion + timestamp | `COMPLETED` | Proceeds to Invoice |

**Implementation:** One Webhook → **Switch** node on keyword (`START`/`ARRIVED`/`BEGIN`/`DONE`) → each branch does a Firestore Update + Twilio Send. Look up the doctor's **active booking** via `bookings WHERE doctor_id = X AND status NOT IN (COMPLETED, CANCELLED)`.

---

## 13. Invoice Generation

```
Trigger: status = COMPLETED
   ↓
HTTP Request / Code node → generate invoice PDF
   (use a PDF generation service or an n8n "HTML to PDF" approach)
   ↓
HTTP Request → Upload to AWS S3 (Phase 2)
   ↓
Firestore Update bookings/{id}.invoice_url
   ↓
Twilio Send → invoice link to customer
```

*(Marked "Later" in the original spec — until S3 is wired up, generate the PDF and send it directly via Twilio media message instead of storing in S3.)*

---

## 14. Feedback Collection

```
After invoice sent → Twilio Send: "Rate your experience 1-5"
   ↓
Webhook (reply) → Firestore Save ratings/{id}
   ↓
Twilio Send: "Any comments? (optional, reply SKIP)"
   ↓
Webhook (reply) → Firestore Update ratings/{id}.comment
```

---

## 15. Doctor Earnings Update

```
Trigger: booking status = COMPLETED
   ↓
Firestore Update doctors/{id}:
   - increment today_earnings
   - increment monthly_earnings
   - increment completed_bookings count
```

Use Firestore's atomic **increment** operation (via the HTTP Request node calling Firestore REST API with `fieldTransforms`, since the standard n8n Firestore node may not expose atomic increments — verify node version, or use a Code node calling Firestore Admin SDK via a Function).

---

## 16. Admin Notification

```
Trigger: booking status = COMPLETED
   ↓
Twilio Send (Admin number):
   "Booking Completed
    Customer: {{name}}
    Doctor: {{doctorName}}
    Revenue: ₹{{total}}"
   ↓
Firestore Update admins/dashboard-summary (revenue totals)
```

---

## 17. Firestore Collections Schema

| Collection | Key Fields |
|---|---|
| `customers` | phone, name, email, address, lat, lng, formatted_address, onboarding_step |
| `doctor` | name, phone, availability, lat, lng, today_earnings, monthly_earnings, completed_bookings |
| `bookings` | customer_id, doctor_id, service, status, preferred_time, base_price, travel_charge, total, payment_status, doctorQueue, currentIndex, invoice_url, created_at, completed_at |
| `services` | name, base_price |
| `payments` | booking_id, method, amount, status, razorpay_ref |
| `ratings` | booking_id, customer_id, rating, comment |
| `notifications` | recipient, message, sent_at, type |
| `admins` | phone, dashboard-summary fields |

---

## 18. Booking State Machine

```
NEW → REGISTERED → LOCATION RECEIVED → PRICE CALCULATED → PAYMENT
   → SEARCHING DOCTOR → DOCTOR ASSIGNED → DOCTOR STARTED → DOCTOR ARRIVED
   → TREATMENT STARTED → COMPLETED → INVOICE SENT → FEEDBACK RECEIVED
```

Store this as the single source of truth field `bookings/{id}.status`. Every sub-workflow should:
1. Read current status before acting (idempotency guard).
2. Only transition forward (never reprocess a completed step) — add a guard IF node: `IF current_status != expected_previous_status → skip/log error`.

---

## 19. Error Handling Workflows

Build these as **separate always-on workflows**, not inline branches, so they run independently of the main flow.

| Scenario | Workflow | Logic |
|---|---|---|
| Customer doesn't reply | `SW - Reminder & Timeout` | Cron every 5 min → find bookings idle >5 min → send reminder; idle >30 min → auto-cancel |
| Doctor doesn't reply | Handled inline in dispatch loop (Section 10) | Auto-advance to next doctor |
| Payment failed | Razorpay webhook (failure event) | Firestore update `payment_status = FAILED` → Twilio "Retry payment" with new link |
| Google Maps API error | Error Trigger node on HTTP Request | Catch node → Notify Admin via Twilio/Email |
| Firestore error | Error Trigger / `Retry On Fail` (built into node settings) | Set retry = 3, wait between tries = 2–5s |
| Twilio error | `Retry On Fail` (node setting) | Set retry = 3 |

**n8n tip:** Every HTTP-based node (Firestore, Twilio, Google Maps, Razorpay) should have **"Retry On Fail"** enabled in node settings (3 retries, exponential backoff) as the first line of defense before falling back to a dedicated error workflow. Attach a workflow-level **Error Trigger** node that fires on any unhandled failure and pings the admin.

---

## 20. MVP Scope (Build This First)

Strip the plan down to only:
```
Customer WhatsApp → Twilio → n8n → Firestore
   → Google Maps (distance only) → Find Nearest Doctor (no queue sorting loop, just closest 1)
   → Doctor WhatsApp → Doctor Accepts → Customer Notified
   → Treatment (manual status updates OK) → Payment (Cash only) → Feedback → End
```

Defer for MVP: Razorpay, AWS S3, multi-doctor sequential dispatch loop, invoice PDF generation, admin dashboard automation, earnings aggregation.

---

## 21. Suggested Build Order

1. Twilio Webhook + normalize incoming message (Section 2)
2. Customer lookup + onboarding state machine (Section 3)
3. Location → Geocoding (Section 4)
4. Service + time selection (Sections 5–6)
5. Static pricing (skip distance-based travel charge initially) (Section 7, simplified)
6. Confirmation (Section 8)
7. Cash-only payment (Section 9, simplified)
8. Nearest single doctor + accept/decline (Section 10, simplified — no full queue yet)
9. Status updates START/ARRIVED/BEGIN/DONE (Section 12)
10. Feedback (Section 14)
11. Layer in: full doctor queue with timeout logic, Razorpay, invoicing, S3, earnings, admin dashboard

---

## 22. Future Features (Post-MVP Backlog)

- AI Wound Analysis (image classification model + AWS S3 image upload)
- Medicine Delivery integration
- Hospital tie-ups
- Nurse subscription plans
- One-tap repeat booking
- Doctor mobile app (push notifications instead of WhatsApp-only)
- Live GPS tracking during doctor transit
- Emergency SOS button
- Real-time doctor availability toggle (doctor self-service via WhatsApp command)
- Analytics dashboard for admin

---

## 23. Key n8n Nodes Reference

| Purpose | Node |
|---|---|
| Receive WhatsApp/Website events | Webhook |
| Conversation state branching | Switch |
| Conditional logic | IF |
| Call Firestore | HTTP Request (Firestore REST API) or community Firestore node |
| Call Google Maps | HTTP Request |
| Call Razorpay | HTTP Request |
| Send WhatsApp messages | Twilio node (or HTTP Request to Twilio API) |
| Pause/resume on external event | Wait |
| Scheduled checks (reminders, timeouts) | Cron / Schedule Trigger |
| Data shaping | Set / Code |
| Looping over doctor list | Split In Batches |
| Catching failures | Error Trigger |
| Reusable logic | Execute Workflow |

---

*This plan mirrors the original workflow spec exactly, mapped onto concrete n8n nodes, sub-workflow boundaries, and state-machine patterns needed to handle WhatsApp's asynchronous, multi-turn nature reliably.*
