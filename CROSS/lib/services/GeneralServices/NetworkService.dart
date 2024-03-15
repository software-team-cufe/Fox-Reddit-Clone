// ignore_for_file: file_names

import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:dio/dio.dart';

import '../../Helper/Helper.dart';
import '../../Shared/AppUser.dart';
import '../../Shared/Secrets.dart';
import 'package:get/get.dart' as getx;

class NetworkService {
  static String devBaseUrl = "http://192.168.56.1:3000/";
  static String runBaseUrl = "http://192.168.56.1:3000/";
  static late Dio instance;
  static String accessToken = "";

  static Future<Response?> handelRequest({
    required Future<Response> future,
  }) async {
    try {
      Response res = await future;
      return res;
    } on DioException catch (ex) {
      return ex.response;
    }
  }

  static void initDio() {
    BaseOptions options = BaseOptions(
      baseUrl: Secrets.appMode == ApplicationMode.dev ? devBaseUrl : runBaseUrl,
      receiveTimeout: Secrets.appMode == ApplicationMode.dev
          ? const Duration(seconds: 10)
          : const Duration(seconds: 60),
      connectTimeout: Secrets.appMode == ApplicationMode.dev
          ? const Duration(seconds: 10)
          : const Duration(seconds: 60),
      contentType: 'application/json',
    );
    instance = Dio(options);
    refreshAccessToken(accessToken);
  }

  static void refreshAccessToken(String token) {
    accessToken = token;
    var inter = InterceptorsWrapper(
      onRequest: (options, handeler) async {
        options.headers['token'] = 'Bearer $accessToken';
        options.headers['appKey'] = Secrets.secretKey;
        return handeler.next(options);
      },
      onError: (e, handler) async {
        var res = e.response;

        if (res == null || e.type == DioExceptionType.connectionTimeout) {
          await Helper.showMessage(
            "Connection Error",
            "Please check your internet connection.",
            icon: FontAwesomeIcons.globe,
          );
          return handler.next(e);
        }
        if (res.statusCode == 455) {
          await Helper.showMessage(
            "Authentication Error",
            "You don't have the auth to get in, please login.",
            icon: FontAwesomeIcons.globe,
          );
          await getx.Get.find<AppUser>().signOut();
          return;
        }
        return handler.next(e);
      },
    );
    if (instance.interceptors.length != 2) {
      instance.interceptors.add(inter);
      return;
    }
    instance.interceptors.last = inter;
  }
}
