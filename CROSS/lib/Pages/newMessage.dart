import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/messages.dart';
import 'dart:convert';
import 'package:reddit_fox/routes/Mock_routes.dart';

class NewMessage extends StatefulWidget {
  const NewMessage({Key? key}) : super(key: key);

  @override
  State<NewMessage> createState() => _NewMessageState();
}

class _NewMessageState extends State<NewMessage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _subjectController = TextEditingController();
  final TextEditingController _messageController = TextEditingController();
  final TextEditingController _urlController = TextEditingController();

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
                _sendMessage();
              },
            ),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: [
              _buildTextInputWidget('Sender Username', _usernameController),
              SizedBox(height: 20), // Add some space between input fields
              _buildTextInputWidget('Subject', _subjectController),
              SizedBox(height: 20), // Add some space between input fields
              _buildTextInputWidget('Message', _messageController),
              SizedBox(height: 20), // Add some space between input fields
              _buildTextInputWidget('URL (Optional)', _urlController),
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
        border: OutlineInputBorder(),
      ),
    );
  }

  Future<void> _sendMessage() async {
    final String senderUsername = _usernameController.text;
    final String subject = _subjectController.text;
    final String message = _messageController.text;
    final String url = _urlController.text;

    final response = await http.get(
      Uri.parse(ApiRoutes.login), // Endpoint to fetch user data
    );

    if (response.statusCode == 200) {
      final List<dynamic> users = jsonDecode(response.body);

      // Find the sender in the list of users
      final sender = users.firstWhere(
        (user) => user['userName'] == senderUsername,
        orElse: () => null,
      );

      if (sender != null) {
        // Extract sender's data
        final String senderId = sender['id'];
        // Construct message data
        final Map<String, String> messageData = {
          'sender': senderId,
          'recipient': senderUsername,
          'subject': subject,
          'content': message,
          'url': url,
        };

        final response = await http.post(
          Uri.parse(
              ApiRoutes.message), // Replace with your backend endpoint URL
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(messageData),
        );

        if (response.statusCode == 200) {
          // Message sent successfully
          print('Message sent successfully');
          // Navigate to the next screen
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Message()),
          );
        } else {
          // Failed to send message
          // You can show an error message or handle the error accordingly
          print('Failed to send message');
        }
      } else {
        // Sender not found
        // Handle the case where the sender is not found in the users list
        print('Sender not found');
      }
    } else {
      // Failed to fetch user data
      // Handle the error accordingly
      print('Failed to fetch user data');
    }
  }
}
