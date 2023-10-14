import { protectedProcedure } from "../../../trpc";
import { z } from "zod";
import { Prisma, ProjectVerifyStatus } from "@cubik/database";
import { TRPCError } from "@trpc/server";
import { v4 as uuid } from "uuid";

export const createProject = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
      industry: z.string().nonempty(),
      logo: z.string().nonempty(),
      long_description: z.string().nonempty(),
      name: z.string().nonempty(),
      short_description: z.string().nonempty(),
      discord_link: z.string(),
      project_link: z.string(),
      twitter_handle: z.string(),
      github_link: z.string(),
      projectUserCount: z.number(),
      telegram_link: z.string(),
      team: z.array(z.string()),
      sig: z.string().nonempty(),
      email: z.string().nonempty(),
      multiSigAddress: z.string().nonempty(),
      createKey: z.string().nonempty(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { prisma } = ctx;
    let team: Prisma.TeamCreateManyInput[] = [];
    if (input.team.length !== 0) {
      team = input.team?.map((teamId) => {
        return {
          id: uuid(),
          projectsModelId: input.id,
          userId: teamId,
        };
      });
    }
    let finalTeam: Prisma.TeamCreateManyInput[] = [
      {
        id: uuid(),
        projectsModelId: input.id,
        userId: ctx.session.user.id,
      },
    ];
    team.map((team) => {
      if (!finalTeam.findIndex((t) => t.userId === team.userId)) {
        finalTeam.push(team);
      }
    });

    try {
      const res = await prisma.projectsModel.create({
        data: {
          id: input.id,
          industry: input.industry,
          logo: input.logo,
          sig: input.sig,
          long_description: input.long_description,
          name: input.name,
          owner_publickey: ctx.session.user.mainWallet,
          short_description: input.short_description,
          discord_link: input.discord_link,
          status: ProjectVerifyStatus.REVIEW,
          projectUserCount: input.projectUserCount,
          telegram_link: input.telegram_link,
          project_link: input.project_link,
          twitter_handle: input.twitter_handle,
          github_link: input.github_link,
          mutliSigAddress: input.multiSigAddress,
          createKey: input.createKey,
        },
      });
      await prisma.team.createMany({
        data: finalTeam,
      });
      return res;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
        cause: (error as Error).stack,
      });
    }
  });
