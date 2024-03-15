import 'package:flutter/material.dart';

import '../Shared/Fonts/FontModel.dart';
import 'AppText.dart';

class PaginationWidget extends StatelessWidget {
  const PaginationWidget({
    super.key,
    required this.count,
    required this.onTap,
    required this.page,
  });
  final int count;
  final Function(int) onTap;
  final int page;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            count,
            (index) {
              bool selected = page == (index);
              return Padding(
                padding: const EdgeInsets.only(
                  left: 10,
                ),
                child: GestureDetector(
                  onTap: () => onTap(index),
                  child: CircleAvatar(
                    backgroundColor: selected ? Colors.blue : Colors.white,
                    child: AppText(
                      (index + 1).toString(),
                      style: TextStyle(
                        fontFamily: FontFamily.black,
                        color: selected ? Colors.white : Colors.black,
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
