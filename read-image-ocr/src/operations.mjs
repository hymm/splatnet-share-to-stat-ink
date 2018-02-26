import Tact from './tess';

function threshold(im, threshold, max_value, type) {
  im = im.threshold(threshold, max_value, type);
}

function bilateralFilter(im, diameter, sigmaColor, sigmaSpace) {
  im.bilateralFilter(diameter, sigmaColor, sigmaSpace);
}

function rotate(im, angle) {
  im.rotate(angle);
}

function resize(im, scale) {
  const newwidth = im.width() * scale;
  const newheight = im.height() * scale;
  im.resize(newwidth, newheight);
}

function save(im, options) {
  const filename = `./output/${options.name}.png`;
  im.save(filename);
}

async function crop(im, crops) {
  for (const d of crops) {
    const crop = im.crop(d.x, d.y, d.w, d.h);
    await runOps(crop, d);
  }
}

async function readText(opts) {
  const filename = `./output/${opts.name}.png`;
  const result = await Tact.recognize(filename, opts.tessOpts);
  console.log(`${opts.name}(${result.confidence}): ${result.text.trim()}`);
}

async function run(opName, im, options) {
  switch (opName) {
    case 'rotate':
      rotate(im, options.rotate);
      return;
    case 'save':
      save(im, options);
      return;
    case 'readText':
      await readText(options);
      return;
    case 'crop':
      await crop(im, options.crops);
      return;
    case 'resize':
      resize(im, options.scale);
      return;
    case 'bilateralFilter':
      bilateralFilter(im, ...options.bilateralFilter);
      return;
    case 'threshold':
      threshold(im, ...options.threshold);
      return;
  }
}

export default async function runOps(im, options) {
  if (options.op == null) {
    return;
  }

  for (const op of options.op) {
    await run(op, im, options);
  }
}
