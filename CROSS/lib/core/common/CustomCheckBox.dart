import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/theme/pallete.dart';

/// A custom checkbox widget.
///
/// This widget displays a checkbox with accompanying text.
/// Users can tap on the checkbox to toggle its state.
class CustomCheckBox extends StatelessWidget {
  /// Constructs a [CustomCheckBox] widget.
  ///
  /// [value] represents the current state of the checkbox.
  /// [text] is the text displayed alongside the checkbox.
  /// [onChange] is the callback function invoked when the checkbox state changes.
  /// [checkColor] is the color of the check icon.
  const CustomCheckBox({
    super.key,
    required this.value,
    required this.text,
    required this.onChange,
    this.checkColor = Colors.white,
  });

  final bool value;
  final String text;
  final Function(bool) onChange;
  final Color checkColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onChange(!value),
      child: Row(
        children: [
          Container(
            width: 24,
            height: 24,
            decoration: BoxDecoration(
              color: Pallete.redColor,
              borderRadius: BorderRadius.circular(6),
            ),
            child: value
                ? Icon(
                    Icons.check,
                    size: 17,
                    color: checkColor,
                  )
                : null,
          ),
          const Gap(7),
          Text(
            text,
          ),
        ],
      ),
    );
  }
}
