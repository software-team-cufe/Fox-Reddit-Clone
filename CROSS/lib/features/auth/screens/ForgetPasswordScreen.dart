import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';

class ForgetPasswordScreen extends StatelessWidget {
  const ForgetPasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Reset Password"),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const Gap(50),
              const Center(
                child: Text(
                  "Reset your password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Center(
                child: Text(
                  "Enter your email address or username and we'll send you a link to reset your password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey.shade500,
                  ),
                ),
              ),
              const Gap(20),
              const CustomTextBox(
                hintText: "Email or username",
              ),
              const Gap(20),
              CustomButton(
                text: "Reset password",
                onTap: () {},
              ),
            ],
          ),
        ),
      ),
    );
  }
}
