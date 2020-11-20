const functions = require('firebase-functions');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// const t

// const express = require('express');
// const bodyParser = require('body-parser');
// // const { functions } = require('firebase');
// // const pino = require('express-pino-logger')();
// const client = require('twilio')(
//   'AC0be31c882934bdef820a2d24a3474009',
//   '871a993fb3a2bdd7e08331fa0d3ee6f2',
// );
// const app = express();
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.post('/api/messages', (req, res) => {
//   res.header('Content-Type', 'application/json');
//   client.messages
//     .create({
//       from: 'whatsapp:+919952840983',
//       to: 'whatsapp:+918015551146',
//       body: '',
//     })
//     .then(() => res.send(JSON.stringify({success: true})))
//     .catch((err) => {
//       console.log(err);
//       res.send(JSON.stringify({success: false}));
//     });
// });

const client = require('twilio')(
  'AC0be31c882934bdef820a2d24a3474009',
  '871a993fb3a2bdd7e08331fa0d3ee6f2',
);
const sms = async (contacts) => {
  const accountSid = 'AC0be31c882934bdef820a2d24a3474009';
  const authToken = '871a993fb3a2bdd7e08331fa0d3ee6f2';
  // await fetch(
  //   'https://api.twilio.com/2010-04-01/Accounts/AC0be31c882934bdef820a2d24a3474009/Messages.json',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // );
  client.messages
    .create({
      body: 'Hi there!',
      from: 'whatsapp:+919952840983',
      to: 'whatsapp:+918015551146',
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

exports.widgets = functions.https.onRequest(sms);
