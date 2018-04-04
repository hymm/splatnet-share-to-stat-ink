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

const webhookId = 430934709258682388;
const webhookToken = 'KcM2QYo_BeR_K0Tb29VN1XrZ5PngHCXYvvMgnEjKu1Ksnb1a4sX-xxGEEgL6dAN307kU';
const hook = new Discord.WebhookClient(webhookId, webhookToken);

const battleImageSchema = {
  id: '/BattleImage',
  type: 'object',
  properties: {
    username: { type: 'string' },
    pngBase64: { type: 'string' },
    utcTime: { type: 'integer' },
  },
  required: ['pngBase64', 'utcTime'],
};

exports.sendBattleImage = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    // return a error
  }

  if (!req.is('application/json')) {
    // send an error
  }

  // check if body is valid
  if (!validator.validate(req.body, battleImageSchema).valid) {
    //send an error
  }

  // check if png valid?
  // not sure if I can find a lib to do this on google functions

  // format for discord
  const message = {
    embed: {
      title: 'got an image',
      timestamp: new Date(req.body.utcTime),
    }
  };

  // send to discord
  hook.send(message);
});
