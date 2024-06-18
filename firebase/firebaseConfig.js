// firebase.js
import { initializeApp } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfyocWoRSJFgROXHVJ0a2YZ0lBRSvoZBE",
  authDomain: "littlelemon-7e1c7.firebaseapp.com",
  databaseURL: "https://littlelemon-7e1c7-default-rtdb.firebaseio.com",
  projectId: "littlelemon-7e1c7",
  storageBucket: "littlelemon-7e1c7.appspot.com",
  messagingSenderId: "101075374035",
  appId: "1:101075374035:web:75df6fc0e21b87eab4e926",
  measurementId: "G-6XEQ8Q0Q9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const firebaseAuth = auth();

export { app, firebaseAuth };
