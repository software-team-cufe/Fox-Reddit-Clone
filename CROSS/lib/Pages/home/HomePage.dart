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
class HomePage extends StatefulWidget {
  /// Constructs a [HomePage] instance.
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

/// The state class associated with the [HomePage] StatefulWidget.
class _HomePageState extends State<HomePage> {
  late String _selectedItem = 'Home'; // Declare _selectedItem here
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
        access_token = sharedPrefValue.getString('backtoken');
      });
    });
  }

  /// Fetches the list of posts based on the selected item.
  Future<Map<dynamic, dynamic>> fetchPosts() async {
    var url = Uri.parse(_selectedItem == 'Popular'
        ? ApiRoutesMockserver.getPopular
        : ApiRoutesMockserver.getPosts);
    var response = await http.get(url);

    url = Uri.parse(ApiRoutesBackend.homePostssorted());
    // response = await http.get(
    //   url,
    //   headers: {'Authorization': 'Bearer $access_token'},
    // );
     print("reaponse status code: ${response.statusCode}");
    if (response.statusCode == 200) {
      Map<dynamic, dynamic> data =
          json.decode(response.body).asMap();

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
            ? [
                IconButton(
                  icon: isModernCard
                      ? const Icon(Icons.view_agenda)
                      : const Icon(Icons.reorder),
                  onPressed: () {
                    setState(() {
                      isModernCard = !isModernCard;
                    });
                  },
                ),
                IconButton(
                  icon: CircleAvatar(
                    backgroundColor: Colors.transparent,
                    child: Image.asset(
                      'assets/Icons/filter.png',
                      width: 24,
                      height: 24,
                    ),
                  ),
                  onPressed: () {
                    final RenderBox overlay = Overlay.of(context)
                        .context
                        .findRenderObject() as RenderBox;
                    final buttonPosition = overlay.localToGlobal(Offset.zero);
                    const buttonWidth = 24.0;
                    final screenSize = MediaQuery.of(context).size;
                    final appBarHeight = AppBar().preferredSize.height;
                    final topOffset = appBarHeight + 22;
                    final horizontalOffset = buttonPosition.dx +
                        ((screenSize.width - buttonWidth) / 2);

                    showMenu<String>(
                      context: context,
                      position: RelativeRect.fromLTRB(
                        horizontalOffset + buttonWidth,
                        topOffset,
                        screenSize.width - horizontalOffset + buttonWidth,
                        0,
                      ),
                      items: [
                        const PopupMenuItem<String>(
                          value: 'Best',
                          child: Text('Best'),
                        ),
                        const PopupMenuItem<String>(
                          value: 'Hot',
                          child: Text('Hot'),
                        ),
                        const PopupMenuItem<String>(
                          value: 'New',
                          child: Text('New'),
                        ),
                        const PopupMenuItem<String>(
                          value: 'Top',
                          child: Text('Top'),
                        ),
                      ],
                      elevation: 8.0,
                    ).then((value) {
                      if (value != null) {
                        setState(() {
                          // Handle menu item selection if needed
                        });
                      }
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
        title: PopupMenuButton<String>(
          icon: _selectedItem == 'Home'
              ? const Text(
                  "FOX",
                  style: (TextStyle(
                    fontSize: 22,
                    color: Color(0xFFE74C3C),
                    fontWeight: FontWeight.bold,
                  )),
                )
              : Text(
                  _selectedItem,
                  style: const TextStyle(
                      fontSize: 22,
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                ),
          initialValue: _selectedItem,
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: "Home",
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.transparent,
                  radius: 12,
                  backgroundImage: AssetImage('assets/Icons/home.png'),
                ),
                title: Text("Home", style: TextStyle(fontSize: 12)),
              ),
            ),
            const PopupMenuItem(
              value: "Popular",
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.transparent,
                  radius: 16,
                  backgroundImage: AssetImage('assets/Icons/popular.png'),
                ),
                title: Text("Popular", style: TextStyle(fontSize: 12)),
              ),
            ),
          ],
          onSelected: (value) {
            setState(() {
              _selectedItem = value; // Update the selected item
            });
          },
        ),
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
              future: fetchPosts(),
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
                          ? ModernCard(post: posts)
                          : ClassicCard(post: posts);
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
