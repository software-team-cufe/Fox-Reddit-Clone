import 'package:dio/dio.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/Models/ResponseResult.dart';
import 'package:reddit_fox/Models/User.dart';
import 'package:reddit_fox/Shared/AppUser.dart';
import 'package:reddit_fox/services/GeneralServices/NetworkService.dart';

class SignupService {
  final Dio dio = NetworkService.instance;
  Future<ResponseResult> signup(User user) async {
    try {
      Map<String, dynamic> mp = user.toJsonSignup();
      mp['deviceId'] = Get.find<AppUser>().deviceToken;
      var res = await dio.post(
        'signup',
        data: mp,
      );

      return ResponseResult(
        success: res.statusCode == 200,
        icon: null,
        msg: null,
        data: res.data,
      );
    } on DioException catch (ex) {
      var res = ex.response;

      if (res == null) {
        return ResponseResult(
          success: false,
          icon: null,
          internet: false,
          msg: null,
          data: null,
        );
      }

      if (res.statusCode == 400) {
        return ResponseResult(
          success: false,
          icon: FontAwesomeIcons.faceSadCry,
          msg: null,
          data: res.data,
        );
      }
      if (res.statusCode == 409) {
        return ResponseResult(
          success: false,
          icon: FontAwesomeIcons.faceSadCry,
          msg: "This account is already used, please login instead",
          data: null,
        );
      }
      return ResponseResult(
        success: false,
        icon: FontAwesomeIcons.faceSadCry,
        msg: null,
        data: res.data['msg'],
      );
    }
  }
}
