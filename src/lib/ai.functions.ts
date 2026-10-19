import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const understandRequest = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ query: z.string().min(3).max(500) }).parse(d))
  .handler(async ({ data }) => {
    const { parseRequirement } = await import("./ai.server");
    try {
      return { ok: true as const, req: await parseRequirement(data.query) };
    } catch (e) {
      console.error(e);
      return { ok: false as const, error: "The AI assistant couldn't read that request. Try again or pick a category." };
    }
  });
