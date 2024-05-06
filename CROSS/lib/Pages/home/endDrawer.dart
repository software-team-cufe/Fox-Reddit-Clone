import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:reddit_fox/Pages/saved.dart';
import 'package:reddit_fox/Pages/settings/HisoryScreen.dart';
import 'package:reddit_fox/Pages/settings/setting.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/features/auth/screens/switch_screen.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class endDrawer extends StatefulWidget {
  final double user_width;
  final String? token;

  const endDrawer({super.key, required this.user_width, required this.token});

  @override
  _endDrawerState createState() => _endDrawerState();
}

class _endDrawerState extends State<endDrawer> {
  late Future<String?> userId;
  late String? profilePic;
  late String? accessToken;
  late String userName;

  @override
  void initState() {
    super.initState();
    accessToken = widget.token;
    // Fetch the user ID using the provided token
    userId = fetchUserID(widget.token!);
  }

  Future<String?> fetchUserID(String accessToken) async {
    var url = Uri.parse(ApiRoutesBackend.getUserByToken(accessToken));
    var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    if (response.statusCode == 200) {
      Map<String, dynamic> responseData = json.decode(response.body);
      print(response.statusCode);
      print("response.statusCode");
      print(responseData);
      if (responseData.containsKey('user')) {
        Map<String, dynamic> user = responseData['user'];
        profilePic = user['avatar'];
        userName = user['username'];
        if (profilePic == 'default.jpg') {
          profilePic = null;
        }
        print("profilePic");
        print("user ID " + user['_id']);
        return user['_id'].toString();
      } else {
        throw Exception('User data is not present in the response');
      }
    } else {
      throw Exception(
          'Failed to fetch user data, status code: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: 0,
          bottom: 0,
          right: 0,
          width: widget.user_width,
          child: Drawer(
            backgroundColor: Colors.black,
            child: FutureBuilder<String?>(
              future: userId,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text('Error: ${snapshot.error}'),
                  );
                } else {
                  return ListView(
                    children: [
                      if (profilePic != null)
                        ClipOval(
                          child: Image.network(
                            profilePic!,
                            width: 250,
                            height: 250,
                          ),
                        ),
                      if (profilePic == null)
                        ClipOval(
                          child: Image.asset(
                            "assets/images/avatar.png",
                            width: 250,
                            height: 250,
                          ),
                        ),
                      ListTile(
                        leading: const Icon(Icons.person_outlined),
                        title: const Text('My profile'),
                        onTap: () {
                          Navigator.pop(context);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ProfilePage(
                                      userName: userName,
                                      myProfile: true,
                                      access_token: accessToken!,
                                    )),
                          );
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.add_circle_outline_sharp),
                        title: const Text('Create community'),
                        onTap: () {
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.bookmarks_outlined),
                        title: const Text('Saved'),
                        onTap: () {
                          Navigator.pop(context);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => SavedPage(
                                      userName: userName,
                                    )), // Replace SavedPage with the actual name of your saved page widget
                          );
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.access_time),
                        title: const Text('History'),
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const HistoryPage()));
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.settings),
                        title: const Text('Setting'),
                        onTap: () {
                          Navigator.pop(context);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const setting()),
                          );
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.logout),
                        title: const Text('Logout'),
                        onTap: () async {
                          // Delete the saved tokens from SharedPreferences
                          SharedPreferences prefs =
                              await SharedPreferences.getInstance();
                          await prefs.remove('backtoken');
                          await prefs.remove('mocktoken');

                          // Navigate to the authentication screen
                          Navigator.of(context).push(
                            MaterialPageRoute(
                                builder: (context) => const AuthContainer()),
                          );
                        },
                      ),
                    ],
                  );
                }
              },
            ),
          ),
        ),
      ],
    );
  }
}
