import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { CATEGORIES, DAYS, LOCATIONS } from "./data";
import type { Requirement } from "./match";

export async function parseRequirement(query: string): Promise<Requirement> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const system = `You are SkillConnect AI, matching customers to local workers.
Read the customer's request (any language) and reply with ONLY a json object:
{"categoryId": one of [${CATEGORIES.map((c) => c.id).join(", ")}],
 "location": one of [${LOCATIONS.join(", ")}] or null,
 "budget": number in INR or null,
 "day": one of [${DAYS.join(", ")}] or null,
 "summary": one short English sentence describing what the customer needs}`;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system,
    messages: [{ role: "user", content: `Request (respond in json): ${query}` }],
    providerOptions: {
      openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] },
    },
  });
  const text = await result.text;
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  const p = JSON.parse(json);
  const cat = CATEGORIES.find((c) => c.id === p.categoryId) ?? CATEGORIES[0]!;
  return {
    categoryId: cat.id,
    location: LOCATIONS.includes(p.location) ? p.location : null,
    budget: typeof p.budget === "number" ? p.budget : null,
    day: DAYS.includes(p.day) ? p.day : null,
    summary: String(p.summary ?? query),
  };
}
