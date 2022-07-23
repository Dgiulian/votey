import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";

const questionsRouter = trpc.router().query("get-all", {
  resolve() {
    return prisma.pollQuestion.findMany();
  },
});

export default questionsRouter;
export type QuestionsRouter = typeof questionsRouter;
