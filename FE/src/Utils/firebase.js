import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
const messaging = getMessaging(app);
export const requestPermission = () => {
  console.log("notification page");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("notification permission granted");
      getToken(messaging, {
        vapidKey: "BFWzZdxGVozJKyuEWwyc09beuOhJGwEJCVxataGbpWdHcHqgtwZMI-aWuYk8QfbhGaDpC0JryiYtA22sA01BHos"
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      console.log("notification permission denied");
    }
  }).catch((error) => {
    console.log('An error occurred while requesting permission. ', error);
  });
};

requestPermission();

const isMessagingSupported = messaging && typeof messaging.isSupported === 'function';

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (isMessagingSupported) {
      const payload = {
        notification: {
          title: 'Notification Title',
          body: 'Notification Body',
        },
      };

      Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
          const notification = new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: 'notification-icon.png', // Replace with your notification icon path
          });

          notification.addEventListener('click', () => {
            // Handle notification click event
            console.log('Notification clicked');
          });

          notification.addEventListener('close', () => {
            // Handle notification close event
            console.log('Notification closed');
          });
        }

        resolve(payload);
      }).catch((error) => {
        console.log('An error occurred while handling the message. ', error);
      });
    } else {
      console.log('Messaging is not supported or is not properly configured.');
      // Handle the lack of messaging support
    }
  });

export const appFirestore = getFirestore(app);