import 'package:flutter/material.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';
import '../Shared/AppColors.dart';
import 'AppText.dart';

class CustomRadioButton<T> extends StatelessWidget {
  const CustomRadioButton({
    super.key,
    required this.text,
    required this.value,
    required this.groupValue,
    required this.onChanged,
  });
  final String text;
  final T value;
  final T groupValue;
  final void Function(T?) onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Radio<T>(
          visualDensity: const VisualDensity(
            horizontal: VisualDensity.minimumDensity,
            vertical: VisualDensity.minimumDensity,
          ),
          activeColor: AppColors.instance.primary,
          value: value,
          groupValue: groupValue,
          onChanged: onChanged,
        ),
        AppText(
          text,
          style: FontStyles.body,
        ),
      ],
    );
  }
}
