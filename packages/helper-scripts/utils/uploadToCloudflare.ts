import { CloudflareResponseType } from "../types";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const API_URL =
  "https://api.cloudflare.com/client/v4/accounts/45b542611c912b111b00f7a4e8271ab9/images/v1";

export const uploadURLsToCloudflare = async (url: string, id: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.CLOUDFLARE_KEY}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("url", url);
    formData.append("metadata", JSON.stringify({ key: id }));
    formData.append("requireSignedURLs", "false");

    const response = await axios.post(API_URL, formData, {
      headers,
    });

    return response.data as CloudflareResponseType;
  } catch (error) {
    // fs.writeFileSync(id + ".json", JSON.stringify(error));
    console.log(error);
  }
};
