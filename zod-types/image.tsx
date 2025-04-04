import z from "zod";

export const imageSchema = z.object({
    prompt: z.string(),
    style: z.enum(["realistic", "anime", "digital-art", "oil-painting", "watercolor"]).optional(),
    aspectRatio: z.enum(["square", "portrait", "landscape", "wide"]).optional(),
    negativePrompt: z.string().optional(),
    guidanceScale: z.number().min(1).max(15).optional(),
    seed: z.number().nullable().optional(), // Allow `null`
  });
  