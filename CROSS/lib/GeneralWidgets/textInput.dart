import 'package:flutter/material.dart';

class MyTextInputWidget extends StatefulWidget {
  final String inputTitle;
  final double sheight;
  final ValueChanged<String>? onChanged;

  MyTextInputWidget({
    Key? key,
    required this.inputTitle,
    this.sheight = 0.0,
    this.onChanged,
  }) : super(key: key);

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
            onChanged: widget.onChanged,
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

  bool hasData() {
    return _textEditingController.text.isNotEmpty;
  }

  @override
  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }
}
