const admin = require('firebase-admin');


exports.deleteHandler = (event) => {
  const { roomId } = event.params;
  return admin.database().ref('/messages').child(roomId).remove();
};