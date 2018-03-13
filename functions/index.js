const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const roomsHandler = require('./handlers/rooms');


exports.closeRoom = functions.database.ref('/rooms/{roomId}').onDelete(roomsHandler.close);

exports.emptyRoom = functions.database.ref('/rooms/{roomId}/users').onDelete(roomsHandler.empty);
