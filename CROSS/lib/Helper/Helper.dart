// ignore_for_file: file_names

import 'dart:async';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/foundation.dart';

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

import 'package:get/get.dart';
import 'package:reddit_fox/Shared/AppColors.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';

import '../GeneralWidgets/AppText.dart';
import '../GeneralWidgets/CustomButton.dart';
import '../GeneralWidgets/CustomContainer.dart';
import '../GeneralWidgets/CustomTextBox.dart';
import '../Shared/Fonts/FontModel.dart';
import 'Loading.dart';

class Helper {
  static const _shape = RoundedRectangleBorder(
    borderRadius: BorderRadius.all(
      Radius.circular(10),
    ),
  );
  static ImageProvider loadImageProvider(String url, String assetsPath) {
    if (url.isNotEmpty) {
      bool validUrl = Uri.parse(url).isAbsolute;
      if (validUrl) {
        return CachedNetworkImageProvider(url);
      } else {
        return AssetImage('assets/images/$assetsPath');
      }
    } else {
      return AssetImage('assets/images/$assetsPath');
    }
  }

  static Widget loadNetworkImage(String url, String assetsErrorPath,
      [BoxFit fit = BoxFit.cover]) {
    if (url.isNotEmpty) {
      bool validUrl = Uri.parse(url).isAbsolute;
      if (validUrl) {
        return CachedNetworkImage(
          imageUrl: url,
          fit: fit,
          placeholder: (ctx, str) => Helper.loadingWidget(),
          errorWidget: (ctx, str, obj) =>
              Image.asset("assets/images/$assetsErrorPath"),
        );
      } else {
        return Image.asset("assets/images/$assetsErrorPath");
      }
    } else {
      return Image.asset("assets/images/$assetsErrorPath");
    }
  }

  static FutureOr<T> showLoading<T>(
    String title,
    String content,
    Future<T> Function() future,
  ) async {
    showDialog(
      context: Get.context!,
      barrierDismissible: !kDebugMode,
      builder: (_) => WillPopScope(
        onWillPop: () async {
          return !kDebugMode;
        },
        child: AlertDialog(
          shape: _shape,
          content: Loading(
            title: title,
            content: content,
          ),
        ),
      ),
    );

    T res = await future();
    Get.back();
    return res;
  }

  static Widget buildInfo(IconData icon, String title, String data) =>
      CustomContainer(
        width: double.infinity,
        verticalPadding: 5,
        horizontalPadding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backColor: Colors.white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Row(
                children: [
                  Icon(icon),
                  const SizedBox(width: 5),
                  AppText(title),
                ],
              ),
            ),
            AppText(data),
          ],
        ),
      );

  static bool isValidEmail(String email) => RegExp(
          r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
      .hasMatch(email);

  static void showSnackBarMessage(
    BuildContext context,
    String content,
  ) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: AppText(content),
      showCloseIcon: true,
    ));
  }

  static Future<void> showMessage(
    String title,
    String message, {
    IconData? icon,
    Color? iconColor,
  }) async {
    await showDialog(
      context: Get.context!,
      builder: (ctx) => AlertDialog(
        shape: _shape,
        backgroundColor: AppColors.instance.secondarySelect,
        content: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null)
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      icon,
                      size: 90,
                      color: iconColor,
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              AppText(
                title,
                style: TextStyle(
                  fontFamily: FontFamily.bold,
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 10),
              Flexible(
                child: SingleChildScrollView(
                  child: AppText(
                    message,
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
              const SizedBox(height: 30),
              CustomButton(
                text: "OK",
                verticalPadding: 5,
                onTap: () {
                  Get.back();
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  static Future<T?> showBottomSheetWidget<T>(
    Widget child,
  ) async {
    final res = await showModalBottomSheet<T>(
      context: Get.context!,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(15),
        ),
      ),
      builder: (ctx) => Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.center,
        children: [
          Positioned(
            top: -50,
            child: CircleAvatar(
              backgroundColor: Colors.white,
              child: IconButton(
                onPressed: () {
                  Get.back();
                },
                style: IconButton.styleFrom(
                  backgroundColor: Colors.white,
                ),
                icon: const Icon(
                  Icons.close,
                  color: Colors.black,
                ),
              ),
            ),
          ),
          DraggableScrollableSheet(
            expand: false,
            maxChildSize: 1,
            builder: (ctx, ctrl) => SizedBox(
              width: double.infinity,
              child: SingleChildScrollView(
                controller: ctrl,
                child: child,
              ),
            ),
          ),
        ],
      ),
    );
    return res;
  }

  static Future<String?> getStringFromMessage(
    String title,
    String hintText, {
    IconData? icon,
    Color? iconColor,
    String? initialValue,
  }) async {
    String txt = initialValue ?? "";
    String? save = await showDialog<String>(
      context: Get.context!,
      builder: (ctx) => AlertDialog(
        shape: _shape,
        backgroundColor: AppColors.instance.secondarySelect,
        content: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const SizedBox(width: 1000),
              if (icon != null)
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      icon,
                      size: 90,
                      color: iconColor,
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              AppText(
                title,
                style: TextStyle(
                  fontFamily: FontFamily.bold,
                  fontSize: 25,
                ),
              ),
              const SizedBox(height: 10),
              CustomTextBox(
                hintText: hintText,
                initialValue: initialValue,
                onChanged: (e) => txt = e,
              ),
              const SizedBox(height: 30),
              CustomButton(
                text: "OK",
                onTap: () {
                  Get.back<String>(result: txt);
                },
              ),
            ],
          ),
        ),
      ),
    );
    return save;
  }

  static Future<bool> showYesNoMessage(
    String title,
    String message, {
    IconData? icon,
    Color? iconColor,
  }) async {
    bool? ok = await showDialog<bool>(
      context: Get.context!,
      builder: (ctx) => AlertDialog(
        shape: _shape,
        content: Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 10,
            horizontal: 5,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null)
                Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      icon,
                      size: 75,
                      color: iconColor,
                    ),
                    const Gap(20),
                  ],
                ),
              AppText(
                title,
                style: FontStyles.title,
              ),
              const SizedBox(height: 10),
              AppText(
                message,
                textAlign: TextAlign.center,
                style: FontStyles.body,
              ),
              const SizedBox(height: 30),
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  CustomButton(
                    text: "Yes",
                    verticalPadding: 7,
                    onTap: () {
                      Get.back<bool>(result: true);
                    },
                  ),
                  const Gap(15),
                  CustomButton(
                    text: "No",
                    verticalPadding: 7,
                    onTap: () {
                      Get.back<bool>(result: false);
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
    return ok ?? false;
  }

  static Size size(BuildContext context) => MediaQuery.of(context).size;

  static Widget loadingWidget([double? size]) => SizedBox.square(
        dimension: size,
        child: const Center(
          child: CircularProgressIndicator(),
        ),
      );
}
