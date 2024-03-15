import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/GeneralWidgets/AppText.dart';
import 'package:reddit_fox/GeneralWidgets/CustomButton.dart';
import 'package:reddit_fox/GeneralWidgets/CustomTextBox.dart';
import 'package:reddit_fox/GeneralWidgets/Image.dart';
import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';

import '../../Blocs/LoginCubit/login_cubit.dart';

class LoginBody extends StatelessWidget {
  const LoginBody({super.key});

  @override
  Widget build(BuildContext context) {
    final LoginCubit cubit = context.read<LoginCubit>();
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Form(
          key: context.read<LoginCubit>().formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const CustomImage(
                width: 100,
                'Logo.png',
              ),
              const Gap(50),
              Center(
                child: AppText(
                  "Login",
                  textAlign: TextAlign.center,
                  style: FontStyles.bigTitle,
                ),
              ),
              const Gap(20),
              CustomTextBox(
                hintText: "Email or Phone number",
                // icon: FluentIcons.mail_28_regular,
                onChanged: (e) => cubit.email = e,
                isEmail: true,
                validator: (value) {
                  if (value == null || !Helper.isValidEmail(value)) {
                    return "Please enter a valid email.";
                  }
                  return null;
                },
              ),
              const Gap(10),
              BlocBuilder<LoginCubit, LoginState>(
                builder: (context, state) {
                  return CustomTextBox(
                    hintText: "Password",
                    onChanged: (e) => cubit.password = e,
                    // icon: FluentIcons.password_24_regular,
                    isPassword: !context.read<LoginCubit>().showPassword,
                    showEyeIcon: true,
                    isPasswordInput: true,
                    onChangeVisability:
                        context.read<LoginCubit>().changePassword,
                    validator: (txt) => (txt != null && txt.length >= 8)
                        ? null
                        : "Password must be at least 8 charactes",
                  );
                },
              ),
              const Gap(20),
              CustomButton(
                text: "Login",
                onTap: context.read<LoginCubit>().login,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FluentIcons {}
