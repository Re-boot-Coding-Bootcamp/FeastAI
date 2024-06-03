import { z } from "zod";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const hashedPassowrd = bcrypt.hashSync(input.password, 10);

      return ctx.db.account.create({
        data: {
          username: input.username,
          email: input.email,
          firstName: input.firstname,
          lastName: input.lastname,
          password: hashedPassowrd,
        },
        select: {
          id: true,
        },
      });
    }),
  checkIfUsernameExists: publicProcedure
    .input(z.object({ username: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingAccounts = await ctx.db.account.findMany({
        where: {
          OR: [{ username: input.username }, { email: input.email }],
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return {
        exists: existingAccounts.length > 0,
        byEmail: existingAccounts.some(
          (account) => account.email === input.email
        ),
        byUsername: existingAccounts.some(
          (account) => account.username === input.username
        ),
      };
    }),
});
