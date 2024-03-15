import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/Shared/AppColors.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';
import 'AppText.dart';
import 'CustomContainer.dart';

class SubUserDescription extends StatelessWidget {
  const SubUserDescription({
    super.key,
    required this.icon,
    required this.data,
    this.backColor,
    this.textColor,
    this.fontSize,
    this.letterSpacing,
  });
  final IconData? icon;
  final String data;
  final Color? backColor;
  final Color? textColor;
  final double? fontSize;
  final double? letterSpacing;
  @override
  Widget build(BuildContext context) {
    return CustomContainer(
      backColor: backColor ?? AppColors.instance.secondarySelect,
      bordered: false,
      verticalPadding: 5,
      horizontalPadding: 7,
      borderRadius: 5,
      borderColor: null,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (icon != null) ...[
            Icon(
              icon,
              size: fontSize != null ? fontSize! * 1.5 : 18,
              color: textColor,
            ),
            const Gap(5),
          ],
          Flexible(
            child: AppText(
              data,
              style: FontStyles.small.copyWith(
                color: textColor,
                fontSize: fontSize,
                letterSpacing: letterSpacing,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
