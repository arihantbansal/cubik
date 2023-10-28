import { writeFileSync } from 'fs';

import { prisma } from '@cubik/database';

import { uploadURLsToCloudflare } from '../utils/uploadToCloudflare';

export const moveImagesToCloudflare = async () => {
  try {
    const userInfo = await prisma.user.findMany({
      where: {
        profilePicture: {
          not: {
            equals: null,
            contains: 'imagedelivery.net',
          },
        },
      },
    });
    userInfo.map(async (e) => {
      if (!e.profilePicture) return;
      const r = await uploadURLsToCloudflare(e.profilePicture || '', e.id);
      console.log(e.profilePicture);
      if (!r) return;
      const updatedURL = r.result.variants[0];
      console.log(updatedURL);

      await prisma.user.update({
        where: {
          id: e.id,
        },
        data: {
          profilePicture: updatedURL,
        },
      });
    });
  } catch (error) {
    writeFileSync('error.json', JSON.stringify(error));
    console.log(error, '--error');
  }
};
