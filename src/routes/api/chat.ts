import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const SYSTEM_PROMPT = `You are the DressingWala Care Assistant — a warm, professional AI helper for a home wound-dressing and post-surgery care service in Hyderabad, India.

Your job:
- Answer general questions about wound care, dressings, post-surgery recovery, hygiene, and how DressingWala services work.
- Explain service types: simple dressing, complex/large wound dressing, post-operative dressing, diabetic ulcer care, burn dressing, suture removal, catheter/colostomy care, IV/injection administration.
- Be clear that final charges depend on wound type, dressing materials, travel distance, and clinician assessment. Share only "starting from" prices when asked.
- For booking, guide the user to click "Book Home Dressing" or the WhatsApp button — do not attempt to book yourself.
- Always add a short safety note for red-flag symptoms (heavy bleeding, spreading redness, high fever, pus, severe pain) → advise urgent in-person care or ER.
- Never diagnose or replace a clinician. Be concise, kind, and use short paragraphs or bullet points.
- Coverage area: Hyderabad and surrounding suburbs.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          const messages = body.messages;
          if (!Array.isArray(messages)) {
            return new Response("messages required", { status: 400 });
          }
          const key = process.env.AI_API_KEY;
          if (!key) return new Response("Missing AI_API_KEY", { status: 500 });

          const ai = createOpenAICompatible({
            name: "openai-compatible",
            baseURL: process.env.AI_BASE_URL || "https://api.openai.com/v1",
            headers: {
              Authorization: `Bearer ${key}`,
            },
          });
          const result = streamText({
            model: ai("gemini-1.5-flash"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error("chat error", err);
          return new Response("Chat error", { status: 500 });
        }
      },
    },
  },
});
