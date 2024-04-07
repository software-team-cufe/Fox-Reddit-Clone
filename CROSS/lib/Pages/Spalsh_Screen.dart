import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';


class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State <SplashScreen> createState() =>  SplashScreenState();
}

class  SplashScreenState extends State <SplashScreen> with SingleTickerProviderStateMixin {

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 5), () {
      Navigator.of(context).pushReplacement(MaterialPageRoute(
        builder: (_) => const HomePage(),
      ));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Lottie.network('https://lottie.host/5a3bf80e-f5c9-4db7-b68a-b1e872352143/HYne9d5BEl.json'),  
          ),
    );
  }
}
