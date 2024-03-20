import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:reddit_fox/theme/pallete.dart';

class CustomDatePicker extends StatelessWidget {
  const CustomDatePicker({
    super.key,
    required this.currentDate,
    required this.icon,
    required this.onChanged,
    this.firstDate,
    this.lastDate,
    required this.subTitle,
  });
  final String subTitle;
  final Function(DateTime) onChanged;
  final DateTime currentDate;
  final DateTime? firstDate;
  final DateTime? lastDate;
  final IconData icon;
  void _changeUserBirthDate() async {
    DateTime? date = await showDatePicker(
      context: Get.context!,
      initialDate: currentDate,
      firstDate: firstDate ?? DateTime(1900),
      lastDate: lastDate ?? DateTime.now(),
    );
    if (date != null) {
      onChanged(date);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Get.isDarkMode ? Pallete.drawerColor : null,
        borderRadius: BorderRadius.circular(20),
      ),
      child: ListTile(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10), side: const BorderSide()),
        contentPadding: const EdgeInsets.symmetric(
          vertical: 0,
          horizontal: 15,
        ),

        leading: Icon(
          icon,
          size: 22,
        ),

        onTap: _changeUserBirthDate,
        title: Text(
          DateFormat('yyyy-MM-dd').format(currentDate).toString(),
        ),
        subtitle: Text(
          subTitle,
        ),
        //tileColor: AppColors.instance.borderText,
      ),
    );
  }
}
