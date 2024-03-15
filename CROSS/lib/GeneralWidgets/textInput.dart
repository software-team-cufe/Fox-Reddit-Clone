import 'package:flutter/material.dart';

class MyTextInputWidget extends StatefulWidget {
  final String inputTitle;
  final sheight;
  MyTextInputWidget({
    super.key,
    required this.inputTitle,
    this.sheight = 0.0,
  });

  @override
  _MyTextInputWidgetState createState() => _MyTextInputWidgetState();
}

class _MyTextInputWidgetState extends State<MyTextInputWidget> {
  TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: widget.sheight,
          child: TextField(
            controller: _textEditingController,
            decoration: InputDecoration(
              border: InputBorder.none,
              labelText: widget.inputTitle,
            ),
          ),
        ),
        SizedBox(height: 16.0),
      ],
    );
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed
    _textEditingController.dispose();
    super.dispose();
  }
}
