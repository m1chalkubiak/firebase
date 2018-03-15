const admin = require('firebase-admin');


exports.close = ({ params: { roomId } }) => admin.database().ref('/messages').child(roomId).remove();

exports.empty = ({ params: { roomId } }) => admin.database().ref('/rooms').child(roomId).remove();

exports.create = ({ params: { roomId } }) => {
  const roomName = admin.database().ref('rooms').child(roomId).child('name');

  return admin.messaging().sendToTopic('/topics/public', {
    data: {
      roomId
    },
    notification: {
      title: `New room "${roomName}" was created! `,
      body: `New room - new possibilities. .Feel free to check it now!`,
      icon: 'https://memes.lol/wp-content/uploads/2016/11/cropped-funny-memes-icon.png',
      clickAction: `https://fir-chat-d0d0f.firebaseapp.com/room/${roomId}`
    }
  })
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};
