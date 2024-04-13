import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/sign_in_with_google_button.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/signup_screen.dart';

class StartingScreen extends StatelessWidget {
  const StartingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Image.asset(
          Constants.logoPath,
          height: 60,
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(18.0),
          child: Column(
            children: [
              const SizedBox(height: 30),
              const Text('Dive into anything',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.5,
                  )),
              const SizedBox(height: 30),
              Image.asset(
                Constants.loginPath,
                height: 250,
              ),
              const SizedBox(height: 20),
              const SignInWithGoogleButton(),
              const Gap(20),
              CustomButton(
                text: "Login",
                borderRadius: 10,
                verticalPadding: 13,
                onTap: () {
                  Get.to(() => const LoginScreen());
                },
              ),
              const Gap(15),
              CustomButton(
                text: "Signup",
                borderRadius: 10,
                verticalPadding: 13,
                onTap: () {
                  Get.to(() => const SignupScreen());
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
