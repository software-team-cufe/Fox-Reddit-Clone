import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/Pages/home/Post widgets/PostCardClassic.dart';
import 'package:reddit_fox/Pages/home/Post widgets/PostCardModern.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/features/home/drawers/community_list_drawer.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// A StatefulWidget that represents the home page of the Reddit Fox application.
class HistoryPage extends StatefulWidget {
  /// Constructs a [HistoryPage] instance.
  const HistoryPage({super.key});

  @override
  _HistoryPageState createState() => _HistoryPageState();
}

/// The state class associated with the [HistoryPage] StatefulWidget.
class _HistoryPageState extends State<HistoryPage> {
  late final String _selectedItem = 'Home'; // Declare _selectedItem here
  String? access_token;
  late String? profilePic;
  late int user_Id; // Variable to store the access token
  bool isModernCard = true; // Track card type

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        // access_token =
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMGI5OWVkMTQyNmY3Y2IyYmI3Y2UiLCJlbWFpbCI6Imhvc3NhbWFzZGFzZGFzZEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImgiLCJhdmF0YXIiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kdm5mOHl2c2cvaW1hZ2UvdXBsb2FkL3YxNzE0OTA4OTc1L2dkdXhiajFic2s3eG5hcXRxbmMxLnBuZyIsInBvc3RLYXJtYSI6MCwiY29tbWVudEthcm1hIjowLCJrYXJtYSI6MCwiZmNtdG9rZW4iOiJkUzJoUl9rU1Q1YUFULUMySFlKMzBxOkFQQTkxYkVLbDhiTE9HUjdISEJzNHZYQV9TUG1hZ0JlOHBFYXg5NTNhdkVCWGtMSUdsTkNvcHRzUVR1OWEzMC1hX0psREx4aEE3WDNHbXhiVm9Jb1VRSEx6ZkFGMHdKUWNxVWxSME9RNjZFN08wc0VYdUtpVzVyNC0zRzBfY28wcE9yeGh6bXc2TTZHIiwiZm9sbG93ZXJzIjpbXSwidXNlckZvbGxvd3MiOltdLCJub3RpZkFycmF5IjpbXSwiaGlzdG9yeVBvc3RzIjpbIjY2MzVmZDhkOGU3MDNlODFjYTRjZTEyYSJdLCJwb3N0Vm90ZXMiOltdLCJjb21tZW50Vm90ZXMiOltdLCJtZW50aW9uZWRJbiI6W10sInJlcGxpZWRJblBvc3QiOltdLCJtZW1iZXIiOltdLCJtb2RlcmF0b3JzIjpbXSwiZmF2b3JpdGVzIjpbXSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wN1QxMTowODowOS41NDBaIiwibm90aWZpY2F0aW9uUHJlZnMiOnsibWVzc2FnZXMiOnRydWUsImNoYXRNZXNzYWdlcyI6dHJ1ZSwiY2hhdFJlcXVlc3RzIjp0cnVlLCJtZW50aW9uT2ZVc2VybmFtZSI6dHJ1ZSwiY29tbWVudHNPbllvdXJQb3N0cyI6dHJ1ZSwidXB2b3Rlc09uWW91clBvc3RzIjp0cnVlLCJ1cHZvdGVkT25Zb3VyQ29tbWVudHMiOnRydWUsInJlcGxpZXNUb1lvdXJDb21tZW50cyI6dHJ1ZSwiYWN0aXZpdHlPbllvdXJDb21tZW50cyI6dHJ1ZSwiYWN0aXZpdHlPbkNoYXRQb3N0c1lvdXJlSW4iOnRydWUsIm5ld0ZvbGxvd2VycyI6dHJ1ZSwiYXdhcmRzWW91UmVjZWl2ZSI6dHJ1ZSwicG9zdHNZb3VGb2xsb3ciOnRydWUsImNvbW1lbnRzWW91Rm9sbG93Ijp0cnVlLCJ0cmVuZGluZ1Bvc3RzIjp0cnVlLCJjb21tdW5pdHlSZWNvbW1lbmRhdGlvbnMiOnRydWUsInJlUmVkZGl0Ijp0cnVlLCJmZWF0dXJlZENvbnRlbnQiOnRydWUsImNvbW11bml0eUFsZXJ0cyI6dHJ1ZSwicmVkZGl0QW5ub3VuY2VtZW50cyI6dHJ1ZSwiY2FrZURheSI6dHJ1ZSwibW9kTm90aWZpY2F0aW9ucyI6dHJ1ZSwiX2lkIjoiNjYzYTBiOTllZDE0MjZmN2NiMmJiN2QwIn0sImlhdCI6MTcxNTA4MDc3OSwiZXhwIjoxNzE3NjcyNzc5fQ.edAcO1atQRxAqRT-CPZ7Yj12nRSJ2r72PoOhlo9_Htc';
        access_token = sharedPrefValue.getString('backtoken');
      });
    });
  }

  /// Fetches the list of posts based on the selected item.
  Future<Map<dynamic, dynamic>> fetchHistoyPosts() async {
    var url = Uri.parse(ApiRoutesBackend.getHistroyPosts);

    var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $access_token'},
    );

    if (response.statusCode == 200) {
      Map<dynamic, dynamic> data =
          json.decode(response.body)["posts"].reversed.toList().asMap();
      return data;
    } else {
      throw Exception('Failed to load posts');
    }
  }

  /// Fetches the user profile picture using the provided access token.
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

  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.7;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text(
                  "History",
                  style: (TextStyle(
                    fontSize: 25,
                    color: Color(0xFFE74C3C),
                    fontWeight: FontWeight.bold,
                  )),
                ),
        backgroundColor: Colors.black,
        iconTheme: const IconThemeData(color: Colors.white),
        leading: Builder(builder: (context) {
          return IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
          );
        }),
        actions: _selectedItem == "Home"
            ? [ // IconButton(
                //   icon: isModernCard
                //       ? const Icon(Icons.view_agenda)
                //       : const Icon(Icons.reorder),
                //   onPressed: () {
                //     setState(() {
                //       isModernCard = !isModernCard;
                //     });
                //   },
                // ),
                // IconButton(
                //   icon: CircleAvatar(
                //     backgroundColor: Colors.transparent,
                //     child: Image.asset(
                //       'assets/Icons/filter.png',
                //       width: 24,
                //       height: 24,
                //     ),
                //   ),
                //   onPressed: () {
                //     final RenderBox overlay = Overlay.of(context)
                //         .context
                //         .findRenderObject() as RenderBox;
                //     final buttonPosition = overlay.localToGlobal(Offset.zero);
                //     const buttonWidth = 24.0;
                //     final screenSize = MediaQuery.of(context).size;
                //     final appBarHeight = AppBar().preferredSize.height;
                //     final topOffset = appBarHeight + 22;
                //     final horizontalOffset = buttonPosition.dx +
                //         ((screenSize.width - buttonWidth) / 2);

                    
                //   },
                // ),
                // IconButton(
                //   onPressed: () {
                //     Navigator.push(
                //       context,
                //       MaterialPageRoute(builder: (context) => const Search()),
                //     );
                //   },
                //   icon: const Icon(Icons.search),
                // ),
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
                            backgroundImage:
                                AssetImage('assets/images/avatar.png'),
                          ),
                    onPressed: () {
                      Scaffold.of(context).openEndDrawer();
                    },
                  );
                }),
              ]
            : [
                IconButton(
                  icon: isModernCard
                      ? const Icon(Icons.view_agenda)
                      : const Icon(Icons.view_carousel),
                  onPressed: () {
                    setState(() {
                      isModernCard = !isModernCard;
                    });
                  },
                ),
                IconButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const Search()),
                    );
                  },
                  icon: const Icon(Icons.search),
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
                            backgroundImage:
                                AssetImage('assets/images/avatar.png'),
                          ),
                    onPressed: () {
                      Scaffold.of(context).openEndDrawer();
                    },
                  );
                }),
              ],
      ),
      drawer: CommunityListDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(
        user_width: userWidth,
        token: access_token,
      ),
      bottomNavigationBar: const nBar(),
      body: Column(
        children: [
          Visibility(
            visible: "Home" == _selectedItem,
            child: const Align(
              alignment: Alignment.topRight,
            ),
          ),
          Expanded(
            child: FutureBuilder<Map<dynamic, dynamic>>(
              future: fetchHistoyPosts(),
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
                  Map<dynamic, dynamic> posts = snapshot.data ?? {};
                  return ListView.builder(
                    itemCount: posts.length,
                    itemBuilder: (context, index) {
                      var post = posts[index];
                      return isModernCard
                          ? ModernCard(
                              post: post,
                              history: true,
                            ) // pass individual post
                          : ClassicCard(post: post); // pass individual post
                    },
                  );
                }
              },
            ),
          ),
        
        ],
      ),
    );
  }
}
