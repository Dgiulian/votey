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
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    resolve({ input }) {
      return prisma.pollQuestion.findFirst({ where: { id: input.id } });
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(10).max(5000),
    }),
    resolve({ input }) {
      return prisma.pollQuestion.create({
        data: { question: input.question, options: {} },
      });
    },
  });

export default questionsRouter;
export type QuestionsRouter = typeof questionsRouter;
