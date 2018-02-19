import buildConfig from '../utils/buildConfig';

export default buildConfig({
  name: 'development',
  // apiBaseURL: 'http://blarney-cms-stage.eu-west-1.elasticbeanstalk.com/api/v1',
  firebaseConfig: {
    apiKey: 'AIzaSyC02DN5a3ayCm3a8bsu3hiXomto-I-CNtA',
    authDomain: 'fir-chat-9dd5e.firebaseapp.com',
    databaseURL: 'https://fir-chat-9dd5e.firebaseio.com',
    projectId: 'fir-chat-9dd5e',
    storageBucket: 'fir-chat-9dd5e.appspot.com',
    messagingSenderId: '700350008629',
  },
});
