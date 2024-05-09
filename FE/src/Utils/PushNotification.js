// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from 'firebase/messaging';
import { onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjZ67DAbC-aMrd3bZqtY3kXbOuOtPYcO4",
  authDomain: "pushnotifications-285fb.firebaseapp.com",
  projectId: "pushnotifications-285fb",
  storageBucket: "pushnotifications-285fb.appspot.com",
  messagingSenderId: "1065527430855",
  appId: "1:1065527430855:web:c03513e1401ca2a5e978e2",
  measurementId: "G-SMHZH6W09L"
};

// Initialize Firebase
const push_notification = initializeApp(firebaseConfig);
const messagging = getMessaging(push_notification);

export const requestPermission = () => {

    console.log("notification page")
  Notification.requestPermission().then ( Permission =>{
    if (Permission === "granted"){
      console.log("notification permission granted");
      return getToken (messagging , {
        vapidKey:"BGHHsIdIwYM-xft4zEtJoYq-N5vT3Ry7nXvQbd_29n28X1PKxkUnX0pLMZDXmIztZ_VGdRea4NzbcaEES7g3FDY"

      })
      .then ((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    }

    else{
      console.log("notification permission denied");
    }
  })

};
requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messagging, (payload) => {
      resolve(payload);
    });
  });