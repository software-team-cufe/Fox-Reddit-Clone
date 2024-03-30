import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController emailOrPhoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const Gap(50),
              const Center(
                child: Text(
                  "Enter your login information",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const Gap(20),
              CustomTextBox(
                hintText: "Email or Phone number",
                icon: Icons.email,
                controller: emailOrPhoneController, // Added controller
              ),
              const Gap(10),
              CustomTextBox(
                hintText: "Password",
                icon: Icons.password,
                controller: passwordController, // Added controller
              ),
              const Gap(20),
              CustomButton(
                text: "Login",
                onTap: () {
                  // Access entered text using controllers:
                  String emailOrPhone = emailOrPhoneController.text;
                  String password = passwordController.text;
                  Get.to(() => const HomePage()); // temporarily
                  

                  // Perform login logic with the retrieved text
                },
              ),
              const Gap(20),
              TextButton(
                onPressed: () {
                  Get.to(() => const ForgetPasswordScreen());
                },
                child: const Text('Forget password'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
