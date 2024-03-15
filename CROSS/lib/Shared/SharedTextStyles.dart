import 'package:flutter/material.dart';
import 'package:reddit_fox/Shared/AppColors.dart';

import 'Fonts/FontModel.dart';

class FontStyles {
  static TextStyle p = TextStyle(
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: AppColors.instance.textFade,
  );
  static TextStyle small = TextStyle(
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: AppColors.instance.text,
  );
  static TextStyle body = TextStyle(
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: AppColors.instance.text,
  );
  static TextStyle input = TextStyle(
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: AppColors.instance.text,
  );
  static TextStyle title = TextStyle(
    fontSize: 18.4,
    fontFamily: FontFamily.bold,
    color: AppColors.instance.text,
  );
  static TextStyle bigTitle = TextStyle(
    fontSize: 35,
    fontFamily: FontFamily.black,
    color: AppColors.instance.text,
  );
  static TextStyle listTitle = TextStyle(
    fontSize: 19,
    fontFamily: FontFamily.bold,
    color: AppColors.instance.text,
  );
}
