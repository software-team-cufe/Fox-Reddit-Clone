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

<<<<<<< HEAD



const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // Corrected variable name to 'messaging'
||||||| 6d92f39a... https fcm error
  const messaging = firebase.messaging();

  // Rest of your FCM setup code
  // ...
} else {
  console.warn('FCM is not supported in this browser.');
}
=======
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // Corrected variable name to 'messaging'
>>>>>>> parent of 6d92f39a... https fcm error

export const requestPermission = () => {
  console.log("notification page");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("notification permission granted");
      return getToken(messaging, {
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
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, async (payload) => {
      // Request permission for notifications
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        // Create a new Notification object
        const notification = new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: 'notification-icon.png', // Replace with your notification icon path
        });

        // Add event listeners for notification events
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
    });
  });

export const appFirestore = getFirestore(app);