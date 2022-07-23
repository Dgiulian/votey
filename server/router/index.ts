import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/client";

export const questionRouter = trpc.router().query("get-all", {
  resolve() {
    return prisma.pollQuestion.findMany();
  },
});
