import 'package:flutter/material.dart';


class SwitchWidget extends StatefulWidget {
  final bool value;

  const SwitchWidget({required this.value, Key? key}) : super(key: key);

  @override
  _SwitchWidgetState createState() => _SwitchWidgetState();
}

class _SwitchWidgetState extends State<SwitchWidget> {
  late bool _switchValue;

  @override
  void initState() {
    super.initState();
    _switchValue = widget.value;
  }

  @override
  Widget build(BuildContext context) {
    return Switch(
      value: _switchValue,
      onChanged: (newValue) {
        setState(() {
          _switchValue = newValue;
        });
      },
    );
  }
}
