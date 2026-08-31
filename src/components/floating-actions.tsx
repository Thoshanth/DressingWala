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
        className="fixed bottom-6 right-6 z-40 grid place-items-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lift hover:scale-110 active:scale-95 transition animate-pulse-ring"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Left stack: AI + call, expandable */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
        <AnimatePresence>
          {expanded && (
            <>
              <motion.a
                key="tel"
                href={telLink()}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                aria-label={`Call ${CONTACT.phoneDisplay}`}
                className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-card border shadow-soft hover:border-primary transition text-sm font-medium"
              >
                <span className="grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                  <Phone className="w-4 h-4" />
                </span>
                Call now
              </motion.a>
              <motion.button
                key="ai"
                onClick={() => { setChatOpen(true); setExpanded(false); }}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: 0.05 }}
                aria-label="Open AI assistant"
                className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-card border shadow-soft hover:border-teal transition text-sm font-medium"
              >
                <span className="grid place-items-center w-8 h-8 rounded-full bg-teal text-teal-foreground">
                  <Bot className="w-4 h-4" />
                </span>
                Ask AI
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Close quick actions" : "Open quick actions"}
          aria-expanded={expanded}
          className="grid place-items-center w-14 h-14 rounded-full bg-gradient-brand text-white shadow-lift hover:scale-110 active:scale-95 transition"
        >
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Calendar className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Sticky book bar on mobile once scrolled */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-0 inset-x-0 z-30 md:hidden p-3 pb-4 bg-card/95 backdrop-blur border-t"
          >
            <a
              href={waLink("Hi DressingWala, I'd like to book a home dressing.")}
              target="_blank" rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-gradient-brand text-primary-foreground font-semibold shadow-soft"
            >
              Book Home Dressing
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
