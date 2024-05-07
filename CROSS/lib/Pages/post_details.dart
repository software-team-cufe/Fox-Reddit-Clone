/// This file contains the implementation of the `PostDetails` widget.
/// The `PostDetails` widget displays the details of a post, including the post title, creator information, image (if available), and various actions that can be performed on the post.
/// The widget also allows the user to toggle the blur effect on the image if the post is marked as NSFW (Not Safe for Work) or a spoiler.
/// Additionally, the widget provides functionality to download the image, view the creator's profile, and perform other actions such as saving, copying text, turning on captions, crossposting, reporting, blocking accounts, and hiding the post.
/// The widget is used within the Fox app to display the details of a post in multiple screens.
library;

import 'dart:io';
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/cardCoreWidget.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/VoteSection.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart';
import 'CommentSection.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PostDetails extends StatefulWidget {
  final Map<dynamic, dynamic> post;
  final bool myProfile;

  const PostDetails({
    super.key,
    required this.post,
    this.myProfile = false,
  });

  @override
  _PostDetailsState createState() => _PostDetailsState();
}

class _PostDetailsState extends State<PostDetails> {
  String? access_token;
  bool isBlurred = false;
  late String? profilePic;

  @override
  void initState() {
    super.initState();
    isBlurred = (false || false);
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken');
        addPostToHistory();
      });
    });
  }

  Future<void> addPostToHistory() async {
    var url = Uri.parse(ApiRoutesBackend.viewedPost);
    print('########################');
    print(widget.post['postId']);
    print(widget.post['_id']);
    print(widget.post);
    print(widget.myProfile);
    print('########################');

    var response = await http.post(
      url,
      body: jsonEncode({
        "postID": widget.myProfile ? widget.post['_id'] : widget.post['postId']
      }),

      // body: {"postID": widget.post['postID']},
      headers: {
        'Authorization': 'Bearer $access_token',
        'Content-Type': 'application/json'
      },
    );
    print(response.body);
  }

  Future<String> fetchUserProfilePic(String accessToken) async {
    var url = Uri.parse(ApiRoutesBackend.getUserByToken(accessToken));
    var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    if (response.statusCode == 200) {
      Map<String, dynamic> responseData = json.decode(response.body);
      if (responseData.containsKey('user')) {
        Map<String, dynamic> user = responseData['user'];
        profilePic = user['avatar'];
        if (profilePic == 'default.jpg') {
          profilePic = null;
        }
        return profilePic!;
      } else {
        throw Exception('User pic is not present or not a string');
      }
    } else {
      throw Exception('Failed to fetch user pic');
    }
  }

  Future<void> _downloadImage(BuildContext context) async {
    // Check if permission is granted
    var status = await Permission.storage.status;
    if (status.isGranted) {
      // _startDownload(context);
    } else {
      status = await Permission.storage.request();
      if (status.isGranted) {
        // _startDownload(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Permission denied for image download"),
            duration: Duration(seconds: 2),
          ),
        );
      }
    }
  }

  void _startDownload(BuildContext context) async {
    try {
      Directory dir =
          Directory('/storage/emulated/0/fox'); // Updated directory path
      if (!dir.existsSync()) {
        dir.createSync(
            recursive: true); // Create the directory if it doesn't exist
      }

      String savePath = "${dir.path}/${widget.post['title']}.jpg";

      var response = await http.get(Uri.parse(widget.post['picture']!));
      if (response.statusCode == 200) {
        File file = File(savePath);
        await file.writeAsBytes(response.bodyBytes);

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Image downloaded successfully"),
            duration: Duration(seconds: 2),
          ),
        );
      } else {
        throw Exception("Failed to download image: ${response.statusCode}");
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error downloading image: $e"),
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }

// Define a function to show the bottom sheet
  void _showBottomMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Wrap(
          children: [
            ListTile(
              leading: const Icon(Icons.bookmark_outline),
              title: const Text("Save"),
              onTap: () {
                Navigator.pop(context); // Close the bottom sheet
                // Handle save action
              },
            ),
            ListTile(
              leading: const Icon(Icons.content_copy),
              title: const Text("Copy Text"),
              onTap: () {
                Navigator.pop(context); // Close the bottom sheet
                // Handle copy text action
              },
            ),
            ListTile(
              leading: const Icon(Icons.closed_caption),
              title: const Text("Turn on Captions"),
              onTap: () {
                Navigator.pop(context); // Close the bottom sheet
                // Handle turn on captions action
              },
            ),
            ListTile(
              leading: const Icon(Icons.call_split),
              title: const Text('Crosspost to community'),
              onTap: () {
                Navigator.pop(context); // Close the menu
                // Handle option
              },
            ),
            ListTile(
              leading: const Icon(Icons.image),
              title: const Text('Copy Image'),
              onTap: () {
                Navigator.pop(context); // Close the menu
                // Handle option
              },
            ),
            ListTile(
              leading: const Icon(Icons.download),
              title: const Text('Download Image'),
              onTap: () {
                Navigator.pop(context); // Close the menu
                //if (widget.post['picture'] != null &&
                //    widget.post['picture']!.isNotEmpty) {
                //  _downloadImage(context); // Call the download image function
                //}
              },
            ),
            ListTile(
              tileColor: Colors.transparent, // Transparent background
              onTap: () {
                Navigator.pop(context); // Close the menu
                // Handle option 1
              },
              leading: Icon(Icons.flag_outlined,
                  color: Colors.red.shade400), // Softer red icon
              title: Text(
                'Report',
                style: TextStyle(color: Colors.red.shade400), // Softer red text
              ),
            ),
            ListTile(
              tileColor: Colors.transparent, // Transparent background
              onTap: () {
                Navigator.pop(context); // Close the menu
                // Handle option 2
              },
              leading: Icon(Icons.person_off_outlined,
                  color: Colors.red.shade400), // Softer red icon
              title: Text(
                'Block account',
                style: TextStyle(color: Colors.red.shade400), // Softer red text
              ),
            ),
            ListTile(
              leading: const Icon(Icons.visibility_off),
              title: const Text('Hide'),
              onTap: () {
                Navigator.pop(context); // Close the menu
                // Handle option
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    double userWidth = MediaQuery.of(context).size.width * 0.7;

    return Scaffold(
      appBar: AppBar(
        leading: const CloseButton(),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_horiz),
            onPressed: () {
              _showBottomMenu(context);
            },
          ),
          Builder(builder: (context) {
            return IconButton(
              icon: access_token != null
                  ? FutureBuilder(
                      future: fetchUserProfilePic(access_token!),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return const CircularProgressIndicator();
                        } else if (snapshot.hasError) {
                          return const CircleAvatar(
                            backgroundColor: Colors.transparent,
                            backgroundImage:
                                AssetImage('assets/images/avatar.png'),
                          );
                        } else {
                          if (snapshot.data == null ||
                              snapshot.data.toString().isEmpty) {
                            return const CircleAvatar(
                              backgroundColor: Colors.transparent,
                              backgroundImage:
                                  AssetImage('assets/images/avatar.png'),
                            );
                          } else {
                            return CircleAvatar(
                              backgroundColor: Colors.transparent,
                              backgroundImage:
                                  NetworkImage(snapshot.data.toString()),
                            );
                          }
                        }
                      },
                    )
                  : const CircleAvatar(
                      backgroundImage: AssetImage('assets/images/avatar.png'),
                    ),
              onPressed: () {
                Scaffold.of(context).openEndDrawer();
              },
            );
          }),
        ],
      ),
      endDrawer: endDrawer(
        user_width: userWidth,
        token: access_token,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(
                  radius: 16,
                  child: Icon(Icons.account_circle),
                ),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.post["communityName"] != null
                          ? "r/${widget.post["communityName"]}"
                          : "u/${widget.post["username"]}",
                      style: const TextStyle(
                        fontSize: 16,
                        color: Color(0xFFFFFFFF),
                      ),
                    ),
                    Visibility(
                      visible: widget.post["communityName"] != null,
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ProfilePage(
                                userName: widget.post['username'],
                                access_token: access_token,
                              ),
                            ),
                          );
                        },
                        child: Text(
                          widget.post['username'] ??
                              'no username',
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            cardCoreWidget(post: widget.post, detailsPageOpen: true),
            VoteSection(post: widget.post),
            CommentSection(postId: widget.post['_id'], access_token: access_token,),
          ],
        ),
      ),
    );
  }
}
