import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/GeneralWidgets/switchpost.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class EmailsSetting extends StatefulWidget {
  const EmailsSetting({Key? key}) : super(key: key);

  @override
  State<EmailsSetting> createState() => _EmailsSettingState();
}

class _EmailsSettingState extends State<EmailsSetting> {
  Map<String, dynamic>? userPrefs;
  Map<String, dynamic>? prefData;
  String? accessToken;
  late bool threadedMessages;
  late bool emailCommentReply;
  late bool emailUpvoteComment;
  late bool emailMessages;
  late bool emailUnsubscribeAll;
  late bool emailUpvotePost;
  late bool emailUsernameMention;
  late bool emailUserNewFollower;
  late bool emailPostReply;
  late bool emailPrivateMessage;
  late bool enableFollowers;
  @override
  void initState() {
    super.initState();

    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        accessToken = sharedPrefValue.getString('backtoken')!;
        fetchData();
        emailPrivateMessage = true;
        threadedMessages = true;
        emailCommentReply = true;
        emailUpvoteComment = true;
        emailMessages = true;
        emailUnsubscribeAll = true;
        emailUpvotePost = true;
        emailUsernameMention = true;
        emailUserNewFollower = true;
        emailPostReply = true;
        emailPrivateMessage = true;
        enableFollowers = true;
      });
    });
  }

  Future<void> fetchData() async {
    final response = await http.get(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/prefs'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken'
      },
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      setState(() {
        userPrefs = json.decode(response.body)['userPrefs'];
      });
      print(userPrefs);
    } else {
      throw Exception('Failed to load user preferences ${response.statusCode}');
    }
  }

  Future<void> userPref(
    bool threadedMessages,
    bool emailCommentReply,
    bool emailUpvoteComment,
    bool emailMessages,
    bool emailUnsubscribeAll,
    bool emailUpvotePost,
    bool emailUsernameMention,
    bool emailUserNewFollower,
    bool emailPostReply,
    bool emailPrivateMessage,
    bool enableFollowers,
  ) async {
    Map<String, dynamic> prefData = {
      "emailPrivateMessage": emailPrivateMessage,
      "countryCode": "EG",
      "emailCommentReply": emailCommentReply,
      "emailUpvoteComment": emailUpvoteComment,
      "emailMessages": emailMessages,
      "emailUnsubscribeAll": emailUnsubscribeAll,
      "emailUpvote": emailUpvotePost,
      "emailUsernameMention": emailUsernameMention,
      "emailUserNewFollower": emailUserNewFollower,
      "emailPostReply": emailPostReply,
      "enableFollowers": enableFollowers,
      "threadedMessages": threadedMessages,
    };

    final response = await http.patch(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/prefs'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken'
      },
      body: jsonEncode(prefData),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      print('Preferences updated successfully');
      // Optionally update local state if needed
    } else {
      print('Error updating preferences: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Emails'),
        ),
        body: Column(
          children: [
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Messages'),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.email_outlined),
                          Text('Private messages'),
                          Switch(
                            value: emailPrivateMessage,
                            onChanged: (value) {
                              setState(() {
                                emailPrivateMessage = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.chat_outlined),
                          Text('Chat requests'),
                          Switch(
                            value: emailMessages,
                            onChanged: (value) {
                              setState(() {
                                emailMessages = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Activity'),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.email_rounded),
                          Text('New user welcome'),
                          Switch(
                            value: true,
                            onChanged: (Value) {},
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.chat_bubble),
                          Text('Comments on your posts'),
                          Switch(
                            value: emailPostReply,
                            onChanged: (value) {
                              setState(() {
                                emailPostReply = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.subdirectory_arrow_left_sharp),
                          Text('Replies to your comments'),
                          Switch(
                            value: emailCommentReply,
                            onChanged: (value) {
                              setState(() {
                                emailCommentReply = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.keyboard_double_arrow_up_rounded),
                          Text('Upvotes on your post'),
                          Switch(
                            value: emailUpvotePost,
                            onChanged: (value) {
                              setState(() {
                                emailUpvotePost = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.keyboard_double_arrow_up_rounded),
                          Text('Upvotes on your comments'),
                          Switch(
                            value: emailUpvoteComment,
                            onChanged: (value) {
                              setState(() {
                                emailUpvoteComment = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.manage_accounts),
                          Text('User name mentions'),
                          Switch(
                            value: emailUsernameMention,
                            onChanged: (value) {
                              setState(() {
                                emailUsernameMention = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(Icons.fiber_new_rounded),
                          Text('new followers'),
                          Switch(
                            value: emailUserNewFollower,
                            onChanged: (value) {
                              setState(() {
                                emailUserNewFollower = value;
                              });
                              userPref(
                                threadedMessages,
                                emailCommentReply,
                                emailUpvoteComment,
                                emailMessages,
                                emailUnsubscribeAll,
                                emailUpvotePost,
                                emailUsernameMention,
                                emailUserNewFollower,
                                emailPostReply,
                                emailPrivateMessage,
                                enableFollowers,
                              );
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('New Sletters'),
                      Padding(
                        padding: EdgeInsets.all(10.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.fireplace_outlined),
                            Text('Daily Digest'),
                            Switch(
                              value: true,
                              onChanged: (Value) {},
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_outlined),
                            Text('Unsubscribe From all emails'),
                            Switch(
                              value: emailUnsubscribeAll,
                              onChanged: (value) {
                                setState(() {
                                  emailUnsubscribeAll = value;
                                });
                                userPref(
                                  threadedMessages,
                                  emailCommentReply,
                                  emailUpvoteComment,
                                  emailMessages,
                                  emailUnsubscribeAll,
                                  emailUpvotePost,
                                  emailUsernameMention,
                                  emailUserNewFollower,
                                  emailPostReply,
                                  emailPrivateMessage,
                                  enableFollowers,
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
