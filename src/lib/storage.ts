import "server-only";
import * as fs from "fs";
import * as path from "path";
import * as fg from "fast-glob";

export const uploadPath = "./public/uploads";

export async function uploadFile(file: File, identifier: string) {
  const data = await file.arrayBuffer();
  const fileName = `${identifier}.${file.name.split(".").pop()}`;
  const destination = getUploadedFilePath(fileName);
  const dir = path.dirname(identifier);

  if (dir !== ".") {
    fs.mkdirSync(path.join(process.cwd(), uploadPath, dir), {
      recursive: true,
    });
  }

  fs.writeFileSync(destination, Buffer.from(data));

  return {
    fileName: `/uploads/${fileName}`,
    destination,
  };
}

export async function removeUploadedFiles(pattern: string) {
  try {
    fg.globSync(getUploadedFilePath(pattern)).forEach(file => {
      fs.unlinkSync(file);
    });
  } catch (e) {
    console.error(e);
  }
}

function getUploadedFilePath(name: string) {
  return path.join(process.cwd(), uploadPath, name);
}
