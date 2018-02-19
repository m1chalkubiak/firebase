import firebase from 'firebase';
import envConfig from 'env-config';

// initalize Firebase
firebase.initializeApp(envConfig.firebaseConfig);

export const roomsRef = firebase.database().ref('rooms');
