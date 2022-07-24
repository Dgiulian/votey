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
      const myVote = await prisma.vote.findFirst({
        where: { voterToken: ctx.token, questionId: input.id },
      });
      const rest = {
        question: pollQuestion,
        vote: myVote,
        isOwner: pollQuestion?.ownerToken === ctx.token,
      };

      if (rest.vote || rest.isOwner) {
        const votes = await prisma.vote.groupBy({
          where: { questionId: input.id },
          by: ["choice"],
          _count: true,
        });

        return {
          ...rest,
          votes,
        };
      }

      return { ...rest, votes: undefined };
    },
  })
  .mutation("create", {
    input: createQuestionValidator,

    resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthroized");

      return prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: input.options || [],

          ownerToken: ctx.token,
        },
      });
    },
  })
  .mutation("vote-on-question", {
    input: z.object({
      questionId: z.string(),
      option: z.number(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      // const previousVote = await prisma.vote.findFirst({
      //   where: { questionId: input.questionId, voterToken: ctx.token },
      // });
      // if (previousVote) throw new Error("Already voted");

      await prisma.vote.create({
        data: {
          questionId: input.questionId,
          choice: input.option,
          voterToken: ctx.token,
        },
      });
      return await prisma.vote.groupBy({
        where: { questionId: input.questionId },
        by: ["choice"],
        _count: true,
      });
    },
  });

export default questionsRouter;
export type QuestionsRouter = typeof questionsRouter;
