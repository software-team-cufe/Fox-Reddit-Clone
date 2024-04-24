import 'package:flutter/material.dart';

/// A custom container widget displaying main and sub text with an icon.
///
/// This widget renders a container with main text, subtext, and an accompanying icon.
class CustomContainer extends StatelessWidget {
  /// Constructs a [CustomContainer] widget.
  ///
  /// [mainText] is the main text displayed on the container.
  /// [subText] is the subtext displayed below the main text.
  const CustomContainer({
    super.key,
    required this.mainText,
    required this.subText,
  });

  final String mainText;
  final String subText;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 3.0),
      width: MediaQuery.of(context).size.width * 0.8,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey, width: 1.0),
        borderRadius: BorderRadius.circular(20.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
          )
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(11.0),
        child: Row(
          children: [
            Image.asset(
              "assets/Icons/channelIcon.png",
              height: 45,
            ),
            const SizedBox(width: 5),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  mainText,
                  style: const TextStyle(
                    fontWeight: FontWeight.w400,
                    fontSize: 20,
                  ),
                ),
                Text(subText),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
