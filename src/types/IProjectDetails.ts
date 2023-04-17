import { Prisma } from '@prisma/client';

export type ProjectWithCommentsAndRoundsType = Prisma.ProjectsModelGetPayload<{
    include: {
        comments: {
            include: {
                user: true;
                Reply: {
                    include: {
                        user: true;
                    };
                };
            }
        };
        PojectJoinRound: true;
        owner: true;
        Team: {
            include: {
                user: true;
            };
        };
    };
}>;

export type ProjectCreatorTeamType = Prisma.TeamGetPayload<{
    include: {
        user: true;
    };
}>