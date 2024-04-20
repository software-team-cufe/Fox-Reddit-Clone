import 'package:flutter/material.dart';

class BottomSheetMenu extends StatelessWidget {
  final Function(String) onOptionSelected;

  const BottomSheetMenu({
    super.key,
    required this.onOptionSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ListTile(
          leading: const Icon(Icons.bookmark),
          title: const Text('Save'),
          onTap: () {
            onOptionSelected('save');
            Navigator.pop(context); // Close the menu
          },
        ),
        ListTile(
          leading: const Icon(Icons.content_copy),
          title: const Text('Copy text'),
          onTap: () {
            onOptionSelected('copy');
            Navigator.pop(context); // Close the menu
          },
        ),
        ListTile(
          leading: const Icon(Icons.call_split),
          title: const Text('Crosspost to community'),
          onTap: () {
            onOptionSelected('crosspost');
            Navigator.pop(context); // Close the menu
          },
        ),
        ListTile(
          leading: const Icon(Icons.flag),
          title: const Text('Report'),
          onTap: () {
            onOptionSelected('report');
            Navigator.pop(context); // Close the menu
          },
        ),
        ListTile(
          leading: const Icon(Icons.person_off),
          title: const Text('Block account'),
          onTap: () {
            onOptionSelected('block');
            Navigator.pop(context); // Close the menu
          },
        ),
        ListTile(
          leading: const Icon(Icons.visibility_off),
          title: const Text('Hide'),
          onTap: () {
            onOptionSelected('hide');
            Navigator.pop(context); // Close the menu
          },
        ),
      ],
    );
  }
}
