import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/navbar.dart';
import 'dart:convert';

import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _sortValue = 'Top'; // Declare _selectedItem here
  String? access_token; // Variable to store the access token
  String _selectedItem = "Home";

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
        ? ApiRoutes.getPopular
        : "${ApiRoutes.baseUrl}/${_sortValue}Posts");
    var response = await http.get(url);
    print(response.statusCode);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load posts');
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
                    icon: access_token != null
                        ? CircleAvatar(
                            backgroundImage: NetworkImage('https://example.com/api/user/profilePic', headers: {
                              'Authorization': 'Bearer $access_token',
                          //backgroundImage: NetworkImage(user.profilePic),
                            }),
                          )
                        : CircleAvatar(
                            // Fallback to asset image if access_token is null
                            backgroundImage: AssetImage('assets/default_profile_pic.png'),
                          ),
                    onPressed: () {
                      Scaffold.of(context).openEndDrawer();
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
              icon: const CircleAvatar(),
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
        // title: DropdownButton<String>(
        //   // value: "asda",
        //   hint: Text(_sortValue),
        //   items: const [
        //     DropdownMenuItem(
        //       value: 'Best',
        //       child: Text('Best'),
        //     ),
        //     DropdownMenuItem(
        //       value: 'Hot',
        //       child: Text('Hot'),
        //     ),
        //     DropdownMenuItem(
        //       value: 'New',
        //       child: Text('New'),
        //     ),
        //     DropdownMenuItem(
        //       value: 'Top',
        //       child: Text('Top'),
        //     ),
        //   ],
        //   onChanged: (String? value) {
        //     setState(() {
        //       _sortValue = value!;
        //     });
        //   },
        // )),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(
        user_width: userWidth,
        user_Id: 2,
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
                        return ListTile(
                          contentPadding: const EdgeInsets.all(
                              16), // Add padding around the content
                          title: Text(
                            post['redditName'],
                            style: const TextStyle(
                                fontSize: 18,
                                fontWeight:
                                    FontWeight.bold), // Increase font size
                          ),
                          subtitle: Text(
                            post['title'],
                            style: const TextStyle(
                                fontSize: 16), // Increase font size
                          ),
                          trailing: post['picture'] != null
                              ? Image.network(
                                  post['picture'],
                                  width: 100,
                                  height: 250,
                                  fit: BoxFit.cover,
                                ) // Adjust width and height of the image
                              : null, // Leave trailing blank if post['picture'] is null
                          onTap: () {
                            // Navigate to post details or perform other actions
                          },
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
