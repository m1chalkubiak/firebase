import firebase from 'firebase';
import envConfig from 'env-config';

firebase.initializeApp(envConfig.firebaseConfig);

export const dbRef = firebase.database().ref('/');
