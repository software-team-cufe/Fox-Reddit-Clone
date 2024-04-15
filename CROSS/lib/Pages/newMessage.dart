import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:reddit_fox/Pages/messages.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:reddit_fox/Pages/messages.dart';

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

  bool showURLInput = false;

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

    try {
      // Fetch user data
      final response = await http.get(
        Uri.parse(ApiRoutesMockserver.login),
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
          final String senderId = sender['userName'].toString();
          // Construct message data
          final Map<String, String> messageData = {
            'sender': senderId,
            'recipient': senderUsername,
            'subject': subject,
            'content': message,
            'url': url,
          };

          // Send message
          final messageResponse = await http.post(
            Uri.parse(ApiRoutesMockserver.message),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode(messageData),
          );

          if (messageResponse.statusCode == 200) {
            // Message sent successfully
            print('Message sent successfully');
            // Navigate to the next screen
          } else {
            // Failed to send message
            print('Failed to send message: ${messageResponse.statusCode}');
            // You can show an error message or handle the error accordingly
          }
        } else {
          // Sender not found
          print('Sender not found');
        }
      } else {
        // Failed to fetch user data
        print('Failed to fetch user data: ${response.statusCode}');
      }
    } catch (error) {
      // Handle any other errors that occur during the process
      print('Error: $error');
    }
  }
}
