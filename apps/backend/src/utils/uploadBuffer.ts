import { S3Client , PutObjectRequest , PutObjectCommand } from "@aws-sdk/client-s3";
import {  ContentType } from "types"

const s3 = new S3Client({
    region: process.env.AWS_REGION as any,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as any,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as any,
    },
});

/**
 * A function to upload a base64 encoded string to S3
 * @param data Base64 encoded string
 * @param key Path to upload to in S3
 * @param content_type Image(jpeg) or File(json) 
 * @returns 
 */
export const uploadBuffer = async (data : string, key: string, content_type : ContentType) => {
    try {
        data = data.replace(/^data:image\/\w+;base64,/, "")
        const buffer = Buffer.from(data, 'base64')    

        const params : PutObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME as any,
            Key: key,
            Body: buffer as any,
            ContentType: content_type == "image" ? "image/jpeg" : "application/json",
            ACL: 'public-read',
        }

        const command = new PutObjectCommand(params)

        const response = await s3.send(command)
        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        return url;
    } catch (error) {
        console.error(error);
        return null;
    }
}
