const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const roomsHandler = require('./handlers/rooms');
const tokenHandler = require('./handlers/token');

exports.tokenUpdate = functions.database.ref('/fcmTokens/{userId}').onWrite(tokenHandler.update);

exports.closeRoom = functions.database.ref('/rooms/{roomId}').onDelete(roomsHandler.close);

exports.createRoom = functions.database.ref('/rooms/{roomId}').onCreate(roomsHandler.create);

exports.emptyRoom = functions.database.ref('/rooms/{roomId}/users').onDelete(roomsHandler.empty);
