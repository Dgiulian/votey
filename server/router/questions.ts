import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";
import { createRouter } from "./context";

const questionsRouter = createRouter()
  .query("get-all", {
    resolve({ ctx }) {
      if (!ctx.token) return [];
      return prisma.pollQuestion.findMany({
        where: {
          ownerToken: ctx.token,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      console.log(ctx.token);
      const pollQuestion = await prisma.pollQuestion.findFirst({
        where: { id: input.id },
      });
      return {
        question: pollQuestion,
        isOwner: ctx.token === pollQuestion?.ownerToken,
      };
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(10).max(5000),
    }),

    resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthroized");

      return prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: [],

          ownerToken: ctx.token,
        },
      });
    },
  });

export default questionsRouter;
export type QuestionsRouter = typeof questionsRouter;
