import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, MapPin, FileText, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/contact";

const SERVICES = [
  "Simple Wound Dressing",
  "Diabetic Foot Wound",
  "Post Surgery Dressing",
  "Suture / Staple Removal",
  "Complex / Large Wounds",
];

const TIME_SLOTS = [
  "Morning (8–11 AM)",
  "Late Morning (11 AM–1 PM)",
  "Afternoon (1–4 PM)",
  "Evening (4–7 PM)",
  "Night (7–10 PM)",
  "ASAP / Emergency",
];

const AREAS = [
  "Gachibowli", "Madhapur", "Hitech City", "Kondapur", "Kukatpally", "Banjara Hills",
  "Jubilee Hills", "Begumpet", "Secunderabad", "Ameerpet", "Uppal", "LB Nagar",
  "Miyapur", "Manikonda", "Financial District", "Attapur", "Other",
];

type Form = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  area: string;
  address: string;
  notes: string;
};

const empty: Form = {
  name: "", phone: "", service: SERVICES[0], date: "", time: TIME_SLOTS[0],
  area: AREAS[0], address: "", notes: "",
};

export function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = () => { setOpen(true); setSent(false); };
    window.addEventListener("open-booking", handler);
    return () => window.removeEventListener("open-booking", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const today = new Date().toISOString().split("T")[0];

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const canSubmit = form.name.trim().length >= 2 && /^[+\d\s-]{7,}$/.test(form.phone) && form.date && form.time && form.area;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const msg =
`Hi DressingWala, I'd like to book a home dressing 🙏

👤 Name: ${form.name}
📱 Phone: ${form.phone}
🩹 Service: ${form.service}
📅 Date: ${form.date}
⏰ Preferred time: ${form.time}
📍 Area: ${form.area}
🏠 Address / Landmark: ${form.address || "(will share on WhatsApp)"}
📝 Notes: ${form.notes || "-"}

Please confirm availability. Thank you!`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Book home dressing"
            className="fixed z-[61] inset-x-3 top-[5vh] bottom-[5vh] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] md:max-h-[90vh]
                       bg-card border rounded-3xl shadow-lift flex flex-col overflow-hidden"
          >
            <header className="flex items-center gap-3 px-5 py-4 border-b bg-gradient-brand text-primary-foreground shrink-0">
              <div className="grid place-items-center w-10 h-10 rounded-2xl bg-white/20">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold">Book Home Dressing</div>
                <div className="text-xs opacity-90">Fill in details — we'll confirm on WhatsApp</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {sent ? (
              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal/15 text-teal grid place-items-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl">Redirecting to WhatsApp…</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Your booking details are pre-filled. Just hit send on WhatsApp and our team will confirm your appointment within minutes.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" onClick={() => { setSent(false); }}>Edit details</Button>
                  <Button onClick={() => { setOpen(false); setForm(empty); }}>Done</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
                <Field label="Full name" icon={<User className="w-4 h-4" />}>
                  <input
                    required minLength={2} maxLength={80}
                    value={form.name} onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="input"
                  />
                </Field>

                <Field label="Phone number" icon={<Phone className="w-4 h-4" />}>
                  <input
                    required type="tel" pattern="[+\d\s\-]{7,}" maxLength={20}
                    value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 98xxxxxxxx"
                    className="input"
                  />
                </Field>

                <Field label="Service required">
                  <select value={form.service} onChange={(e) => update("service", e.target.value)} className="input">
                    {SERVICES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Preferred date" icon={<Calendar className="w-4 h-4" />}>
                    <input
                      required type="date" min={today} value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className="input"
                    />
                  </Field>
                  <Field label="Preferred time" icon={<Clock className="w-4 h-4" />}>
                    <select value={form.time} onChange={(e) => update("time", e.target.value)} className="input">
                      {TIME_SLOTS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Area" icon={<MapPin className="w-4 h-4" />}>
                  <select value={form.area} onChange={(e) => update("area", e.target.value)} className="input">
                    {AREAS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </Field>

                <Field label="Address / landmark (optional)">
                  <input
                    maxLength={200}
                    value={form.address} onChange={(e) => update("address", e.target.value)}
                    placeholder="Flat, building, landmark…"
                    className="input"
                  />
                </Field>

                <Field label="Notes for the nurse (optional)" icon={<FileText className="w-4 h-4" />}>
                  <textarea
                    rows={3} maxLength={400}
                    value={form.notes} onChange={(e) => update("notes", e.target.value)}
                    placeholder="Wound details, prescription info, allergies…"
                    className="input resize-none"
                  />
                </Field>

                <p className="text-xs text-muted-foreground">
                  On submit, we'll open WhatsApp with your details pre-filled. Final charges depend on wound type, materials, distance and clinician assessment.
                </p>

                <div className="flex gap-2 pt-1">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" disabled={!canSubmit} className="flex-1 bg-gradient-brand">
                    <Send className="w-4 h-4 mr-2" /> Send booking
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          font-size: 0.875rem;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          outline: none;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </AnimatePresence>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 mb-1.5">
        {icon}{label}
      </span>
      {children}
    </label>
  );
}

export function openBooking() {
  window.dispatchEvent(new Event("open-booking"));
}
