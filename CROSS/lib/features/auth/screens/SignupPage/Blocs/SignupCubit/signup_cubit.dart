import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Models/ResponseResult.dart';
import 'package:reddit_fox/Models/User.dart';
import 'package:reddit_fox/Shared/AppUser.dart';
import 'package:reddit_fox/services/GeneralServices/NetworkService.dart';

import '../../../EmailVerification/EmailVerificationPage/View/EmailVerificationPage.dart';
import '../../Service/SignupService.dart';

part 'signup_state.dart';

class SignupCubit extends Cubit<SignupState> {
  SignupCubit() : super(SignupInitial());
  GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final user = User();
  bool acceptConditions = false;
  bool showPassword = false;
  final SignupService _service = SignupService();

  void signup() async {
    if (formKey.currentState != null && !formKey.currentState!.validate()) {
      return;
    }
    if (!acceptConditions) {
      await Helper.showMessage(
        "Terms and conditions",
        "Please accept terms and conditions",
        icon: FontAwesomeIcons.fileLines,
      );
      return;
    }
    ResponseResult res = await Helper.showLoading<ResponseResult>(
      "Creating your account",
      "Please wait",
      () => _service.signup(user),
    );
    if (!res.success) {
      if (res.msg != null) {
        await Helper.showMessage(
          "Error while creating account",
          res.msg!,
          icon: res.icon,
        );
      }
      if (res.callBack != null) {
        res.callBack!();
      }
      return;
    }
    NetworkService.refreshAccessToken(res.data['token']);
    Get.find<AppUser>().user = User.fromJson(res.data['user']);
    Get.to(() => EmailVerificationPage(
          email: Get.find<AppUser>().user!.email,
        ));
  }

  void changeUserBirthDate(DateTime date) async {
    user.birthdate = date;
    emit(ChangeBirthdateState());
  }

  void changePasswordVisability() {
    showPassword = !showPassword;
    emit(ChangePasswordVisabilityState());
  }

  void changeUserGender(bool? val) {
    if (val != null && val != user.gender) {
      user.gender = val;
      emit(ChangeGenderState());
    }
  }

  void changeConditions(bool val) {
    acceptConditions = !acceptConditions;
    emit(ChangeConditionsState());
  }
}
