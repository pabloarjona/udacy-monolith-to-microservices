import { S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from './config/config';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Generates an AWS signed URL for retrieving objects
export async function getGetSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.aws_media_bucket,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutes
  });

  return signedUrl;
}

// Generates an AWS signed URL for uploading objects
export async function getPutSignedUrl(key: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: config.aws_media_bucket,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5 // 5 minutes
  });

  return signedUrl;
}