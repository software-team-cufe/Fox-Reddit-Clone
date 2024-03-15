// ignore_for_file: file_names

import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Models/ResponseResult.dart';

class HandelNetworkRequest {
  static Future<bool> handelRequest(ResponseResult res) async {
    if (res.success) {
      return true;
    }
    if (!res.internet) return false;
    if (res.msg != null) {
      await Helper.showMessage(
        'Error',
        res.msg!,
        icon: res.icon,
      );
    }
    return false;
  }
}
