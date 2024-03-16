import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/GeneralWidgets/CustomButton.dart';
import 'package:reddit_fox/core/common/sign_in_with_google_button.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/features/auth/screens/LoginPage/View/LoginPage.dart';
import 'package:reddit_fox/features/auth/screens/SignupPage/View/SignupPage.dart';


class LandingPage extends StatelessWidget {
  const LandingPage({super.key});
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
          title: Image.asset(
            Constants.logoPath,
            height: 40,
            ),
          actions: [
            TextButton(onPressed: () {}, 
            child: const Text('Skip', 
            style: TextStyle(
              fontWeight : FontWeight.bold,),
              )
              )
              ],  
      ),
      body: Column(
        children: [
          const SizedBox(height:30),
          const Text('dive into anything'
          ,style: TextStyle(
            fontSize: 24, 
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          )
          ),
          const SizedBox(height: 30),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Image.asset(
              Constants.loginPath,
              height: 400,
            ),
          ),
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
          const SizedBox(height: 0),
          const SignInButton()
      ],
      ),
    );
  }  
}