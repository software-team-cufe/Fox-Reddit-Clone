import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/models/user_model.dart';

import '../../../core/common/CustomCheckBox.dart';
import '../../../core/common/CustomDatePicker.dart';
import '../../../core/common/CustomTextBox.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();

  static String? signup(final String email, final String password, String? name,
      bool termsandconditions) {
    String? errorMessage;
    if (email.trim().isEmpty) errorMessage = "Please enter email";
    RegExp emailPattern = RegExp(
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    if (!emailPattern.hasMatch(email) ||
        password.trim().isEmpty ||
        password.length < 7 ||
        name == null) {
      return 'Please enter Valid Data and accept termsandconditions';
    }

    return null;
  }
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final UserModel user = UserModel(
    name: "",
    profilePic: "",
    banner: "",
    uid: "",
    isAuthenticated: false,
    karma: 1,
    email: '',
    password: '',
    birthDate: DateTime.now(),
  );

  bool valid = true;
  bool acceptTerms = false;
  bool showPass = false;
  String? errorMessage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Signup"),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const Text(
                "Hi new friend, welcome to Fox",
                style: TextStyle(
                  fontSize: 19,
                  fontWeight: FontWeight.w900,
                ),
                textAlign: TextAlign.center,
              ),
              const Gap(10),
              const Text(
                "Please enter your data to create your account",
                textAlign: TextAlign.center,
              ),
              const Gap(10),
              CustomTextBox(
                hintText: "Name",
                icon: FluentIcons.rename_28_regular,
                controller: nameController,
              ),
              const SizedBox(height: 20),
              CustomTextBox(
                hintText: "Email",
                icon: FluentIcons.mail_28_regular,
                controller: emailController,
              ),
              const SizedBox(height: 20),
              CustomTextBox(
                hintText: "Password",
                isPassword: showPass,
                icon: FluentIcons.password_24_regular,
                showEyeIcon: true,
                onChangeVisability: () {
                  setState(() {
                    showPass = !showPass;
                  });
                },
                controller: passwordController,
              ),
              const SizedBox(height: 20),
              CustomDatePicker(
                subTitle: "Birthdate",
                icon: FluentIcons.calendar_32_regular,
                currentDate: user.birthDate,
                onChanged: (e) {
                  setState(() {
                    user.birthDate = e;
                  });
                },
              ),
              const Gap(10),
              const Gap(10),
              CustomCheckBox(
                value: acceptTerms,
                text: "Accept terms and conditions",
                onChange: (bool x) {
                  setState(() {
                    acceptTerms = x;
                  });
                },
              ),
              if (errorMessage != null) Text(errorMessage!),
              const SizedBox(height: 40),
              CustomButton(
                text: "Create account",
                onTap: () {
                  setState(() {
                    errorMessage = SignupScreen.signup(
                        emailController.text,
                        passwordController.text,
                        nameController.text,
                        acceptTerms);
                  });
                  if (errorMessage == null) {
                    Get.to(() => const HomePage());
                  }
                },
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
