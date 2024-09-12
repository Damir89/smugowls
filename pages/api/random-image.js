import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imageDirectory = path.join(process.cwd(), 'public/images');
  const imageFiles = fs.readdirSync(imageDirectory).filter(file => 
    file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')
  );
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  res.status(200).json({ image: `/images/${randomImage}` });
}