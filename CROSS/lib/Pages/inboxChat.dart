import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/routes/Mock_routes.dart';

class inboxChat extends StatefulWidget {
  final String username;
  const inboxChat({super.key, required this.username});

  @override
  State<inboxChat> createState() => _inboxChatState();
}

class _inboxChatState extends State<inboxChat> {
  late String access_token;
  @override
  void initState() {
    super.initState();

    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        access_token = sharedPrefValue.getString('backtoken')!;
      });
      fetchChat();
    });
  }

  void fetchChat() async {
    final response = await http.get(
      Uri.parse(ApiRoutesBackend.getChat),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token'
      },
      
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      final data = jsonDecode(response.body);

      print('chat fetched successfully ');
    } else {
      print(access_token);
      print('Failed to fetch user chat: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.username),
      ),
    );
  }
}
