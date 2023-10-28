import axios from 'axios';
import FormData from 'form-data';
import { CloudflareResponseType } from 'types/cloudflare';
import { UTApi } from 'uploadthing/server';

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
      const filename = newUrl.pathname.split('/').pop() ?? 'unknown-filename';

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
const API_URL =
  'https://api.cloudflare.com/client/v4/accounts/45b542611c912b111b00f7a4e8271ab9/images/v1';

export const uploadURLsToCloudflare = async (url: string, id: string) => {
  const headers = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_KEY}`,
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('url', url);
  formData.append('id', id);
  formData.append('requireSignedURLs', 'false');

  const response = await axios.post(API_URL, formData, {
    headers,
  });

  return response.data as CloudflareResponseType;
};
