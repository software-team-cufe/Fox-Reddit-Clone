import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

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
              const CustomTextBox(
                hintText: "Email or Phone number",
                icon: Icons.email,
              ),
              const Gap(10),
              const CustomTextBox(
                hintText: "Password",
                icon: Icons.password,
              ),
              const Gap(20),
              CustomButton(
                text: "Login",
                onTap: () {},
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