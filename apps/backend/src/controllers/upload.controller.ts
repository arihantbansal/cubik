import { Request, Response } from "express";
import { uploadBuffer } from "utils/uploadBuffer";
import { ContentType } from "types"

import {
  S3Client,
  PutObjectRequest,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import formidable from "formidable";

const s3 = new S3Client({
  region: process.env.AWS_REGION as any,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as any,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as any,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const uploadController = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const key = req.body.key;
    const content_type = req.body.content_type as ContentType;

    if (!data || !key || !content_type)
      return res.status(400).json({ error: "Missing required fields" });

    const form = new formidable.IncomingForm();

    form.parse(data, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Error parsing the form." });
      }

      const { path } = files.file as any;

      const params: PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME as any,
        Key: key,
        Body: require("fs").createReadStream(path),
        ContentType:
          content_type == "image" ? "image/jpeg" : "application/json",
        ACL: "public-read",
      };

      const command = new PutObjectCommand(params);

      const response = await s3.send(command);

      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      res.status(200).json({ url: url });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
