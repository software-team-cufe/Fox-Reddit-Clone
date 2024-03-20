import 'package:flutter/material.dart';
import 'package:reddit_fox/theme/pallete.dart';

class CustomButton extends StatelessWidget {
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
