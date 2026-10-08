import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Calendar, Bot, X } from "lucide-react";
import { AIAssistant } from "./ai-assistant";
import { CONTACT, waLink, telLink } from "@/lib/contact";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AIAssistant open={chatOpen} onOpenChange={setChatOpen} />

      {/* WhatsApp floating (always) */}
      <motion.a
        href={waLink("Hi DressingWala, I'd like to book a home dressing.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="hidden md:grid fixed bottom-6 right-6 z-40 place-items-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lift hover:scale-110 active:scale-95 transition animate-pulse-ring"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Left stack removed per user request */}

      {/* Sticky book bar on mobile once scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-white border-t border-[#E5EEF0] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe"
          >
            <div className="p-4 flex flex-col gap-3">
              <p className="text-center text-sm font-semibold text-[#0B1F44]">Need wound care at home?</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={waLink("Hi DressingWala, I'd like to book a home dressing.")}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-[#0B1F44] text-white font-semibold shadow-sm text-sm"
                >
                  Book a Home Visit
                </a>
                <a
                  href={waLink()}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-xl bg-[#25D366] text-white font-semibold shadow-sm text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
