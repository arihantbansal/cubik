import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export const UploadURLs = async (urls: string[]) => {
  try {
    const uploadedFiles = await utapi.uploadFilesFromUrl(urls);
    const urlChanges: {
      oldLink: string;
      newLink: string;
    }[] = [];

    urls.forEach((url) => {
      let newUrl = new URL(url);
      const filename = newUrl.pathname.split("/").pop() ?? "unknown-filename";

      const newfile = uploadedFiles.find((e) => e.data?.name === filename);

      urlChanges.push({
        newLink: newfile?.data?.url || url,
        oldLink: url,
      });
    });

    return urlChanges;
  } catch (error) {
    console.log(error);
    return null;
  }
};
