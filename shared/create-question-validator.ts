import { z } from "zod";

export const createQuestionValidator = z.object({
  question: z.string().min(10).max(5000),
});

export type CreateQuestionInputType = z.infer<typeof createQuestionValidator>;
