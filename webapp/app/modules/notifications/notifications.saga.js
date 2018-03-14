import { eventChannel } from 'redux-saga';
import { takeLatest, put, take, select, fork } from 'redux-saga/effects';
import firebase from 'firebase';
import reportError from 'report-error';
import { NotificationsTypes, NotificationsActions } from './notifications.actions';
import { UserAuthTypes } from '../userAuth/userAuth.redux';

function* closeChannelOnSignOut(channel) {
  try {
    yield take(UserAuthTypes.SET_USER_DATA);
    channel.close();
  } catch (error) {
    reportError(error);
  }
}

function* listenForPushNotifications() {
  try {
    const channel = yield eventChannel((emitter) => {
      const listener = firebase.messaging().onMessage(emitter);
      return () => listener.remove();
    });

    if (process.env.__DEV__) {
      console.log('Started listening for push notifications');
    }

    yield fork(closeChannelOnSignOut, channel);

    // const initialNotification = yield firebase.messaging().;
    // if (initialNotification) {
    //   console.log('initial notification', initialNotification);
    // }

    while (true) { //eslint-disable-line
      const notification = yield take(channel);
      console.log('notification', notification);
    }
  } catch (error) {
    reportError(error);
  }
}

function* listenForFCMTokenRefresh() {
  try {
    const channel = yield eventChannel((emitter) => {
      const listener = firebase.messaging().onTokenRefresh(emitter);
      return () => listener.remove();
    });

    if (process.env.__DEV__) {
      console.tron.log('Started listening for FCM token refresh');
    }

    yield fork(closeChannelOnSignOut, channel);

    while (true) {
      const fcmToken = yield take(channel);
      console.log(fcmToken);
    }
  } catch (error) {
    reportError(error);
  }
}

function* init() {
  try {
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      const registration = yield navigator.serviceWorker.register('/firebase-messaging-sw.js');
      yield firebase.messaging().useServiceWorker(registration);
      yield firebase.messaging().requestPermission();
      const fcmToken = yield firebase.messaging().getToken();
      console.log(fcmToken);
    } else {
      console.log('Service workers are not supported.');
    }
  } catch (error) {
    reportError(error);
  }
}


export function* watchNotifications() {
  try {
    yield takeLatest(UserAuthTypes.SET_USER_DATA, init);
    yield takeLatest(UserAuthTypes.SET_USER_DATA, listenForFCMTokenRefresh);
    yield takeLatest(UserAuthTypes.SET_USER_DATA, listenForPushNotifications);
  } catch (error) {
    reportError(error);
  }
}
