import cv from 'opencv';

const crops = {
    mode: {
        x: 220,
        y: 423,
        w: 124,
        h: 77,
    },
    player1Weapon: {
        x: 676,
        y: 104,
        w: 46,
        h: 38,
    },
    player1Rank: {
        x: 645,
        y: 115,
        w: 34,
        h: 24,
    },
    player1Name: {
        x: 719,
        y: 102,
        w: 139,
        h: 22,
    },
    player1KA: {
        x: 860,
        y: 116,
        w: 37,
        h: 20,
    },
    player1D: {
        x: 903,
        y: 114,
        w: 26,
        h: 20,
    },
    player1S: {
        x: 937,
        y: 113,
        w: 22,
        h: 20,
    },
    player1P: {
        x: 719,
        y: 122,
        w: 47,
        h: 17,
    }
}

cv.readImage('./test-images/en-SZ-blackbelly-league.jpg', (err, im) => {
    const name = 'player1S';
    const tempCrop = im.crop(crops[name].x, crops[name].y, crops[name].w, crops[name].h);
    tempCrop.save('./output/out.png');
});
