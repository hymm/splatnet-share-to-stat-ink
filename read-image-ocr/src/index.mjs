import cv from 'opencv';

import cropDimensions from './crop-dimensions';
import runOps from './operations';
import Tact from './tess';

cv.readImage('./test-images/en-SZ-blackbelly-league.jpg', async (err, im) => {
  for (const d of cropDimensions) {
    const crop = im.crop(d.x, d.y, d.w, d.h);
    await runOps(crop, d);
  }

  Tact.terminate();
});
