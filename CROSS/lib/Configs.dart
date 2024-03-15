// ignore_for_file: file_names

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'Shared/AppColors.dart';
import 'Shared/AppUser.dart';
import 'Shared/Secrets.dart';
import 'GeneralWidgets/AppText.dart';

import 'services/GeneralServices/NetworkService.dart';
import 'services/GeneralServices/StorageService.dart';

Future<void> configs() async {
  Secrets.appMode = kDebugMode ? ApplicationMode.dev : ApplicationMode.run;
  AppText.defaultLanguage = TextLanguage.english;
  await StorageServices.instance.initPrefs();
  NetworkService.initDio();
  // AppColors.mode = StorageServices.instance.getTheme() == "dark"
  //     ? ThemeMode.dark
  //     : ThemeMode.light;
  AppColors.mode = ThemeMode.light;
  AppColors.init();
  Get.put(AppUser());
}
