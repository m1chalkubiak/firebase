/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '380512286639',
});

firebase.messaging().setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  return self.registration.showNotification('Background Message Title', {
    body: 'Background Message body.',
  });
});
/* eslint-enable no-undef */
