const functions = require('firebase-functions');
const Validator = require('jsonschema').Validator;
const Discord = require('discord.js');

const validator = new Validator();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//https://discordapp.com/api/webhooks/430934709258682388/KcM2QYo_BeR_K0Tb29VN1XrZ5PngHCXYvvMgnEjKu1Ksnb1a4sX-xxGEEgL6dAN307kU
const webhookId = '430934709258682388';
const webhookToken = 'KcM2QYo_BeR_K0Tb29VN1XrZ5PngHCXYvvMgnEjKu1Ksnb1a4sX-xxGEEgL6dAN307kU';
const hook = new Discord.WebhookClient(webhookId, webhookToken);

const battleImageSchema = {
  id: '/BattleImage',
  type: 'object',
  properties: {
    nickname: { type: 'string' },
    pngBase64: { type: 'string' },
    utcTime: { type: 'integer' },
  },
  required: ['pngBase64', 'utcTime'],
};

function sendBattleImage(req, res) {
  // check if body is valid
  if (!validator.validate(req.body, battleImageSchema).valid) {
    res.send('bad body');
    return;
    //send an error
  }

  // check if png valid?
  // not sure if I can find a lib to do this on google functions

  // format for discord
  const filename = 'test';
  const imageBuf = Buffer.from(req.body.pngBase64, 'base64');

  // send to discord
  hook.send('this is an embed', {
    embeds: [{
      title: `got an image from ${req.body.nickname}`,
      timestamp: new Date(),
    }],
    files: [{
      name: `${filename}.png`,
      attachment: imageBuf,
    }]
  }).then(() => {
    res.send('success');
    return;
  }).catch((err) => {
    console.log(err);
    res.send(`Error on send to discord: ${err.message}`);
  });
}

function sendBattleImageWithErrorHandling(req, res) {
  try {
    sendBattleImage(req, res);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
}

exports.sendBattleImage = functions.https.onRequest(sendBattleImageWithErrorHandling);
