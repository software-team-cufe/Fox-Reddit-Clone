import 'package:flutter/material.dart';

class WelcomeMessageEditScreen extends StatefulWidget {
  const WelcomeMessageEditScreen({super.key});

  @override
  _WelcomeMessageEditScreenState createState() =>
      _WelcomeMessageEditScreenState();
}

class _WelcomeMessageEditScreenState extends State<WelcomeMessageEditScreen> {
  bool sendWelcomeMessage = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Welcome Message'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                const Text(
                  'Send Welcome message to new members',
                  style: TextStyle(fontSize: 16),
                ),
                const Spacer(),
                Switch(
                  value: sendWelcomeMessage,
                  onChanged: (value) {
                    setState(() {
                      sendWelcomeMessage = value;
                    });
                  },
                ),
              ],
            ),
          ),
          // Add other widgets for editing the welcome message here
        ],
      ),
    );
  }
}
