import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/features/auth/screens/chat_screen.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/firebase_options.dart';
import 'package:reddit_fox/theme/pallete.dart';
import 'package:device_preview/device_preview.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(
    // DevicePreview(
    //   builder: (context) => const MyApp(),
    // ),
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Fox App',
      theme: Pallete.darkModeAppTheme,
      home: const StartingScreen(),
//      locale: DevicePreview.locale(context),
  //    builder: DevicePreview.appBuilder,
    );
  }
}
