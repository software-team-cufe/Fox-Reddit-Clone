import 'package:flutter/material.dart';
import 'package:reddit_fox/theme/pallete.dart';

/// A customizable button widget with various styling options.
class CustomButton extends StatelessWidget {
  /// Constructs a [CustomButton] widget.
  ///
  /// [text] is the text displayed on the button.
  /// [onTap] is the callback function invoked when the button is tapped.
  /// [borderd] specifies whether the button has a border.
  /// [backgroundColor] is the background color of the button.
  /// [textColor] is the color of the text on the button.
  /// [horizontalPadding] is the horizontal padding of the button.
  /// [verticalPadding] is the vertical padding of the button.
  /// [fontSize] is the font size of the text on the button.
  /// [borderWidth] is the width of the button border.
  /// [icon] is the optional icon displayed alongside the text.
  /// [filled] specifies whether the button is filled with color.
  /// [borderColor] is the color of the button border.
  /// [textStyle] is the style of the text on the button.
  /// [loading] specifies whether the button is in a loading state.
  /// [borderRadius] is the border radius of the button.
  const CustomButton({
    super.key,
    required this.text,
    this.borderd,
    this.backgroundColor,
    this.textColor = Colors.white,
    this.horizontalPadding,
    this.verticalPadding = 10,
    required this.onTap,
    this.fontSize,
    this.borderWidth,
    this.icon,
    this.filled,
    this.borderColor,
    this.textStyle,
    this.loading = false,
    this.borderRadius = 40,
  });

  final TextStyle? textStyle;
  final Widget? icon;
  final String text;
  final bool? borderd;
  final bool loading;
  final Color? backgroundColor;
  final Color? textColor;
  final Color? borderColor;
  final double? horizontalPadding;
  final double? verticalPadding;
  final VoidCallback onTap;
  final double? fontSize;
  final double? borderWidth;
  final double borderRadius;
  final bool? filled;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: loading ? null : onTap,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(borderRadius),
          color: filled != false ? backgroundColor ?? Pallete.redColor : null,
          border: borderd == true
              ? Border.all(
                  width: borderWidth ?? 0,
                )
              : null,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: horizontalPadding ?? 16,
          vertical: verticalPadding ?? 20,
        ),
        child: Center(
          child: loading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Text(
                        text,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: textStyle,
                      ),
                    ),
                    if (icon != null)
                      Row(
                        children: [
                          icon!,
                        ],
                      ),
                  ],
                ),
        ),
      ),
    );
  }
}

class RegularText extends StatelessWidget {
  RegularText({super.key, required this.text, this.fontsize = 20});
  final String text;
  double fontsize;
  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(fontWeight: FontWeight.w600, fontSize: fontsize),
    );
  }
}

class Textbuttoncontainer extends StatelessWidget {
  const Textbuttoncontainer({
    super.key,
    required this.text,
    required this.onPressed,
    required this.color,
  });
  final String? text;
  final Color color;

  // final Function(List<String>) onSelectionChange;
  final VoidCallback onPressed;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        height: 40,
        width: 70,
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
          color: color,
        ),
        child: Center(
          child: RegularText(
            text: text!,
            fontsize: 15,
          ),
        ),
      ),
    );
  }
}
