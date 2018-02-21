import firebase from 'firebase';
import envConfig from 'env-config';

firebase.initializeApp(envConfig.firebaseConfig);

export const roomsRef = firebase.database().ref('rooms');
