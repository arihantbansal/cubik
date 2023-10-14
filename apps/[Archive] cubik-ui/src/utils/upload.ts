import axios from "axios";
import { env } from "~/env.mjs";

export async function uploadToCloudinary(image: any) {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY as string);
  let post = await axios.post(
    `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDNAME}/image/upload`,
    formData
  );
  return post.data.secure_url;
}
