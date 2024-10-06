const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json'); // Download from Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { db };
