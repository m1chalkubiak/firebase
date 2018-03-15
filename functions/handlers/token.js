const admin = require('firebase-admin');

exports.update = ({ data }) => admin.messaging().subscribeToTopic(data.val(), '/topics/public');

