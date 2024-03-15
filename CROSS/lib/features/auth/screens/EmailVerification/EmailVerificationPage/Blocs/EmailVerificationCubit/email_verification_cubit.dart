import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Models/ResponseResult.dart';
import 'package:reddit_fox/Pages/Home/HomePage.dart';
import 'package:reddit_fox/Shared/AppUser.dart';
import 'package:reddit_fox/services/GeneralServices/NetworkService.dart';
import 'package:reddit_fox/services/GeneralServices/StorageService.dart';

import '../../../Service/EmailVerificationService.dart';

part 'email_verification_state.dart';

class EmailVerificationCubit extends Cubit<EmailVerificationState> {
  EmailVerificationCubit(this.email) : super(EmailVerificationInitial());
  String codeStr = "";
  final String email;
  final EmailVerificationService _service = EmailVerificationService();
  void resendEmail() async {
    ResponseResult res = await Helper.showLoading<ResponseResult>(
      "Sending the message",
      "Please wail",
      () => _service.resendVerificationEmail(email),
    );
    if (!res.success) {
      if (res.msg != null) {
        await Helper.showMessage(
          "Error",
          res.msg!,
          icon: res.icon,
        );
      }
      if (res.callBack != null) {
        res.callBack!();
      }
      return;
    }
    await Helper.showMessage(
      "Message sent succefuly",
      "Please note that the next sending process will occur after 60 seconds.",
      icon: Icons.check_circle,
    );
  }

  void verifyEmail() async {
    int? code = int.tryParse(codeStr);
    if (code == null) {
      await Helper.showMessage(
        "Error in code entry.",
        "Please rewrite the code.",
      );

      codeStr = "";
      return;
    }

    ResponseResult res = await Helper.showLoading<ResponseResult>(
      "Verifying the number.",
      "Please wait a moment.",
      () => _service.verifyEmail(
        code,
        Get.find<AppUser>().user!.id,
      ),
    );
    if (!res.success) {
      if (res.msg != null) {
        await Helper.showMessage(
          "Error during email verification.",
          res.msg!,
        );
      }
      if (res.callBack != null) {
        res.callBack!();
      }
      return;
    }
    NetworkService.refreshAccessToken(res.data['token']);
    await StorageServices.instance.saveUserToken(res.data['token']);

    Get.offAll(() => const HomePage());
  }
}
