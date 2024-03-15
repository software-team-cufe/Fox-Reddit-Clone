import 'package:flutter/material.dart';

class CustomPageIndicator extends StatelessWidget {
  const CustomPageIndicator({
    super.key,
    required this.itemCount,
    required this.currentIndex,
    required this.dimentions,
    required this.selectedColor,
    required this.unSelectedColor,
  });
  final Color selectedColor;
  final Color unSelectedColor;

  final int itemCount;
  final int currentIndex;
  final double dimentions;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        itemCount,
        (index) => Container(
          margin: EdgeInsets.only(
            right: index == itemCount - 1 ? 0 : 10,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(200),
            color: index == currentIndex ? selectedColor : unSelectedColor,
          ),
          width: dimentions,
          height: dimentions,
        ),
      ),
    );
  }
}
