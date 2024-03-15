// ignore_for_file: unused_import

import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:reddit_fox/Configs.dart';
import 'package:reddit_fox/Pages/Home/HomePage.dart';
import 'package:reddit_fox/features/auth/screens/EmailVerification/EmailVerificationPage/View/EmailVerificationPage.dart';
import 'package:reddit_fox/features/auth/screens/StartingPage/View/StartingPage.dart';

import 'Shared/AppColors.dart';
import 'Shared/Fonts/FontModel.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configs();

  runApp(const Fox());
}

class Fox extends StatelessWidget {
  const Fox({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      themeMode: AppColors.mode,
      darkTheme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: AppColors.instance.background,
        appBarTheme: AppBarTheme(
          titleTextStyle: TextStyle(
            fontFamily: FontFamily.bold,
            fontSize: 17,
            color: AppColors.instance.text,
          ),
          backgroundColor: AppColors.instance.background,
          foregroundColor: AppColors.instance.text,
          elevation: 0,
        ),
      ),
      theme: ThemeData.light().copyWith(
        scaffoldBackgroundColor: AppColors.instance.background,
        appBarTheme: AppBarTheme(
          titleTextStyle: TextStyle(
            fontFamily: FontFamily.bold,
            fontSize: 17,
            color: AppColors.instance.text,
          ),
          foregroundColor: AppColors.instance.text,
          backgroundColor: AppColors.instance.background,
          elevation: 0,
        ),
      ),
      home: const LandingPage(),
    );
  }
}
