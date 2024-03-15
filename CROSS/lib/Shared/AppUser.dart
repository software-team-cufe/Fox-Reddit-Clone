import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/features/auth/screens/StartingPage/View/StartingPage.dart';

import '../Helper/Helper.dart';
import '../Models/User.dart';
import '../services/GeneralServices/NetworkService.dart';
import '../services/GeneralServices/StorageService.dart';

class AppUser extends GetxController {
  User? user;
  AppUser();
  String deviceToken = "";
  Future<void> signOut() async {
    final dio = NetworkService.instance;
    try {
      var res = await dio.post('signout');

      if (res.statusCode == 200) {
        user = null;

        await StorageServices.instance.removeUserToken();
        NetworkService.refreshAccessToken('');
        Get.offAll(() => const LandingPage());
      }
    } on DioException catch (_) {
      await Helper.showMessage(
        "Error in signout",
        'Unknown error occured, please try again later.',
      );
    }
  }
}
