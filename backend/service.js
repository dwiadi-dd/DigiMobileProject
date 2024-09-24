// Node.js
var admin = require('firebase-admin');
var serviceAccount = require('./digi-mobile-project-firebase-adminsdk-5fxx4-c20048b4e5.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
});

async function sendMessage() {
  // Fetch the tokens from an external datastore (e.g. database)
  //   const tokens = await getTokensFromDatastore();

  // Send a message to devices with the registered tokens

  await admin.messaging().send({
    topic: 'DIGICAMP',
    data: {
      notifee: JSON.stringify({
        title: 'Hallo dari investly',
        subtitle: 'TEST',
        body: 'pesan masuk dari TOPIC',
        android: {
          channelId: 'default-DIG',
          pressAction: {
            id: 'default',
          },
        },
      }),
    },
  });

  //   await admin.messaging().sendMulticast({
  //     tokens: [
  //       'f2pIBDtLRRi-3pc-w7H2Tw:APA91bGMKg3aYwQ5Lq_tYXAf6rO4g0kTcmLHS-5RzTJoOYpjgLuhfBX5u5zoT_ITwMoXGY8RJQiwTglXfMiGtz1iahEBzRCyzDf8UY8M62pB2lBNeZxFB6ahJMMxCtmT3vMIp3f7UM0I',
  //     ],
  //     data: {
  //       notifee: JSON.stringify({
  //         title: 'Notif from push',
  //         subtitle: 'TEST',
  //         body: 'pesan masuk dari push',
  //         android: {
  //           channelId: 'default-DIG',
  //           pressAction: {
  //             id: 'default',
  //           },
  //         },
  //         data: {
  //           type: 'OPEN_POST_DETAIL',
  //           postId: '7e55ef5f-05df-4428-be77-e68b36f6b63e',
  //         },
  //       }),
  //     },
  //   });
}

sendMessage();
