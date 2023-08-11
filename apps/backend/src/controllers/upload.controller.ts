import { Request, Response } from "express";
import { uploadBuffer } from "utils/uploadBuffer";
import { ContentType } from "types"

export const uploadController = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const key = req.body.key;
    const content_type = req.body.content_type as ContentType;

    if(!data || !key || !content_type) return res.status(400).json({ error: "Missing required fields" });

    const url = await uploadBuffer(data, key, content_type);

    res.status(200).json({ url: url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
