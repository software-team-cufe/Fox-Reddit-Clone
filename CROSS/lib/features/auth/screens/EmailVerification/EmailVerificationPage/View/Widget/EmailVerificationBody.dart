import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/GeneralWidgets/AppText.dart';
import 'package:reddit_fox/GeneralWidgets/CustomButton.dart';
import 'package:reddit_fox/GeneralWidgets/CustomTextBox.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';

import '../../Blocs/EmailVerificationCubit/email_verification_cubit.dart';

class EmailVerificationBody extends StatelessWidget {
  const EmailVerificationBody({super.key});

  @override
  Widget build(BuildContext context) {
    final EmailVerificationCubit cubit = context.read<EmailVerificationCubit>();

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          children: [
            AppText(
              "Email Verification",
              style: FontStyles.bigTitle,
              textAlign: TextAlign.center,
            ),
            const Gap(5),
            const AppText(
              "We have sent a message of 6 digits to adasd",
              textAlign: TextAlign.center,
            ),
            const Gap(20),
            CustomTextBox(
              isNumber: true,
              hintText: '000000',
              letterSpacing: 10,
              textAlign: TextAlign.center,
              onChanged: (e) => cubit.codeStr = e,
              maxLength: 6,
            ),
            Row(
              children: [
                TextButton(
                  onPressed: cubit.resendEmail,
                  child: AppText(
                    "Don't get the message yet? send another one",
                    style: FontStyles.p,
                  ),
                ),
              ],
            ),
            const Gap(40),
            CustomButton(
              text: "Verify account",
              onTap: cubit.verifyEmail,
            ),
            const Gap(10),
            AppText(
              "If you don't find the message in the inbox, please search in the spam or junk folder.",
              style: FontStyles.p,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
