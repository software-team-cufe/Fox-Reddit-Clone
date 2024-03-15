import 'package:dio/dio.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart' as getx;
import 'package:reddit_fox/Models/ResponseResult.dart';
import 'package:reddit_fox/Models/User.dart';
import 'package:reddit_fox/Shared/AppUser.dart';
import 'package:reddit_fox/services/GeneralServices/NetworkService.dart';
import 'package:reddit_fox/services/GeneralServices/StorageService.dart';
import '../../EmailVerification/EmailVerificationPage/View/EmailVerificationPage.dart';

class LoginService {
  final Dio dio = NetworkService.instance;
  Future<ResponseResult> login(String email, String password) async {
    try {
      var res = await dio.post(
        '/login',
        data: {
          "email": email,
          "password": password,
        },
      );

      getx.Get.find<AppUser>().user = User.fromJson(res.data['user']);
      if (getx.Get.find<AppUser>().user!.verifiedEmail) {
        await StorageServices.instance.saveUserToken(res.data['token']);
        NetworkService.refreshAccessToken(res.data['token']);
      }

      return ResponseResult(
        data: null,
        icon: null,
        msg: null,
        success: res.statusCode == 200,
      );
    } on DioException catch (ex) {
      var res = ex.response;
      if (res == null) {
        return ResponseResult(
          data: null,
          icon: null,
          msg: null,
          success: false,
        );
      }

      if (res.statusCode == 401) {
        return ResponseResult(
          data: null,
          icon: FontAwesomeIcons.faceSadCry,
          msg: "Please check email or password!",
          success: false,
        );
      }

      if (res.statusCode == 400 && res.data['errors'] != null) {
        return ResponseResult(
          data: null,
          icon: FontAwesomeIcons.faceSadCry,
          msg: res.data['errors'][0]['msg'],
          success: false,
        );
      }

      NetworkService.refreshAccessToken(res.data['token'] ?? "");
      getx.Get.find<AppUser>().user = User.fromJson(res.data['user']);
      return ResponseResult(
        data: null,
        icon: null,
        msg:
            "Please verify your account first, you will be redirected to verify account page.",
        success: false,
        callBack: () => getx.Get.to(() => EmailVerificationPage(
              email: getx.Get.find<AppUser>().user!.email,
            )),
      );
    }
  }
}
