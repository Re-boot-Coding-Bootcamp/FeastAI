import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const mealPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a meal plan",
        });
      }

      return ctx.db.mealPlan.create({
        data: {
          content: input.content,
          account: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
    }),
  get: protectedProcedure.query(({ ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to retrieve a meal plan",
      });
    }

    return ctx.db.mealPlan.findFirst({
      where: {
        accountId: ctx.session.user.id,
      },
    });
  }),
});
