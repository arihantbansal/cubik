import { Prisma } from "@cubik/database";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { ProofType, UserProof } from "./addProof";

export const dripProof = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    const prisma = ctx.prisma;

    // const check = await prisma.userModel.findMany({
    //   where: {

    //     proof: {
    //       path: '$[*].name',
    //       array_contains: 'DRIPDS1',
    //     },
    //   },
    // });
    // if (check.length > 0) {
    //   throw new TRPCError({
    //     code: 'BAD_REQUEST',
    //     cause: 'NFT is Already claimed by another user',
    //     message: 'NFT is Already claimed by another user',
    //   });
    // }
    const fetchLatestUser = await prisma.userModel.findUnique({
      where: {
        id: ctx.session.user?.id,
      },
      select: {
        proof: true,
      },
    });
    const userProofs = fetchLatestUser?.proof as unknown as UserProof[];

    const user = await prisma.userModel.update({
      where: {
        id: ctx.session.user?.id,
      },
      data: {
        proof: (userProofs
          ? [
              ...(userProofs as unknown as ProofType[]),
              {
                name: "DRIPS01" as ProofType,
                timestamp: new Date(),
                tx: "",
              },
            ]
          : [
              {
                name: "DRIPS01" as ProofType,
                timestamp: new Date(),
                tx: "",
              },
            ]) as unknown as Prisma.JsonArray,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
});
