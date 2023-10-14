import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const checkEmail = publicProcedure
  .input(z.object({ email: z.string() }))
  .mutation(async ({ input, ctx: { prisma } }) => {
    if (input.email.length < 3) return false;
    const res = await prisma.userModel.findFirst({
      where: {
        email: input.email,
      },
    });

    if (res) {
      return false;
    }

    return true;
  });
