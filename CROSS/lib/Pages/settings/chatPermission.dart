import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';

class permissionChat extends StatefulWidget {
  const permissionChat({super.key});

  @override
  State<permissionChat> createState() => _permissionChatState();
}

class _permissionChatState extends State<permissionChat> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            "Chat and messaging permissions",
            style: TextStyle(fontSize: 20),
          ),
        ),
        body: const Column(
          children: [
            Text('Manage who has the permission to send you chat'),
            Padding(
              padding: EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Chat Requsets',
                    style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
                  ),
                  DropdownWidget(items: [
                    'Everyone',
                    'Account older than 30 days',
                    'Nobody'
                  ])
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Direct Messages',
                    style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
                  ),
                  DropdownWidget(items: [
                    'Everyone',
                    'Nobody(Does not apply to moderators )'
                  ])
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
