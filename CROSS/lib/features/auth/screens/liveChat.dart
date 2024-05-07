import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:custom_refresh_indicator/custom_refresh_indicator.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/material.dart';

class liveChat extends StatefulWidget {
  final String userName;
  final int karma;
  final String profilePic;
  const liveChat({
    Key? key,
    required this.userName,
    required this.karma,
    required this.profilePic,
  }) : super(key: key);
  @override
  State<liveChat> createState() => _liveChatState();
}

class _liveChatState extends State<liveChat> {
  String? accessToken;
  late Widget leadingWidget;
  late TextEditingController _messageController = TextEditingController();
  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        accessToken = sharedPrefValue.getString('backtoken');
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text(widget.userName),
          centerTitle: true,
        ),
        body: Column(
          children: [
            Expanded(
              child: Column(
                children: [
                  if (widget.profilePic != 'default.jpg') ...{
                    Padding(
                      padding: EdgeInsets.all(20),
                      child: CircleAvatar(
                        backgroundImage: NetworkImage(widget.profilePic),
                        radius: 50,
                      ),
                    ),
                  } else ...{
                    Padding(
                      padding: EdgeInsets.all(20),
                      child: CircleAvatar(
                        backgroundImage: AssetImage('assets/images/avatar.png'),
                        radius: 50,
                      ),
                    ),
                  },
                  Text(
                    'U/ ${widget.userName}',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Karma: ${widget.karma}',
                    style: TextStyle(
                      fontSize: 16,
                    ),
                  ),
                ],
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
                                onPressed: () {},
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

//       body: Column(
//         children: [
//           Expanded(
//             child: Stack(
//               children: [
//                 // Chat messages
//                 CustomMaterialIndicator(
//                   onRefresh: () async {
//                     loadPreviousMessages();
//                   },
//                   indicatorBuilder: (context, controller) {
//                     return Image.asset('assets/logo_2d.png', width: 30);
//                   },
//                   child: ListView.builder(
//                     itemCount:
//                         messages.length + 1, // Add 1 for the avatar message
//                     itemBuilder: (context, index) {
//                       if (index == 0) {
//                         /// Display avatar message for the receiver
//                         return Container(
//                           margin: const EdgeInsets.symmetric(vertical: 10.0),
//                           alignment: Alignment.center,
//                           child: Column(
//                             mainAxisAlignment: MainAxisAlignment.center,
//                             children: [
//                               CircleAvatar(
//                                 child: Image.asset('assets/avatar_logo.jpeg'),
//                                 radius: 30.0,
//                               ),
//                               const SizedBox(height: 10.0),
//                               Text(
//                                 'u/${widget.receiver}',
//                                 style: const TextStyle(
//                                     fontSize: 16.0,
//                                     fontWeight: FontWeight.bold),
//                               ),
//                             ],
//                           ),
//                         );
//                       } else {
//                         /// Display normal chat message
//                         final messageIndex = index - 1;
//                         final bool isSender =
//                             messages[messageIndex]['sender'] == widget.sender;
//                         return ChatTile(
//                           person: messages[messageIndex]['sender'],
//                           content: messages[messageIndex]['message'],
//                           profilePicture: 'assets/avatar_logo.jpeg',
//                           isSender: isSender,
//                         );
//                       }
//                     },
//                   ),
//                 ),
//               ],
//             ),
//           ),
//           Padding(
//             padding: const EdgeInsets.all(8.0),
//             child: Row(
//               children: [
//                 Expanded(
//                   child: TextField(
//                     controller: _controller,
//                     decoration: InputDecoration(
//                       hintText: 'Type a message...',
//                       suffixIcon: IconButton(
//                         onPressed: () {
//                           String value = _controller.text;
//                           if (value.isNotEmpty) {
//                             sendMessage(value, widget.receiver);
//                             _controller.clear();
//                           }
//                         },
//                         icon: const Icon(Icons.send),
//                       ),
//                     ),
//                     onSubmitted: (value) {
//                       sendMessage(value, widget.receiver);
//                       setState(() {
//                         if (value.isNotEmpty) {
//                           _controller.clear();
//                         }
//                       });
//                     },
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
