const functions = require('firebase-functions');
const Validator = require('jsonschema').Validator;
const Discord = require('discord.js');

const auth = require('./auth.json');

const validator = new Validator();

const webhookId = auth.discord.webhooks[0].id;
const webhookToken = auth.discord.webhooks[0].token;
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
  if (!validator.validate(req.body, battleImageSchema).valid) {
    res.json({ err: 'bad body' });
    return;
  }

  const filename = 'battle';
  const imageBuf = Buffer.from(req.body.pngBase64, 'base64');

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
    res.send({ result: 'success' });
    return;
  }).catch((err) => {
    console.log(err);
    res.send({ err: `Error on send to discord: ${err.message}` });
  });
}

function sendBattleImageWithErrorHandling(req, res) {
  try {
    sendBattleImage(req, res);
  } catch (e) {
    console.log(e);
    res.json({ err: e.message });
  }
}

exports.sendBattleImage = functions.https.onRequest(sendBattleImageWithErrorHandling);
