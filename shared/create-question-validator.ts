import { z } from "zod";

export const createQuestionValidator = z.object({
  question: z.string().min(10).max(5000),
  options: z
    .array(z.object({ text: z.string().min(1).max(200) }))
    .min(2)
    .max(20),
});

export type CreateQuestionInputType = z.infer<typeof createQuestionValidator>;
