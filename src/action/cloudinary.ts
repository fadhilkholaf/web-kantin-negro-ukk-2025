import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

export const uploadImage = async (
  file: File,
  fileName: string,
  menu?: true | undefined,
) => {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const response: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: !menu ? "ukk-2025" : "ukk-2025-menu",
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
