const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const closeRoom = require('./handlers/closeRoom');


exports.closeRoom = functions.database.ref('/rooms/{roomId}').onDelete(closeRoom.deleteHandler);