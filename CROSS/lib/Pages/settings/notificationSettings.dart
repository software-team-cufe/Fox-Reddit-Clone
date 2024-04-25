import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/switch.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class NotificationSettting extends StatefulWidget {
  const NotificationSettting({super.key});

  @override
  State<NotificationSettting> createState() => _NotificationSetttingState();
}

class _NotificationSetttingState extends State<NotificationSettting> {
  Map<String, dynamic>? userPrefs;
  String? accessToken;
  @override
  void initState() {
    super.initState();

    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        accessToken = sharedPrefValue.getString('backtoken')!;
        fetchData();
      });
    });
  }

  Future<void> fetchData() async {
    final response = await http.get(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/notification/settings'),
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

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Notification Settting'),
        ),
        body: const SingleChildScrollView(
          child: Column(
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
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_rounded),
                            Text('Chat messages'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_outlined),
                            Text('Chat requests'),
                            SwitchWidget()
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
                            Icon(Icons.man_4),
                            Text('Mention of u/username'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_bubble),
                            Text('Comments on your posts'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.keyboard_double_arrow_up_rounded),
                            Text('Upvotes on your post'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.keyboard_double_arrow_up_rounded),
                            Text('Upvotes on your comments'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.subdirectory_arrow_left_sharp),
                            Text('Replies to your comments'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.subdirectory_arrow_left_sharp),
                            Text('Activity on your comments'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('Activity on chat posts you are in'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.fiber_new_rounded),
                            Text('new followers'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.card_giftcard_outlined),
                            Text('Awards you receive'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('posts you follow'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('comments you follow'),
                            SwitchWidget()
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
                        Text('Recommendations'),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.trending_up_outlined),
                            Text('Trending posts'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.video_settings_sharp),
                            Text('Community recommendation'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.bookmark_outline_rounded),
                            Text('ReFox'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.filter_vintage_sharp),
                            Text('featured content'),
                            SwitchWidget()
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
                        Text('Updates'),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.filter_vintage_sharp),
                            Text('Community alerts'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.filter_vintage_sharp),
                            Text('Fox Announcements'),
                            SwitchWidget()
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.cake_outlined),
                            Text('Cake day'),
                            SwitchWidget()
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
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Moderation'),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(Icons.filter_vintage_sharp),
                        Text('Mod Notification'),
                        SwitchWidget()
                      ],
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
