import { z } from "zod";
import { prisma } from "../../db/client";
import { createQuestionValidator } from "../../shared/create-question-validator";
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
    input: createQuestionValidator,

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
