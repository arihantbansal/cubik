import { NextResponse } from 'next/server';

import { prisma } from '@cubik/database';

export async function GET() {
  try {
    const hackathonPromise = prisma.hackathon.findMany({
      where: {
        isActive: true,
        hackathonStartDate: {
          // gte: new Date(),
        },
      },
      select: {
        name: true,
        id: true,
        shortDescription: true,
        hackathonSponsors: true,
      },
    });

    const roundPromise = prisma.round.findMany({
      where: {
        registrationEndDate: {
          // gte: new Date(),
        },
      },
      select: {
        name: true,
        id: true,
        shortDescription: true,
      },
    });

    const [hackathon, round] = await Promise.all([
      hackathonPromise,
      roundPromise,
    ]);

    const res = [
      ...hackathon.map((e) => {
        return {
          ...e,
          tracks: e.hackathonSponsors.map((t) => {
            return {
              label: t.name,
              value: t.name,
            };
          }),
          type: 'hackathon',
        };
      }),
      ...round.map((e) => {
        return {
          ...e,
          type: 'round',
        };
      }),
    ];
    return NextResponse.json({ data: res, error: null });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ data: null, error: error });
  }
}
