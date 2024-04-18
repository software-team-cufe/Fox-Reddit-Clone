import 'package:flutter/material.dart';

class SwitchPostWidget extends StatefulWidget {
  const SwitchPostWidget({Key? key}) : super(key: key);

  @override
  _SwitchPostWidgetState createState() => _SwitchPostWidgetState();
}

class _SwitchPostWidgetState extends State<SwitchPostWidget> {
  bool _switchValue = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Switch(
          value: _switchValue,
          onChanged: (value) {
            setState(() {
              _switchValue = value;
            });
            print(_switchValue); // For debugging, you can print the value
          },
          activeTrackColor: Colors.lightGreenAccent,
          activeColor: Colors.green,
        ),
        Text(_switchValue
            .toString()), // For debugging, you can display the value
      ],
    );
  }
}
