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
        child: Lottie.network('https://lottie.host/99f38e23-9344-47fd-9a24-08e1f67e4542/HJQnQvEmsy.json'),
      ),
      nextScreen: const HomePage(),
      duration: 5000,
      splashIconSize: 10000,
      );
  }
}