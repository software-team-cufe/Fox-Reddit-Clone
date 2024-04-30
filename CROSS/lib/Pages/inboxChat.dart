import 'package:flutter/material.dart';

class inboxChat extends StatefulWidget {
  final String username;
  const inboxChat({super.key, required this.username});

  @override
  State<inboxChat> createState() => _inboxChatState();
}

class _inboxChatState extends State<inboxChat> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.username),
      ),
    );
  }
}
