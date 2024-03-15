import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/GeneralWidgets/AppText.dart';
import 'package:reddit_fox/GeneralWidgets/CustomButton.dart';

import 'package:gap/gap.dart';
import '../../LoginPage/View/LoginPage.dart';
import '../../SignupPage/View/SignupPage.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 35),
          child: Column(
            children: [
              AppText(
                "Welcome back",
                // style: FontStyles.bigTitle,
                textAlign: TextAlign.center,
              ),
              const Gap(20),
              CustomButton(
                text: "Login",
                onTap: () {
                  Get.to(() => const LoginPage());
                },
              ),
              const Gap(10),
              CustomButton(
                text: "Create new account",
                onTap: () {
                  Get.to(() => const SignupPage());
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
