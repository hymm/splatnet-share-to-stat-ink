// script to crop images from stat.ink for testing

import cv from 'opencv';

cv.readImage('./test-images/pml6nej3f5chnfipgu5pdoe2zy.jpg', (err, im) => {
  const crop = im.crop(57, 0, 1024, 640);
  crop.save('./output/cropped.png');
});
