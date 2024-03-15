import 'package:dio/dio.dart' as dioPage;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Models/ResponseResult.dart';
import 'package:reddit_fox/Pages/Home/HomePage.dart';
import 'package:reddit_fox/services/GeneralServices/NetworkService.dart';


import '../../StartingPage/View/StartingPage.dart';

class EmailVerificationService {
  final dioPage.Dio dio = NetworkService.instance;
  Future<ResponseResult> verifyEmail(int code, String id) async {
    try {
      dioPage.Response res = await dio.post(
        'verify-account',
        data: {
          "code": code,
        },
      );
      return ResponseResult(
        data: res.data,
        icon: null,
        msg: null,
        success: res.statusCode == 200,
      );
    } on dioPage.DioException catch (ex) {
      ResponseResult response = ResponseResult(
        data: null,
        icon: null,
        msg: null,
        success: false,
      );

      var res = ex.response;
      if (res == null) {
        response.internet = false;
        response.msg = null;
        response.success = false;
        return response;
      }
      print(res.data);
      switch (res.statusCode) {
        case 401:
          response.internet = false;
          response.msg =
              "You do not have the authority to activate this account. You will be redirected to the starting page.";
          response.callBack = () => Get.offAll(() => const LandingPage());
        case 405:
          response.msg =
              "The account has already been activated. You will be redirected to the homepage.";
          response.callBack = () => Get.offAll(() => const HomePage());
        case 404:
          response.msg =
              "No user found with the provided information. You will be redirected to the new account creation page.";
          response.callBack = () => Get.offAll(() => const LandingPage());
        case 406:
          response.msg = "Please resend the activation email.";
        case 420:
          response.msg =
              "You have exceeded the allowed number of attempts, and your account has been closed.";
          response.callBack = () {
            Get.offAll(() => const LandingPage());
          };
        case 409:
          response.msg =
              "The code is incorrect. You have ${res.data['trails']} attempts remaining, and the account will be deleted.";
      }
      return response;
    }
  }

  Future<ResponseResult> resendVerificationEmail(String email) async {
    try {
      var res = await dio.get("verify-account/resend?email=$email");
      return ResponseResult(
        data: null,
        icon: null,
        msg: null,
        success: res.statusCode == 200,
      );
    } on dioPage.DioException catch (ex) {
      var res = ex.response;
      if (res == null) {
        return ResponseResult(
          data: null,
          icon: FontAwesomeIcons.globe,
          msg: "Please check your internet connection.",
          success: false,
        );
      }
      var response =
          ResponseResult(data: null, icon: null, msg: null, success: false);
      switch (res.statusCode) {
        case 402:
          response.msg =
              "No user found with this information. You will be redirected to the homepage.";
          response.callBack = () => Get.offAll(() => const LandingPage());
        case 401:
          response.msg =
              "You have exceeded the allowed number of attempts for today. Please come back after 24 hours.";
          response.callBack = () => Get.offAll(() => const LandingPage());
        case 405:
          response.msg =
              "You must wait at least 60 seconds before resending. ${res.data['time']} seconds left for the next attempt.";
      }
      return response;
    }
  }
}
