import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/GeneralWidgets/AppText.dart';
import 'package:reddit_fox/Shared/AppColors.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';

class CustomProgressBar extends StatelessWidget {
  const CustomProgressBar({
    super.key,
    required this.percentage,
    this.height,
    this.title,
    this.showPrecentage = false,
    this.textColor,
    this.spaceColor,
    this.progressColor,
  });

  final double percentage;
  final double? height;
  final String? title;
  final Color? textColor;
  final Color? spaceColor;
  final Color? progressColor;
  final bool showPrecentage;
  @override
  Widget build(BuildContext context) {
    double defaultHeight = 6;
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            if (title != null)
              AppText(
                title!,
                style: FontStyles.listTitle
                    .copyWith(fontSize: 15, color: textColor),
              ),
            if (showPrecentage)
              AppText(
                "${percentage.toStringAsFixed(2)}%",
                style: FontStyles.listTitle
                    .copyWith(fontSize: 15, color: textColor),
              ),
          ],
        ),
        if (title != null || showPrecentage) const Gap(5),
        Stack(
          children: [
            Container(
              height: height ?? defaultHeight,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(200),
                color: spaceColor ?? AppColors.instance.secondary,
              ),
            ),
            Row(
              children: [
                Expanded(
                  flex: (percentage * 100).toInt(),
                  child: Container(
                    height: height ?? defaultHeight,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(200),
                      color: progressColor ?? AppColors.instance.text,
                    ),
                  ),
                ),
                Expanded(
                  flex: ((1 - percentage) * 100).toInt(),
                  child: const SizedBox(),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
