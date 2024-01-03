import fs from 'fs';
import { filepath } from '.';

export async function handler(req, res) {
  const imagesFileContent = fs.readFileSync(
    filepath + '/images.json',
    'utf8'
  );
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
}

export default handler;
