import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/AppText.dart';
import 'package:reddit_fox/Shared/SharedTextStyles.dart';

import '../Shared/AppColors.dart';

class CustomDropDown extends StatelessWidget {
  const CustomDropDown({
    super.key,
    required this.items,
    this.selectedValue,
    required this.onSaved,
    required this.hint,
  });

  final List<String> items;

  final String? selectedValue;
  final String hint;
  final void Function(String?) onSaved;
  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField2<String>(
      isExpanded: true,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(vertical: 16),
        border: AppColors.instance.borderObj,
      ),
      hint: AppText(
        hint,
        style: FontStyles.body,
      ),
      items: items
          .map(
            (item) => DropdownMenuItem<String>(
              value: item,
              child: AppText(
                item,
                style: FontStyles.p,
              ),
            ),
          )
          .toList(),
      validator: (value) {
        if (value == null) {
          return 'Please select gender.';
        }
        return null;
      },
      onChanged: onSaved,
      onSaved: onSaved,
      buttonStyleData: const ButtonStyleData(
        padding: EdgeInsets.only(right: 8),
      ),
      iconStyleData: const IconStyleData(
        icon: Icon(
          Icons.arrow_drop_down,
          color: Colors.black45,
        ),
        iconSize: 24,
      ),
      dropdownStyleData: DropdownStyleData(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          border: Border.fromBorderSide(
            AppColors.instance.borderObj.borderSide,
          ),
        ),
      ),
      menuItemStyleData: const MenuItemStyleData(
        padding: EdgeInsets.symmetric(horizontal: 16),
      ),
    );
  }
}
