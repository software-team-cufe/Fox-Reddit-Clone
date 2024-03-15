import 'package:flutter/material.dart';

class ResponseResult {
  String? msg;
  IconData? icon;
  bool internet = false;
  bool success;
  dynamic data;
  Function()? callBack;
  ResponseResult({
    required this.data,
    required this.icon,
    this.internet = true,
    this.callBack,
    required this.msg,
    required this.success,
  });
}
