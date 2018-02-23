import cv from 'opencv';

const crops = {
    mode: {
        x: 220,
        y: 423,
        w: 124,
        h: 77,
    },
    player1KA: {
        x: 860,
        y: 116,
        w: 37,
        h: 20,
    }
}

cv.readImage('./test-images/en-SZ-blackbelly-league.jpg', (err, im) => {
    const name = 'player1KA';
    const tempCrop = im.crop(crops[name].x, crops[name].y, crops[name].w, crops[name].h);
    tempCrop.save('./output/out.png');
});
