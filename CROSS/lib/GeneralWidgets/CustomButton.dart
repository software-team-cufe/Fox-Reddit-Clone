import 'package:flutter/material.dart';
import 'package:reddit_fox/Helper/Helper.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';
import '../Shared/AppColors.dart';

import 'AppText.dart';

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
    this.borderRadius = 10,
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
          color: filled != false
              ? backgroundColor ?? AppColors.instance.primary
              : null,
          border: borderd == true
              ? Border.all(
                  width: borderWidth ?? 0,
                  color: borderColor ?? AppColors.instance.primary,
                )
              : null,
        ),
        padding: EdgeInsets.symmetric(
          horizontal: horizontalPadding ?? 16,
          vertical: verticalPadding ?? 20,
        ),
        child: Center(
          child: loading
              ? Helper.loadingWidget(20)
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: AppText(
                        text,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: textStyle ??
                            FontStyles.listTitle.copyWith(
                              color: textColor ?? AppColors.instance.text,
                              fontSize: fontSize ?? 16,
                            ),
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
