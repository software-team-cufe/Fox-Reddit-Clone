import 'package:flutter/material.dart';

/// A screen for displaying moderator logs.
class ModLogScreen extends StatelessWidget {
  /// Constructor for the ModLogScreen.
  const ModLogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mod Log'),
      ),
      body: const Center(
        child: Text(
          'Mod Log Content Goes Here',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
