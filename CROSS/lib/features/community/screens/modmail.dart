import 'package:flutter/material.dart';

class ModMailScreen extends StatelessWidget {
  const ModMailScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mod Mail'),
      ),
      body: Center(
        child: Text(
          'Mod Mail Content Goes Here',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
