import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/navbar.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _selectedItem = 'Home'; // Declare _selectedItem here
  String? access_token;
  late int user_Id; // Variable to store the access token
  String _sortValue = "Top";

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('token');
      });
    });
  }

  Future<List<dynamic>> fetchPosts() async {
    var url = Uri.parse(_selectedItem == 'Popular'
        ? ApiRoutesMockserver.getPopular
        : ApiRoutesMockserver.getPosts);
    var response = await http.get(url);
    print(response.statusCode);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load posts');
    }
  }

  Future<String> fetchUserProfilePic(String accessToken) async {
    var url = Uri.parse(ApiRoutesMockserver.getUserByToken(accessToken));
    var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    if (response.statusCode == 200) {
      List<dynamic> responseData = json.decode(response.body);
      if (responseData.isNotEmpty &&
          responseData[0] is Map<String, dynamic> &&
          responseData[0].containsKey('profilePic')) {
        return responseData[0]['profilePic'];
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
        actions: [
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
                          // Handle error fetching profile picture
                          return const CircleAvatar(
                            backgroundImage:
                                AssetImage('assets/images/avatar.png'),
                          );
                        } else {
                          // Check if profile picture URL is null or empty
                          if (snapshot.data == null ||
                              snapshot.data.toString().isEmpty) {
                            // Handle case where profile picture URL is empty or null
                            return const CircleAvatar(
                              backgroundImage:
                                  AssetImage('assets/images/avatar.png'),
                            );
                          } else {
                            // Display profile picture
                            return CircleAvatar(
                              backgroundColor: Colors.black,
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
        title: PopupMenuButton<String>(
          icon: Text(_selectedItem),
          initialValue: _selectedItem,
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: "Home",
              child: Text("Home"),
            ),
            const PopupMenuItem(
              value: "Popular",
              child: Text("Popular"),
            ),
          ],
          onSelected: (value) {
            setState(() {
              _selectedItem = value; // Use _selectedItem from the state class
            });
          },
        ),
      ),
      drawer: CustomDrawer(
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
            child: Padding(
              padding: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width -
                      MediaQuery.of(context).size.width / 15),
              child: DropdownButton<String>(
                isDense: true,
                isExpanded: true,
                iconEnabledColor: Colors.white,
                iconDisabledColor: Colors.white,
                focusColor: Colors.black,
                dropdownColor: Colors.black,
                hint: Text(
                  _sortValue,
                  style: const TextStyle(color: Colors.white),
                ),
                // value: "asda",
                items: const [
                  DropdownMenuItem(
                    value: 'Best',
                    child: Text('Best'),
                  ),
                  DropdownMenuItem(
                    value: 'Hot',
                    child: Text('Hot'),
                  ),
                  DropdownMenuItem(
                    value: 'New',
                    child: Text('New'),
                  ),
                  DropdownMenuItem(
                    value: 'Top',
                    child: Text('Top'),
                  ),
                ],
                onChanged: (String? value) {
                  setState(() {
                    _sortValue = value!;
                  });
                },
              ),
            ),
          ),
          Expanded(
            child: Container(
              child: FutureBuilder<List<dynamic>>(
                future: fetchPosts(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child:
                          CircularProgressIndicator(), // Show a loading indicator
                    );
                  } else if (snapshot.hasError) {
                    return Center(
                      child: Text(
                          'Error: ${snapshot.error}'), // Show an error message if loading fails
                    );
                  } else {
                    List<dynamic> posts = snapshot.data!;
                    return ListView.builder(
                      itemCount: posts.length,
                      itemBuilder: (context, index) {
                        var post = posts[index];
                        return Column(
                          children: [
                            ListTile(
                              contentPadding: const EdgeInsets.all(16),
                              title: Text(
                                post['redditName'],
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              subtitle: Text(
                                post['title'],
                                style: const TextStyle(fontSize: 16),
                              ),
                              trailing: post['picture'] != null
                                  ? Image.network(
                                      post['picture'],
                                      width: 100,
                                      height: 250,
                                      fit: BoxFit.cover,
                                    )
                                  : null,
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => PostDetails(
                                      redditName: post['redditName'],
                                      title: post['title'],
                                      picture: post['picture'],
                                      votes: post['votes'],
                                      commentsNo: post['commentsNo'],
                                      creatorId: post['creatorId'],
                                    ),
                                  ),
                                );
                              },
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                IconButton(
                                  icon: const Icon(Icons.arrow_upward),
                                  onPressed: () {
                                    // Implement upvote logic here
                                  },
                                ),
                                Text(post['votes'].toString()),
                                IconButton(
                                  icon: const Icon(Icons.arrow_downward),
                                  onPressed: () {
                                    // Implement downvote logic here
                                  },
                                ),
                                const SizedBox(width: 2),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    const SizedBox(width: 4),
                                    Text(
                                      post['commentsNo'].toString(),
                                      style: const TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                    const Icon(Icons.comment),
                                    IconButton(
                                      onPressed: () {
                                        String postUrl =
                                            'https://example.com/posts/'; // Replace with your actual post URL
                                        Share.share('\n$postUrl');
                                      },
                                      icon: const Icon(Icons.share),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
