// TODO: Replace placeholders with the real DressingWala phone & WhatsApp numbers.
export const CONTACT = {
  phone: "+919966255559",
  phoneDisplay: "+91 99662 55559",
  whatsapp: "919966255559", // international format, no + or spaces
  email: "care.admin@dressingwala.com",
  city: "Hyderabad",
};

export const waLink = (message = "Hi DressingWala, I'd like to book a home dressing.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = () => `tel:${CONTACT.phone}`;
