import 'package:flutter/material.dart';

class CustomContainer extends StatelessWidget {
  const CustomContainer(
      {super.key, required this.mainText, required this.subText});
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
              children: [
                Text(
                  mainText,
                  style: const TextStyle(
                      fontWeight: FontWeight.w400, fontSize: 20),
                ),
                Text(subText)
              ],
            ),
          ],
        ),
      ),
    );
  }
}
