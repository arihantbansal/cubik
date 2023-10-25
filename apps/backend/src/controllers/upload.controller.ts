import { Request, Response } from "express";
import {
  createFailureResponse,
  createFailureResponseData,
  createSuccessResponse,
} from "types/response";
import { UploadURLs, uploadURLsToCloudflare } from "utils/upload";
import { prisma } from "@cubik/database";

export const uploadFromURL = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        profilePicture: {
          not: {
            equals: null,
          },
        },
      },

      take: 10,
    });

    const userAvatars: string[] = [];
    data.forEach((e) => {
      if (!e.profilePicture) return;
      userAvatars.push(e.profilePicture);
    });

    const upload = await UploadURLs(userAvatars);

    // data.forEach(async (e) => {
    //   if (e.profilePicture) {
    //     const urlChanges = await UploadURLs([e.profilePicture]);

    //     const u = await prisma.user.update({
    //       where: {
    //         id: e?.id,
    //       },
    //       data: {
    //         profilePicture: urlChanges![0].newLink,
    //       },
    //     });
    //     console.log(u);
    //     up.push(u);
    //   }
    // });

    return res.status(200).send(createSuccessResponse(200, upload));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send(createFailureResponseData(500, "Error while uploading", null));
  }
};
