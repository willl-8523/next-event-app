import fs from 'node:fs/promises';
import { filepath } from '.';

export async function handler(req, res) {
  const imagesFileContent = await fs.readFile(
    filepath + '/images.json',
    'utf8'
  );
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
}

export default handler;
