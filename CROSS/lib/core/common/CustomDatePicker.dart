import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:reddit_fox/theme/pallete.dart';

/// A custom date picker widget.
///
/// This widget displays a ListTile containing a date picker.
/// Users can tap on the ListTile to select a date from a date picker dialog.
class CustomDatePicker extends StatelessWidget {
  /// Constructs a [CustomDatePicker] widget.
  ///
  /// [currentDate] is the initial selected date.
  /// [icon] is the icon displayed on the ListTile leading position.
  /// [onChanged] is the callback function invoked when the selected date changes.
  /// [subTitle] is the text displayed below the date.
  /// [firstDate] is the earliest selectable date.
  /// [lastDate] is the latest selectable date.
  const CustomDatePicker({
    super.key,
    required this.currentDate,
    required this.icon,
    required this.onChanged,
    required this.subTitle,
    this.firstDate,
    this.lastDate,
  });

  final String subTitle;
  final Function(DateTime) onChanged;
  final DateTime currentDate;
  final DateTime? firstDate;
  final DateTime? lastDate;
  final IconData icon;

  /// Displays a date picker dialog to change the selected date.
  ///
  /// This method shows a date picker dialog allowing the user to select a new date.
  /// The selected date is passed to the [onChanged] callback function.
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
          borderRadius: BorderRadius.circular(10),
          side: const BorderSide(),
        ),
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
      ),
    );
  }
}
