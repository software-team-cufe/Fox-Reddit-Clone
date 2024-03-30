import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';

class LoginScreen extends StatefulWidget {
  static login(final String email, final String password) {
    String messages = '';
    if (email.trim().isEmpty) messages = "$messages Please enter email";
    RegExp emailpaatern = RegExp(
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    if (!emailpaatern.hasMatch(email)) {
      messages = "$messages,Please enter a valid email";
    }

    if (password.trim().isEmpty) messages = "$messages,Please enter password";
    if (password.length < 7) {
      messages = "$messages,Please enter more than 7 characters password";
    }
    if (messages == '') return null;
    return messages;
  }

  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

  String? errormessage;

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
                controller: emailController, // Added controller
              ),
              const Gap(10),
              CustomTextBox(
                hintText: "Password",
                icon: Icons.password,
                controller: passwordController, // Added controller
              ),
              const Gap(20),
              if (errormessage != null) Text(errormessage!),
              CustomButton(
                  text: "Login",
                  onTap: () {
                    setState(() {
                      errormessage = LoginScreen.login(
                          emailController.text, passwordController.text);
                    });
                    if (errormessage == null) {
                      Get.to(() => const HomePage());
                    }
                  }),
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
