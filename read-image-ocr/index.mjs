import cv from 'opencv';
import Tesseract from 'tesseract.js';
import cropDimensions from './crop-dimensions';
import path from 'path';

const langPath = `${path.join(path.resolve('.'), './tessdata')}`;
const Tact = Tesseract.create({ langPath });
cv.readImage('./test-images/en-SZ-blackbelly-league.jpg', async (err, im) => {
  for (const d of cropDimensions) {
    const crop = im.crop(d.x, d.y, d.w, d.h);
    const filename = `./output/${d.name}.png`;
    crop.save(filename);
    if (d.tessOpts != null) {
      const result = await Tact.recognize(filename, d.tessOpts);
      console.log(`${d.name}(${result.confidence}): ${result.text.trim()}`);
    }
  }
});
