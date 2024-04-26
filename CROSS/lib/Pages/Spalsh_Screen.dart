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
        child: Lottie.asset('assets/Splash.json'),
      ),
      nextScreen: const HomePage(),
      duration: 5000,
      splashIconSize: 3000,
      );
  }
}