import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findPubkey = publicProcedure
  .input(
    z.object({
      publickey: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    if (!input.publickey) {
      return new TRPCError({
        message: "Publickey does not exist",
        code: "BAD_REQUEST",
      });
    }
    const res = await prisma.projectsModel.findMany({
      where: {
        owner_publickey: input.publickey,
        isArchive: false,
      },
    });

    return res;
  });
