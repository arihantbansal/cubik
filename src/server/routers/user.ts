import { procedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export const userRouter = router({
  create: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        username: z.string().nonempty(),
        mainWallet: z.string().nonempty(),
        profilePicture: z.string().nonempty(),
        tx: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      /*
            A check for signature is missing 
        */
      const res = prisma.userModel.create({
        data: {
          id: input.id,
          mainWallet: input.mainWallet,
          profilePicture: input.profilePicture,
          username: input.username,
          tx: input.tx,
        },
      });
      return res;
    }),

  checkUsername: procedure
    .input(
      z.object({
        username: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!res) {
        return false;
      }

      return true;
    }),
});
