import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

global.firebaseui = new firebaseui.auth.AuthUI(firebase.auth());
