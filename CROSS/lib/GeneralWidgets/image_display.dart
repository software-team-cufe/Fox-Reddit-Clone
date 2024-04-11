import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io';

class ImageDisplay extends StatelessWidget {
  final String imagePath;

  const ImageDisplay({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return Image.network(imagePath);
    } else {
      return Image.file(File(imagePath));
    }
  }
}
