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
        child: Lottie.network('https://lottie.host/497cccf2-2379-415c-97f2-a142b0d43d3c/FHk9HRSZFJ.json'),
      ),
      nextScreen: const HomePage(),
      duration: 5000,
      splashIconSize: 3000,
      );
  }
}