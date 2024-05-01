import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';


class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AnimatedSplashScreen(
      backgroundColor: Colors.black,
      splash: Center(
        child: Lottie.network('https://lottie.host/b2f3d81f-e622-4e39-af07-e203bd8967c8/7u8rRzv4Lb.json'),
      ),
      nextScreen: const HomePage(),
      duration: 5000,
      splashIconSize: 3000,
      );
  }
}