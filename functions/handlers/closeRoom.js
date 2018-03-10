const admin = require('firebase-admin');


exports.deleteHandler = ({ params: { roomId } }) => admin.database().ref('/messages').child(roomId).remove();