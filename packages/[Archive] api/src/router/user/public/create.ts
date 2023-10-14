import { publicProcedure } from "../../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const create = publicProcedure
  .input(
    z.object({
      id: z.string().uuid(),
      username: z.string().nonempty(),
      mainWallet: z.string().nonempty(),
      profilePicture: z.string(),
      tx: z.string().nonempty(),
    })
  )
  .mutation(async ({ input, ctx: { prisma } }) => {
    /*
            A check for signature is missing 
        */
    try {
      const res = prisma.userModel.create({
        data: {
          id: input.id,
          mainWallet: input.mainWallet,
          profilePicture: input.profilePicture,
          username: input.username,
          proof: [],
          tx: input.tx,
          email: "",
        },
      });
      return res;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
        cause: (error as Error).stack,
      });
    }
  });
