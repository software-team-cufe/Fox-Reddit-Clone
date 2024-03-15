import 'package:flutter/material.dart';

import '../GeneralWidgets/AppText.dart';
import '../Shared/Fonts/FontModel.dart';

class Loading extends StatelessWidget {
  const Loading({
    super.key,
    required this.title,
    required this.content,
  });
  final String title;
  final String content;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AppText(
            title,
            style: TextStyle(
              fontFamily: FontFamily.bold,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              const CircularProgressIndicator(),
              const SizedBox(width: 20),
              Expanded(child: AppText(content)),
            ],
          ),
        ],
      ),
    );
  }
}
