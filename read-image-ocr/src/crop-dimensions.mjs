const playerCropsBase = [
  {
    baseName: 'rank',
    x: 26,
    y: 60,
    w: 31,
    h: 22,
    op: ['save', 'readText'],
    tessOpts: {
      lang: 'splatoon1',
      tessedit_char_whitelist: 'CBAS-+'
    }
  },
  {
    baseName: 'weapon',
    x: 57,
    y: 46,
    w: 42,
    h: 40,
    op: ['save']
  },
  {
    baseName: 'name',
    x: 98,
    y: 45,
    w: 135,
    h: 25,
    op: ['resize', 'threshold', 'save', 'readText'],
    scale: 4,
    threshold: [150, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
    }
  },
  {
    baseName: 'P',
    x: 98,
    y: 66,
    w: 37,
    h: 18,
    op: ['resize', 'threshold', 'save', 'readText'],
    scale: 4,
    threshold: [150, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
      tessedit_char_whitelist: '0123456789p'
    }
  },
  {
    baseName: 'KA',
    x: 240,
    y: 63,
    w: 37,
    h: 23,
    op: ['resize', 'threshold', 'save', 'readText'],
    scale: 4,
    threshold: [120, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
      tessedit_char_whitelist: '0123456789()',
    }
  },
  {
    baseName: 'D',
    x: 281,
    y: 63,
    w: 28,
    h: 23,
    op: ['resize', 'threshold', 'save', 'readText'],
    scale: 4,
    threshold: [160, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
      tessedit_char_whitelist: '0123456789'
    }
  },
  {
    baseName: 'S',
    x: 317,
    y: 64,
    w: 20,
    h: 23,
    op: ['threshold', 'save', 'readText'],
    threshold: [160, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
      tessedit_char_whitelist: '0123456789'
    }
  },
  {
    baseName: 'A',
    x: 241,
    y: 71,
    w: 36,
    h: 12,
    op: ['resize', 'threshold', 'save', 'readText'],
    scale: 4,
    threshold: [100, 255,  "Threshold to Zero"],
    tessOpts: {
      lang: 'splatoon2',
      tessedit_char_whitelist: '0123456789()'
    }
  },

];

function getPlayerCrops(winloss) {
  const crops = [];
  for (const base of playerCropsBase) {

    for (let i=1; i <= 4; i++) {
      const player = {}
      for (const key in base) {
        if (key === 'y') {
          player[key] = base[key] + 50*(i-1);
        } else if (key === 'baseName') {
          player.name = `${winloss}${i}-${base.baseName}`
        } else {
          player[key] = base[key]
        }
      }
      crops.push(player);
    }
  }
  return crops;
}

export const mode = {
  name: 'mode',
  x: 178,
  y: 423,
  w: 206,
  h: 77,
  op: ['save', 'readText'],
  tessOpts: {
    lang: 'splatoon1'
  }
};

export const power = {
  name: 'power',
  x: 45,
  y: 513,
  w: 472,
  h: 25,
  op: ['save', 'readText'],
  tessOpts: {
    lang: 'splatoon2'
  }
};

export const footer = {
  name: 'time-map-duration',
  x: 125,
  y: 606,
  w: 322,
  h: 24,
  op: ['save', 'readText'],
  tessOpts: {
    lang: 'eng'
  }
};

export const leaguePower = {
  name: 'teamId-leaguePower',
  x: 722,
  y: 605,
  w: 260,
  h: 25,
  op: ['save', 'readText'],
  tessOpts: {
    lang: 'eng'
  }
};

export const test = {
  name: 'Winners',
  x: 621,
  y: 335,
  w: 365,
  h: 271,
  op: ['rotate', 'save', 'crop'],
  rotate: -1.5,
  crops: [
    {
      name: 'W2-KA',
      x: 240,
      y: 63,
      w: 37,
      h: 23,
      op: ['resize', 'threshold', 'save', 'readText'],
      scale: 4,
      threshold: [120, 255,  "Threshold to Zero"],
      tessOpts: {
        lang: 'splatoon2',
        tessedit_char_whitelist: '0123456789()',
      }
    },
  ]
};

export default [
  mode,
  power,
  footer,
  leaguePower,
  {
    name: 'Winners',
    x: 621,
    y: 53,
    w: 365,
    h: 271,
    op: ['rotate', 'save', 'crop'],
    rotate: -1.5,
    crops: getPlayerCrops('W')
  },
  {
    name: 'Losers',
    x: 621,
    y: 335,
    w: 365,
    h: 271,
    op: ['rotate', 'save', 'crop'],
    rotate: 1.5,
    crops: getPlayerCrops('L')
  }
];
