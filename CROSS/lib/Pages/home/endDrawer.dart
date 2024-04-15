import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/Profile.dart';
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
  late Future<int> userId;
  late String? profilePic;

  @override
  void initState() {
    super.initState();
    // Fetch the user ID using the provided token
    userId = fetchUserID(widget.token!);
  }

  Future<int> fetchUserID(String accessToken) async {
    var url = Uri.parse(ApiRoutesMockserver.getUserByToken(accessToken));
    var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    if (response.statusCode == 200) {
      List<dynamic> responseData = json.decode(response.body);
      if (responseData.isNotEmpty &&
          responseData[0] is Map<String, dynamic> &&
          responseData[0].containsKey('id')) {
        profilePic = responseData[0]['profilePic'];
        return responseData[0]['id'];
      } else {
        throw Exception('User ID is not present or not an integer');
      }
    } else {
      throw Exception('Failed to fetch user ID');
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
            child: FutureBuilder<int>(
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
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    ProfilePage(user_Id: snapshot.data!)),
                          );
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.add_circle_outline_sharp),
                        title: const Text('Create community'),
                        onTap: () {},
                      ),
                      ListTile(
                        leading: const Icon(Icons.access_time),
                        title: const Text('History'),
                        onTap: () {},
                      ),
                      ListTile(
                        leading: const Icon(Icons.settings),
                        title: const Text('Setting'),
                        onTap: () {
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
                          // Delete the saved token (assuming you're using shared preferences)
                          // Replace 'token' with the key you used to save the token
                          SharedPreferences prefs =
                              await SharedPreferences.getInstance();
                          await prefs.remove('token');

                          Get.off(() => const AuthContainer());
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
