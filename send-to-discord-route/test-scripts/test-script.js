const request = require('request-promise-native');
const { promisify } = require('util');
const fs = require('fs');

async function sendImage() {
  const readFileAsync = promisify(fs.readFile);

  const imageBuf = await readFileAsync('./test-image.png');

  const url = 'https://us-central1-squidtracks.cloudfunctions.net/sendBattleImage';

  const result = await request({
    method: 'POST',
    uri: url,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname: 'Me',
      pngBase64: imageBuf.toString('base64'),
      utcTime: new Date().getTime(),
    })
  });

  console.log(result);
}

async function sendImageWithErrorHandling() {
  try {
    await sendImage();
  } catch (e) {
    console.log(e.message);
  }
}

sendImageWithErrorHandling();
