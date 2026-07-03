import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.jpg";

const SUGGESTIONS = [
  "How do I care for a post-surgery wound?",
  "Do you provide diabetic ulcer dressing?",
  "What are your starting charges?",
  "Which areas in Hyderabad do you cover?",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

const partsToText = (m: UIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

export function AIAssistant({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: "dressingwala-assistant",
    transport,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const busy = status === "submitted" || status === "streaming";

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    await sendMessage({ text: t });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0"
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-label="DressingWala Care Assistant"
            className="fixed z-50 bg-card border shadow-lift rounded-3xl flex flex-col overflow-hidden
                       inset-x-3 bottom-24 top-20 md:inset-auto md:right-6 md:bottom-24 md:top-auto md:w-[420px] md:h-[600px]"
          >
            <header className="flex items-center gap-3 px-5 py-4 border-b bg-gradient-brand text-primary-foreground">
              <div className="flex items-center shrink-0 -ml-2">
                <img src={logo} alt="" className="h-10 md:h-12 w-auto object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold flex items-center gap-1.5">
                  Care Assistant <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs opacity-90">Ask about dressings, recovery & services</div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close assistant"
                className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-surface">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="bg-card border rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <Bot className="w-4 h-4" />
                      <span className="text-sm font-semibold">Hi, I'm your Care Assistant</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      I can help with general wound-care questions and explain how DressingWala services work.
                      For booking, please tap "Book Home Dressing" or WhatsApp.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-sm px-4 py-3 rounded-xl border bg-card hover:border-primary hover:bg-primary/5 transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const isUser = m.role === "user";
                const text = partsToText(m);
                return (
                  <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    {isUser ? (
                      <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 text-sm shadow-soft">
                        {text}
                      </div>
                    ) : (
                      <div className="max-w-[92%] text-sm text-foreground leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5">
                        <ReactMarkdown>{text || "…"}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex gap-1.5 items-center text-muted-foreground text-sm">
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce [animation-delay:120ms]" />
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce [animation-delay:240ms]" />
                  <span className="ml-1">Thinking…</span>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t bg-card p-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about wound care…"
                aria-label="Message"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition"
              />
              <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Send message" className="rounded-xl">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
