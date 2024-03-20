import 'package:fluentui_system_icons/fluentui_system_icons.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/models/user_model.dart';

import '../../../core/common/CustomCheckBox.dart';
import '../../../core/common/CustomDatePicker.dart';
import '../../../core/common/CustomTextBox.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
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

  bool acceptTerms = false;
  bool showPass = false;

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
              const CustomTextBox(
                hintText: "Name",
                icon: FluentIcons.rename_28_regular,
              ),
              const SizedBox(height: 20),
              const CustomTextBox(
                hintText: "Email",
                icon: FluentIcons.mail_28_regular,
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
              const SizedBox(height: 40),
              CustomButton(
                text: "Create account",
                onTap: () {},
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
