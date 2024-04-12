import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';

class CommunityIconScreen extends StatefulWidget {
  const CommunityIconScreen({Key? key}) : super(key: key);

  @override
  _CommunityIconScreenState createState() => _CommunityIconScreenState();
}

class _CommunityIconScreenState extends State<CommunityIconScreen> {
  Color _selectedColor = Colors.blue; // Default color

  void _openColorPicker() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Select a Color'),
          content: SingleChildScrollView(
            child: ColorPicker(
              pickerColor: _selectedColor,
              onColorChanged: (color) {
                setState(() => _selectedColor = color);
              },
              showLabel: true,
              pickerAreaHeightPercent: 0.8,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community Icon'),
        actions: [
          TextButton(
            onPressed: () {
              // Add your save logic here
              // For example, you can save the selected color to a variable or database
              // and then navigate back or perform any other action.
            },
            child: Text(
              'Save',
              style: TextStyle(
                fontSize: 16,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Select a color for your community icon:',
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 20),
            GestureDetector(
              onTap: _openColorPicker,
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: _selectedColor,
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Text(
                    'Tap to\nSelect',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16, color: Colors.white),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
