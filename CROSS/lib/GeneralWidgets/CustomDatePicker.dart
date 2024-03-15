import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import '../Shared/AppColors.dart';
import 'AppText.dart';

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
    return ListTile(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: BorderSide(
            color: AppColors.instance.borderText,
          )),
      leading: Icon(
        icon,
        size: 22,
      ),
      onTap: _changeUserBirthDate,
      title: AppText(
        DateFormat('yyyy-MM-dd').format(currentDate).toString(),
      ),
      subtitle: AppText(
        subTitle,
      ),
      //tileColor: AppColors.instance.borderText,
    );
  }
}
