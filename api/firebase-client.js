import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);
const signUp = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);
const signOut = () => firebase.auth().signOut();
const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

export {
  initFirebase,
  signIn,
  signUp,
  signOut,
  resetPassword,
};
