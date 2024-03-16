import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Pages/Home/HomePage.dart';
import '../../Services/LoginService.dart';
part 'login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  LoginCubit() : super(ChangePasswordVisiableState());
  final LoginService _service = LoginService();
  bool showPassword = false;
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  String email = "";
  String password = "";
  void changePassword() {
    showPassword = !showPassword;
    emit(ChangePasswordVisiableState());
  }

  void login() async {
    if (formKey.currentState != null && !formKey.currentState!.validate()) {
      return;
    }
    var res = await Helper.showLoading(
      "Logging in",
      "Please wait",
      () => _service.login(email.trim(), password.trim()),
    );
    if (!res.success) {
      if (res.msg != null) {
        await Helper.showMessage(
          "Error during login",
          res.msg!,
          icon: res.icon,
        );
      }
      if (res.callBack != null) {
        res.callBack!();
      }
      return;
    }
    Get.offAll(() => const HomePage());
  }
}
