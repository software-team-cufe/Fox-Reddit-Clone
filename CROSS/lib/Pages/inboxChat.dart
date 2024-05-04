import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/routes/Mock_routes.dart';

class inboxChat extends StatefulWidget {
  final String username;
  final String subject;

  const inboxChat({super.key, required this.username, required this.subject});

  @override
  State<inboxChat> createState() => _inboxChatState();
}

class _inboxChatState extends State<inboxChat> {
  late String access_token;
  late TextEditingController _messageController = TextEditingController();
  late List<dynamic> messages = [];
  late List<dynamic> senderUser = [];
  @override
  void initState() {
    super.initState();
    _messageController = TextEditingController();
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        access_token = sharedPrefValue.getString('backtoken')!;
      });
      fetchChat();
    });
  }

  Future<void> sendMessage() async {
    Map<String, dynamic> messageData = {
      "subject": widget.subject,
      "text": _messageController.text,
      "toUsername": widget.username,
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
      _messageController.clear();
    } else {
      print('Error submitting message: ${response.statusCode}');
    }
  }

  void fetchChat() async {
    final response = await http.get(
      Uri.parse(ApiRoutesBackend.getChat(widget.username, widget.subject)),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token'
      },
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      final data = jsonDecode(response.body);
      final List<dynamic> fetchedMessages = data['messages'] ?? [];

      setState(() {
        messages = fetchedMessages;
      });
      print(messages);

      print('chat fetched successfully ');
    } else {
      print(access_token);
      print('Failed to fetch user chat: ${response.statusCode}');
    }
  }

  Future<void> block() async {
    Map<String, dynamic> block = {
      'username': widget.username,
      'type': 'block',
    };
    final response = await http.post(
      Uri.parse(ApiRoutesBackend.block_unblock),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token'
      },
      body: jsonEncode(block),
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      print('blocked  correctly ${response.statusCode}');
    } else {
      print('Failed to  block ${response.statusCode}');
    }
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: Icon(
                        Icons.arrow_back_ios,
                        color: Colors.white,
                        size: 25,
                      ),
                    ),
                    Text(
                      widget.username,
                      style: TextStyle(fontSize: 25),
                    ),
                    TextButton(
                      onPressed: () {
                        block();
                      },
                      child: Icon(
                        Icons.flag,
                        color: Colors.red,
                        size: 25,
                      ),
                    ),
                  ],
                )
              ],
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 20, 8, 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Center(
                    child: Text(
                      widget.subject,
                      style: TextStyle(
                          color: Colors.white, decorationThickness: 15),
                    ),
                  )
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final message = messages[index];
                  final isCurrentUser =
                      message['fromID']['username'] == widget.username;

                  return Align(
                    alignment: (isCurrentUser)
                        ? Alignment.centerLeft
                        : Alignment.centerRight,
                    child: Container(
                      margin:
                          EdgeInsets.symmetric(vertical: 5.0, horizontal: 10.0),
                      padding: EdgeInsets.all(10.0),
                      decoration: BoxDecoration(
                        color: isCurrentUser
                            ? Colors.green[400]
                            : Colors.green[400],
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Text(
                        message['text'],
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  );
                },
              ),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 55,
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: "Type New message",
                      border: OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      suffix: Padding(
                        padding: const EdgeInsets.only(left: 5.0),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            TextButton(
                                onPressed: () {
                                  sendMessage();
                                  setState(() {
                                    fetchChat();
                                  });
                                },
                                child: Icon(
                                  Icons.send_rounded,
                                  color: Colors.white,
                                )),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
