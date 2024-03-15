import 'dart:io';

import 'package:flutter/material.dart';


import '../Helper/Helper.dart';
import 'Image.dart';

class CustomUserImage extends StatelessWidget {
  const CustomUserImage({
    super.key,
    required this.url,
    this.radius = 27,
    this.verified,
    this.file,
  });
  final String url;
  final File? file;
  final double radius;
  final bool? verified;
  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        CircleAvatar(
          radius: radius,
          backgroundColor: Colors.transparent,
          backgroundImage: file != null
              ? FileImage(File(file!.path))
              : url.isNotEmpty
                  ? Helper.loadImageProvider(url, 'user.png')
                  : const AssetImage(
                      'assets/images/user.png',
                    ),
        ),
        if (verified == true)
          Positioned(
            right: 0,
            bottom: -5,
            child: CustomImage(
              'verified.png',
              width: 0.8 * radius,
            ),
          ),
      ],
    );
  }
}
