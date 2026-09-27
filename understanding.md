# Understanding DressingWala (Business & Operations)

This document provides a comprehensive overview of the **DressingWala** business model, operational workflows, services, and pricing structure. 

## 1. Business Overview
**DressingWala** is a premium, on-demand home healthcare service based in Hyderabad, specializing in wound dressing and post-surgery care. The service bridges the gap between patients needing professional clinical care and verified healthcare professionals (nurses, technicians, doctors) who can deliver sterile treatments directly at the patient's home.

## 2. Services & Pricing Structure
DressingWala offers transparent, "starting from" pricing. The final charge is determined by the base price of the service, the travel distance (calculated dynamically via Google Maps API), and any specialty dressing materials required (billed at MRP).

### Core Services
- **Simple Wound Dressing (Starts at ₹599):** Care for cuts, abrasions, and minor injuries using sterile techniques.
- **Diabetic Foot Wounds (Starts at ₹799):** Specialized dressings and continuous wound monitoring for diabetic patients.
- **Post Surgery Dressing (Starts at ₹899):** Monitoring of post-operative sites, drain checks, and sterile care.
- **Suture / Staple Removal (Starts at ₹999):** Gentle and clean removal following a surgeon's clearance.
- **Complex / Large Wounds (Starts at ₹1,499):** Advanced dressings for severe cases like burns, trauma, poly-trauma open wounds, and pressure sores.
- **IV / Injection & Catheter Care:** Administering IM/IV injections, catheter, and colostomy care at home.

*Note: Emergency slots are kept open for urgent requirements like post-op bleeds or unplanned wound care (excluding life-threatening situations where 108 is required).*

## 3. Core Value Propositions
- **100% Verified Professionals:** Every clinician undergoes rigorous identity checks, credential verification (licenses/experience), and continuous training in modern aseptic techniques.
- **Same-Day Service:** Bookings made before 3 PM guarantee same-day visits.
- **Sterile & Discreet:** The service uses single-use kits to ensure privacy and safety in the patient's home.
- **Transparent Quotes:** Customers receive a clear, itemized quote (Base Price + Travel Charge) before the service begins.

## 4. Operational Workflow & Automation
The entire booking and dispatch operation is highly automated using a centralized workflow engine (n8n) integrated with WhatsApp (Twilio), Maps, and Payment gateways.

### Phase 1: Customer Onboarding & Booking
1. **Initiation:** The customer starts the booking process via the Website or a WhatsApp message.
2. **Interactive Chat:** An automated WhatsApp bot collects the customer's details sequentially: Name -> Email -> Address -> Live Location Pin.
3. **Requirement Gathering:** The customer selects the required service, uploads pictures of the wound or a doctor's prescription, and selects a preferred time slot.
4. **Quotation:** The system calculates the distance from the nearest clinic/hub to the customer's location. It computes the total price (`Base Price + (Distance * Rate Per Km)`) and sends an itemized bill for confirmation.

### Phase 2: Doctor Matching & Dispatch
1. **Sequential Dispatch:** Once the customer confirms, the system identifies available doctors/nurses and sorts them by distance.
2. **Offer Loop:** The system sends an automated offer to the nearest professional (showing earning potential and distance). They have 60 seconds to accept or decline.
   - If accepted: The doctor is assigned.
   - If declined/timeout: The system automatically routes the offer to the next closest professional.
3. **Customer Notification:** The customer receives the assigned professional's details, ETA, and a tracking link.

### Phase 3: Service Lifecycle & Payments
The assigned professional updates the system via WhatsApp keywords:
- **`START`**: Professional is on the way (Customer receives ETA).
- **`ARRIVED`**: Professional reaches the location.
- **`BEGIN`**: Treatment starts.
- **`DONE`**: Service is completed. 
- **Payment & Invoice:** A payment link (Razorpay) or cash collection prompt is generated. Upon successful payment, an invoice is generated and a feedback collection flow is triggered.
- **Earnings Update:** The professional's dashboard is instantly updated with their earnings for that visit.

## 5. Coverage Areas (Hyderabad)
DressingWala currently serves major localities in Hyderabad and Secunderabad, including:
Gachibowli, Madhapur, Hitech City, Kondapur, Kukatpally, Banjara Hills, Jubilee Hills, Begumpet, Secunderabad, Ameerpet, Uppal, LB Nagar, Miyapur, Manikonda, Financial District, and Attapur.
