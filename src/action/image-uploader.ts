import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

export const uploadImage = async (file: File, fileName: string) => {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const response: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: "ukk-2025",
            public_id: fileName,
          },
          (error, response) => {
            if (error) reject(error);
            else resolve(response);
          },
        )
        .end(fileBuffer);
    },
  );

  return response;
};
