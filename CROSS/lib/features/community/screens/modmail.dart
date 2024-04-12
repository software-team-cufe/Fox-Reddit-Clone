import 'package:flutter/material.dart';

class ModMailScreen extends StatelessWidget {
  const ModMailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mod Mail'),
      ),
      body: const Center(
        child: Text(
          'Mod Mail Content Goes Here',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
