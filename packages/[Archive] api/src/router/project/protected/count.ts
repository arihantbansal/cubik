import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
export const projectCount = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ ctx }) => {
    const { prisma } = ctx;
    const res = await prisma.userModel.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        _count: true,
      },
    });

    return res;
  });
