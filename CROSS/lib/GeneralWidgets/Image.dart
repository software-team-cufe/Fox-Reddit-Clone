import 'package:flutter/material.dart';

class CustomImage extends StatelessWidget {
  const CustomImage(
    this.name, {
    super.key,
    this.fit,
    this.width,
    this.height,
    this.opacity,
  });
  final String name;
  final BoxFit? fit;
  final double? width;
  final double? height;
  final double? opacity;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Image.asset(
        'assets/images/$name',
        fit: fit,
        opacity: AlwaysStoppedAnimation(opacity ?? 1),
      ),
    );
  }
}
