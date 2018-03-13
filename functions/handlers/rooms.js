const admin = require('firebase-admin');


exports.close = ({ params: { roomId } }) => admin.database().ref('/messages').child(roomId).remove();

exports.empty = ({ params: { roomId } }) => admin.database().ref('/rooms').child(roomId).remove();