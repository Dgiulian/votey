import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";

const questionsRouter = trpc
  .router()
  .query("get-all", {
    resolve() {
      return prisma.pollQuestion.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(10).max(5000),
    }),
    resolve({ input }) {
      return prisma.pollQuestion.create({ data: { question: input.question } });
    },
  });

export default questionsRouter;
export type QuestionsRouter = typeof questionsRouter;
