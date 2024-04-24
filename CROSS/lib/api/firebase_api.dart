import 'dart:async';
import 'dart:convert';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:reddit_fox/Pages/messages.dart' as kofta;
import 'package:reddit_fox/main.dart';

/// A function to handle background messages received by the Firebase Cloud Messaging (FCM) service.
///
/// This function is invoked when the app receives a background message from FCM.
/// It prints information about the message, including the title, body, and payload.
///
/// @param message The remote message received in the background.
Future<void> handleBackgroundMessage(RemoteMessage message) async {
  print('Title: ${message.notification?.title}');
  print('Body: ${message.notification?.body}');
  print('Payload: ${message.data}');
}

/// A class encapsulating Firebase Cloud Messaging (FCM) functionality.
///
/// This class provides methods to initialize and manage notifications using FCM.
class FirebaseApi {
  final _firebaseMessaging = FirebaseMessaging.instance;

  final _androidChannel = const AndroidNotificationChannel(
    'high_importance_channel',
    'High Importance Notifications',
    description: 'This channel is used for important notifications',
    importance: Importance.defaultImportance,
  );
  final _localNotifications = FlutterLocalNotificationsPlugin();

  void handleMessage(RemoteMessage? message) {
    if (message == null) return;
    navigatorKey.currentState?.pushNamed(
      kofta.Message.route,
      arguments: message,
    );
  }

  Future<void> initLocalNotifications() async {
    const iOS = DarwinInitializationSettings();
    const android = AndroidInitializationSettings('@drawable/popular');
    const settings = InitializationSettings(android: android, iOS: iOS);  
   await _localNotifications.initialize(
  settings
  // onSelectNotification: (String? payload) async {
  //   if (payload != null) {
  //     final message = RemoteMessage.fromMap(jsonDecode(payload));
  //     handleMessage(message);
   // }
   );
  

    final platform = _localNotifications.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
    await platform?.createNotificationChannel(_androidChannel); 
  }

  Future<void> initPushNotifications() async {
    await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
      alert: true,
      badge: true,
      sound: true,
    );

    FirebaseMessaging.instance.getInitialMessage().then(handleMessage);
    FirebaseMessaging.onMessageOpenedApp.listen(handleMessage);
    FirebaseMessaging.onBackgroundMessage(handleBackgroundMessage);
    FirebaseMessaging.onMessage.listen((message) {
      final notification = message.notification;
      if (notification == null) return;

      _localNotifications.show(
        notification.hashCode,
        notification.title,
        notification.body,
        NotificationDetails(
          android: AndroidNotificationDetails(
            _androidChannel.id,
            _androidChannel.name,
            channelDescription: _androidChannel.description,
            icon: '@drawable/popular',
          ),
        ),
        payload: jsonEncode(message.toMap()),
      );
    });
  }

  /// Initializes Firebase Cloud Messaging (FCM) notifications.
  ///
  /// This method requests permission to receive notifications from FCM,
  /// retrieves the FCM token, and registers a background message handler.
  ///
  /// @throws FirebaseMessagingError if an error occurs during initialization.
  Future<void> initNotifications() async {
    await _firebaseMessaging.requestPermission();
    final fCMToken = await _firebaseMessaging.getToken();
    print('Token: $fCMToken');
    await initLocalNotifications();
    initPushNotifications();
  }
}
