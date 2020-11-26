const functions = require('firebase-functions');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// const t

const client = require('twilio')(
  'AC0be31c882934bdef820a2d24a3474009',
  '871a993fb3a2bdd7e08331fa0d3ee6f2',
);
const sms = (contacts, {lat, lan}) => {
  const accountSid = 'AC0be31c882934bdef820a2d24a3474009';
  const authToken = '871a993fb3a2bdd7e08331fa0d3ee6f2';
  Promise.all(
    contacts.map((contact) =>
      client.messages.create({
        body: `I need your help ! And here is my location https://www.google.com/maps/search/?api=1&query=${lat},${lan} . Open maps to track me ! `,
        from: 'whatsapp:+919952840983',
        to: contact,
      }),
    ),
  )
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

exports.widgets = functions.https.onCall(sms);
