import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";
import { getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAswB3tqVpaDJdwbLpmczjJlrt0LENLHso",
  authDomain: "fox-app-e9b9f.firebaseapp.com",
  projectId: "fox-app-e9b9f",
  storageBucket: "fox-app-e9b9f.appspot.com",
  messagingSenderId: "24320835329",
  appId: "1:24320835329:web:730880693df634d17c6500",
  measurementId: "G-K1SV52MJTR"
};

const app = initializeApp(firebaseConfig);
const messagging = getMessaging(app);

export const requestPermission = () => {

    console.log("notification page")
  Notification.requestPermission().then ( Permission =>{
    if (Permission === "granted"){
      console.log("notification permission granted");
      return getToken (messagging , {
        vapidKey:"BFWzZdxGVozJKyuEWwyc09beuOhJGwEJCVxataGbpWdHcHqgtwZMI-aWuYk8QfbhGaDpC0JryiYtA22sA01BHos"

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
});});
export const appFirestore = getFirestore(app);