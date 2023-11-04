import { prisma } from '@cubik/database';

export const moveV3Vaults = async () => {
  const data = await prisma.project.findMany();

  data.forEach(async (e) => {
    const updateData = await prisma.project.update({
      where: {
        id: e.id,
      },
      data: {
        multiSigAddress_v3: e.mutliSigAddress,
      },
    });
    console.log(updateData);
  });
};
