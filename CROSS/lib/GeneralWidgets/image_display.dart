import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io';

class ImageDisplay extends StatelessWidget {
  final String imagePath;

  const ImageDisplay({Key? key, required this.imagePath}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return Image.network(imagePath);
    } else {
      return Image.file(File(imagePath));
    }
  }
}
