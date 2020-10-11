import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxbxQMSh9SzGnMfrdPhnld8PxHN17Nq28",
  authDomain: "ping-pong-league-8ae0a.firebaseapp.com",
  databaseURL: "https://ping-pong-league-8ae0a.firebaseio.com",
  projectId: "ping-pong-league-8ae0a",
  storageBucket: "ping-pong-league-8ae0a.appspot.com",
  messagingSenderId: "268658806093",
  appId: "1:268658806093:web:d068d81bf94c9fd06dfb04",
};
// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref(); 
