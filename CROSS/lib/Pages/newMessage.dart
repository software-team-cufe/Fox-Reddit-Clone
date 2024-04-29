import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:reddit_fox/Pages/messages.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:reddit_fox/Pages/messages.dart';

class NewMessage extends StatefulWidget {
  const NewMessage({Key? key}) : super(key: key);

  @override
  State<NewMessage> createState() => _NewMessageState();
}

class _NewMessageState extends State<NewMessage> {
  late TextEditingController _usernameController = TextEditingController();
  late TextEditingController _subjectController = TextEditingController();
  late TextEditingController _messageController = TextEditingController();
  late String access_token;
  @override
  void initState() {
    super.initState();
    _usernameController = TextEditingController();
    _subjectController = TextEditingController();
    _messageController = TextEditingController();

    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken')!;
      });
    });
  }

  Future<void> sendMessage() async {
    Map<String, dynamic> messageData = {
      "subject": _subjectController.text,
      "text": _messageController.text,
      "toUsername": _usernameController.text,
    };

    final response = await http.post(
      Uri.parse(ApiRoutesBackend.sendinbox),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token'
      },
      body: jsonEncode(messageData),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      print('message submitted successfully');
      print('access_token ' + access_token);
    } else {
      print('Error submitting message: ${response.statusCode}');
      print('access_token ' + access_token);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('New Message'),
          actions: [
            IconButton(
              icon: const Icon(Icons.send),
              onPressed: () {
                sendMessage();
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Message()),
                );
              },
            ),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: [
              _buildTextInputWidget('Reciver Username', _usernameController),
              // Add some space between input fields
              _buildTextInputWidget('Subject', _subjectController),
              // Add some space between input fields
              _buildTextInputWidget('Message', _messageController),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextInputWidget(
      String hintText, TextEditingController controller) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        border: UnderlineInputBorder(
          // Set the border to bottom only
          borderSide:
              BorderSide(color: Colors.grey), // Customize the color if needed
        ),
        // Add a background color for better visibility
        contentPadding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0),
      ),
    );
  }
}
