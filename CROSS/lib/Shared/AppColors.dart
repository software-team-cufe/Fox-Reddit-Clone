import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AppColors {
  static ThemeMode mode = ThemeMode.light;
  static late AppColors instance;
  final Color primary;
  final Color secondary;
  final Color secondarySelect;
  final Color background;
  final Color text;
  final Color textFade;
  final Color borderText;
  final Color textInvert;
  final OutlineInputBorder borderObj;

  static AppColors light = AppColors(
    primary: const Color.fromRGBO(233, 76, 0, 1),
    secondary: const Color.fromRGBO(238, 240, 246, 1),
    secondarySelect: const Color.fromRGBO(245, 246, 250, 1),
    background: const Color.fromRGBO(255, 255, 255, 1),
    text: const Color.fromRGBO(19, 19, 19, 1),
    textFade: const Color.fromRGBO(102, 102, 102, 1),
    borderText: const Color.fromRGBO(237, 235, 235, 1),
    textInvert: const Color.fromRGBO(255, 255, 255, 1),
    borderObj: OutlineInputBorder(
      borderSide: const BorderSide(color: Color.fromRGBO(237, 235, 235, 1)),
      borderRadius: BorderRadius.circular(20),
    ),
  );

  static AppColors dark = AppColors(
    primary: const Color.fromRGBO(93, 59, 229, 1),
    secondary: const Color.fromRGBO(26, 26, 26, 1),
    secondarySelect: const Color.fromRGBO(51, 51, 51, 1),
    background: const Color.fromARGB(255, 0, 0, 0),
    text: const Color.fromARGB(255, 255, 255, 255),
    textFade: const Color.fromRGBO(102, 102, 102, 1),
    borderText: const Color.fromRGBO(237, 235, 235, 1),
    textInvert: const Color.fromARGB(255, 0, 0, 0),
    borderObj: OutlineInputBorder(
      borderSide: const BorderSide(color: Color.fromRGBO(237, 235, 235, 1)),
      borderRadius: BorderRadius.circular(10),
    ),
  );

  AppColors({
    required this.primary,
    required this.secondary,
    required this.secondarySelect,
    required this.background,
    required this.text,
    required this.textFade,
    required this.borderText,
    required this.textInvert,
    required this.borderObj,
  });
  static void init() {
    if (mode == ThemeMode.light) {
      instance = light;
    } else {
      instance = dark;
    }
    Get.changeThemeMode(mode);
  }
}
