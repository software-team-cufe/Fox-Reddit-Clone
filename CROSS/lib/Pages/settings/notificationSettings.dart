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
  late List<bool> preferences;
  late List<String> preferenceNames;
  bool messages = true;

  bool chatMessages = true;
  bool chatRequests = true;
  bool mentionOfUsername = true;
  bool commentsOnYourPosts = true;
  bool upvotesOnYourPosts = true;
  bool upvotedOnYourComments = true;
  bool repliesToYourComments = true;
  bool activityOnYourComments = true;
  bool activityOnChatPostsYoureIn = true;
  bool newFollowers = true;
  bool awardsYouReceive = true;
  bool postsYouFollow = true;
  bool commentsYouFollow = true;
  bool trendingPosts = true;
  bool communityRecommendations = true;
  bool reReddit = true;
  bool featuredContent = true;
  bool communityAlerts = true;
  bool redditAnnouncements = true;
  bool cakeDay = true;
  bool modNotifications = true;

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
        preferences = [
          userPrefs?['messages'],
          userPrefs?['chatMessages'],
          userPrefs?['chatRequests'],
          userPrefs?['mentionOfUsername'],
          userPrefs?['commentsOnYourPosts'],
          userPrefs?['upvotesOnYourPosts'],
          userPrefs?['upvotedOnYourComments'],
          userPrefs?['repliesToYourComments'],
          userPrefs?['activityOnYourComments'],
          userPrefs?['activityOnChatPostsYoureIn'],
          userPrefs?['newFollowers'],
          userPrefs?['awardsYouReceive'],
          userPrefs?['postsYouFollow'],
          userPrefs?['commentsYouFollow'],
          userPrefs?['trendingPosts'],
          userPrefs?['communityRecommendations'],
          userPrefs?['reReddit'],
          userPrefs?['featuredContent'],
          userPrefs?['communityAlerts'],
          userPrefs?['redditAnnouncements'],
          userPrefs?['cakeDay'],
          userPrefs?['modNotifications'],
        ];
        preferenceNames = [
          'messages',
          'chatMessages',
          'chatRequests',
          'mentionOfUsername',
          'commentsOnYourPosts',
          'upvotesOnYourPosts',
          'upvotedOnYourComments',
          'repliesToYourComments',
          'activityOnYourComments',
          'activityOnChatPostsYoureIn',
          'newFollowers',
          'awardsYouReceive',
          'postsYouFollow',
          'commentsYouFollow',
          'trendingPosts',
          'communityRecommendations',
          'reReddit',
          'featuredContent',
          'communityAlerts',
          'redditAnnouncements',
          'cakeDay',
          'modNotifications',
        ];
        messages = preferences[0];

        chatMessages = preferences[1];
        chatRequests = preferences[2];
        mentionOfUsername = preferences[3];
        commentsOnYourPosts = preferences[4];
        upvotesOnYourPosts = preferences[5];
        upvotedOnYourComments = preferences[6];
        repliesToYourComments = preferences[7];
        activityOnYourComments = preferences[8];
        activityOnChatPostsYoureIn = preferences[9];
        newFollowers = preferences[10];
        awardsYouReceive = preferences[11];
        postsYouFollow = preferences[12];
        commentsYouFollow = preferences[13];
        trendingPosts = preferences[14];
        communityRecommendations = preferences[15];
        reReddit = preferences[16];
        featuredContent = preferences[17];
        communityAlerts = preferences[18];
        redditAnnouncements = preferences[19];
        cakeDay = preferences[20];
        modNotifications = preferences[21];
      });
      print(userPrefs);
    } else {
      throw Exception('Failed to load user preferences ${response.statusCode}');
    }
  }

  Future<void> updatePreferences() async {
    preferences[0] = messages;

    preferences[1] = chatMessages;
    preferences[2] = chatRequests;
    preferences[3] = mentionOfUsername;
    preferences[4] = commentsOnYourPosts;
    preferences[5] = upvotesOnYourPosts;
    preferences[6] = upvotedOnYourComments;
    preferences[7] = repliesToYourComments;
    preferences[8] = activityOnYourComments;
    preferences[9] = activityOnChatPostsYoureIn;
    preferences[10] = newFollowers;
    preferences[11] = awardsYouReceive;
    preferences[12] = postsYouFollow;
    preferences[13] = commentsYouFollow;
    preferences[14] = trendingPosts;
    preferences[15] = communityRecommendations;
    preferences[16] = reReddit;
    preferences[17] = featuredContent;
    preferences[18] = communityAlerts;
    preferences[19] = redditAnnouncements;
    preferences[20] = cakeDay;
    preferences[21] = modNotifications;
    final patchData = {
      for (int i = 0; i < preferenceNames.length; i++)
        preferenceNames[i]: preferences[i],
    };
    final response = await http.patch(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/notification/settings'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken',
      },
      body: jsonEncode(patchData),
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      print('Preferences updated successfully.');
      // Handle success if needed
      print(patchData);
    } else {
      throw Exception(
          'Failed to update user preferences ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Notification Settting'),
        ),
        body: SingleChildScrollView(
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
                            Switch(
                              value: messages,
                              onChanged: (value) {
                                print('Switch toggled. New value: $value');
                                setState(() {
                                  messages = value;
                                });
                                print('Updated messages value: $messages');
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_rounded),
                            Text('Chat messages'),
                            Switch(
                              value: chatMessages,
                              onChanged: (value) {
                                setState(() {
                                  chatMessages = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_outlined),
                            Text('Chat requests'),
                            Switch(
                              value: chatRequests,
                              onChanged: (value) {
                                setState(() {
                                  chatRequests = value;
                                });
                                updatePreferences();
                              },
                            )
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
                            Switch(
                              value: mentionOfUsername,
                              onChanged: (value) {
                                setState(() {
                                  mentionOfUsername = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.chat_bubble),
                            Text('Comments on your posts'),
                            Switch(
                              value: commentsOnYourPosts,
                              onChanged: (value) {
                                setState(() {
                                  commentsOnYourPosts = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.keyboard_double_arrow_up_rounded),
                            Text('Upvotes on your post'),
                            Switch(
                              value: upvotesOnYourPosts,
                              onChanged: (value) {
                                setState(() {
                                  upvotesOnYourPosts = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.keyboard_double_arrow_up_rounded),
                            Text('Upvotes on your comments'),
                            Switch(
                              value: upvotedOnYourComments,
                              onChanged: (value) {
                                setState(() {
                                  upvotedOnYourComments = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.subdirectory_arrow_left_sharp),
                            Text('Replies to your comments'),
                            Switch(
                              value: repliesToYourComments,
                              onChanged: (value) {
                                setState(() {
                                  repliesToYourComments = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.subdirectory_arrow_left_sharp),
                            Text('Activity on your comments'),
                            Switch(
                              value: activityOnYourComments,
                              onChanged: (value) {
                                setState(() {
                                  activityOnYourComments = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('Activity on chat posts you are in'),
                            Switch(
                              value: activityOnChatPostsYoureIn,
                              onChanged: (value) {
                                setState(() {
                                  activityOnChatPostsYoureIn = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.fiber_new_rounded),
                            Text('new followers'),
                            Switch(
                              value: newFollowers,
                              onChanged: (value) {
                                setState(() {
                                  newFollowers = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.card_giftcard_outlined),
                            Text('Awards you receive'),
                            Switch(
                              value: awardsYouReceive,
                              onChanged: (value) {
                                setState(() {
                                  awardsYouReceive = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('posts you follow'),
                            Switch(
                              value: postsYouFollow,
                              onChanged: (value) {
                                setState(() {
                                  postsYouFollow = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.stars_outlined),
                            Text('comments you follow'),
                            Switch(
                              value: commentsYouFollow,
                              onChanged: (value) {
                                setState(() {
                                  commentsYouFollow = value;
                                });
                                updatePreferences();
                              },
                            )
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
                            Switch(
                              value: trendingPosts,
                              onChanged: (value) {
                                setState(() {
                                  trendingPosts = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.video_settings_sharp),
                            Text('Community recommendation'),
                            Switch(
                              value: communityRecommendations,
                              onChanged: (value) {
                                setState(() {
                                  communityRecommendations = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.bookmark_outline_rounded),
                            Text('ReFox'),
                            Switch(
                              value: reReddit,
                              onChanged: (value) {
                                setState(() {
                                  reReddit = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.filter_vintage_sharp),
                            Text('featured content'),
                            Switch(
                              value: featuredContent,
                              onChanged: (value) {
                                setState(() {
                                  featuredContent = value;
                                });
                                updatePreferences();
                              },
                            )
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
                            Switch(
                              value: communityAlerts,
                              onChanged: (value) {
                                setState(() {
                                  communityAlerts = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.filter_vintage_sharp),
                            Text('Fox Announcements'),
                            Switch(
                              value: redditAnnouncements,
                              onChanged: (value) {
                                setState(() {
                                  redditAnnouncements = value;
                                });
                                updatePreferences();
                              },
                            )
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(Icons.cake_outlined),
                            Text('Cake day'),
                            Switch(
                              value: cakeDay,
                              onChanged: (value) {
                                setState(() {
                                  cakeDay = value;
                                });
                                updatePreferences();
                              },
                            )
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
                        Switch(
                          value: modNotifications,
                          onChanged: (value) {
                            setState(() {
                              modNotifications = value;
                            });
                            updatePreferences();
                          },
                        )
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
