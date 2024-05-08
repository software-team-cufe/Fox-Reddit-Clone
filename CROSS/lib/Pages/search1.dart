import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/CommentCard.dart';
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/Pages/commentSearch.dart';
import 'package:reddit_fox/Pages/postViweSearch.dart';
import 'package:reddit_fox/Pages/userView.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/Pages/home/Post widgets/PostCardModern.dart';

class Search1 extends StatefulWidget {
  final String searchItem;
  const Search1({Key? key, required this.searchItem}) : super(key: key);

  @override
  State<Search1> createState() => _Search1State();
  
}

class _Search1State extends State<Search1> with SingleTickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  late TabController _tabController;
  String? access_token;
  Map<dynamic, dynamic> PostData = {};
  Map<dynamic, dynamic> PostDataHash = {};
  List<Map<String, dynamic>> userData = [];
  List<Map<String, dynamic>> commentData = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
    SharedPreferences.getInstance().then((sharedPrefValue) {
      access_token = sharedPrefValue.getString('backtoken');
    });
    _searchPost('link');
    _searchComment('comment');
    _searchUser('user');
    _searchHash('link');
  }

  @override
  void dispose() {
    _searchController.dispose();
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _searchPost(String type) async {
    try {
      // Constructing URL with query parameters
      Uri uri = Uri.parse(ApiRoutesBackend.Search);
      Map<String, String> queryParams = {
        'q': widget.searchItem,
        'type': type,
        'page': "1",
        'limit': "10", // Adding limit parameter as per the cURL command
      };
      uri = uri.replace(queryParameters: queryParams);

      // Sending GET request with headers
      http.Response response = await http.get(
        uri,
        // Add headers if required, for example:
        headers: {'Authorization': 'Bearer ${access_token}'},
      );

      print("status code for search: ${response.statusCode}");

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        PostData = (responseData['postsSearchResultNotAuth']).asMap();
        print('respose PostData [posts]: $PostData');
      } else {
        // Print response body for debugging
        print(response.body);
        throw Exception('Failed to load search results. Status code: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Error searching users: $error');
    }
  }

  Future<void> _searchComment(String type) async {
    try {
      // Constructing URL with query parameters
      Uri uri = Uri.parse(ApiRoutesBackend.Search);
      Map<String, String> queryParams = {
        'q': widget.searchItem,
        'type': type,
        'page': "1",
        'limit': "10", // Adding limit parameter as per the cURL command
      };
      uri = uri.replace(queryParameters: queryParams);

      // Sending GET request with headers
      http.Response response = await http.get(
        uri,
        // Add headers if required, for example:
        headers: {'Authorization': 'Bearer ${access_token}'},
      );

      print("status code for search: ${response.statusCode}");

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        commentData = (List<Map<String, dynamic>>.from(responseData['commentsSearchResultNotAuth']));
        print('respose CommentData: $commentData');
        print(responseData);
      } else {
        // Print response body for debugging
        print('user back in search: ${response.body}');
        throw Exception('Failed to load search results. Status code: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Error searching users: $error');
    }
  }

  Future<void> _searchUser(String type) async {
  try {
    // Constructing URL with query parameters
    Uri uri = Uri.parse(ApiRoutesBackend.Search);
    Map<String, String> queryParams = {
      'q': widget.searchItem,
      'type': type,
      'page': "1",
      'limit': "10", // Adding limit parameter as per the cURL command
    };
    uri = uri.replace(queryParameters: queryParams);

    // Sending GET request with headers
    http.Response response = await http.get(
      uri,
      // Add headers if required, for example:
      headers: {'Authorization': 'Bearer ${access_token}'},
    );

    print("status code for search: ${response.statusCode}");

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      // Check if responseData['users'] is not null before accessing it
      if (responseData['users'] != null) {
        // Assign response data to userData
        userData = (List<Map<String, dynamic>>.from(responseData['users']));
        print('response userData: $userData');
        print(responseData);
      } else {
        print('No users found');
        // Handle the case where no users are found
      }
    } else {
      // Print response body for debugging
      print('user back in search: ${response.body}');
      throw Exception('Failed to load search results. Status code: ${response.statusCode}');
    }
  } catch (error) {
    throw Exception('Error searching users: $error');
  }
}


  Future<void> _searchHash(String type) async {
    try {
      // Constructing URL with query parameters
      Uri uri = Uri.parse(ApiRoutesBackend.Search);
      Map<String, String> queryParams = {
        'q': '#${widget.searchItem}',
        'type': type,
        'page': "1",
        'limit': "10", // Adding limit parameter as per the cURL command
      };
      uri = uri.replace(queryParameters: queryParams);

      // Sending GET request with headers
      http.Response response = await http.get(
        uri,
        // Add headers if required, for example:
        headers: {'Authorization': 'Bearer ${access_token}'},
      );

      print("status code for search: ${response.statusCode}");

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        if(responseData != null){
          PostDataHash = (responseData['postsSearchResultNotAuth']).asMap();
          print('respose data [postsHash]: $PostDataHash');
        }
      } else {
        // Print response body for debugging
        print(response.body);
        throw Exception('Failed to load search results. Status code: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Error searching users: $error');
    }
  }




  Widget SearchPost(){
    return Container(
      child:  FutureBuilder<void>(
        future: _searchPost('link'),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          }
          else{
            return ListView.builder(
                  itemCount: PostData.length,
                  itemBuilder: (context, index) {
                    var post = PostData[index];
              return  ModernCardSearch(post: post);
            },
          );
          }
        }
      )
    );
  }

  Widget SearchUser(){
    return Container(
      child:  FutureBuilder<void>(
        future: _searchUser('user'),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          }
          else{
            return ListView.builder(
                  itemCount: userData.length,
                  itemBuilder: (context, index) {
                    var user = userData[index];
                    print('passed user: $user');
              return  UserView(users: user, accessToken: access_token!);
            },
          );
          }
        }
      )
    );
  }

  Widget SearchComment(){
    return Container(
      child:  FutureBuilder<void>(
        future: _searchComment('comment'),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          }
          else{
            return ListView.builder(
                  itemCount: commentData.length,
                  itemBuilder: (context, index) {
                    var comment = commentData[index];
                    print('passed user: $comment');
              return  comentViewSerch(comment: comment);
            },
          );
          }
        }
      )
    );
  }

  Widget SearchHash(){
    if(PostDataHash != {}){
      return Container(
        child:  FutureBuilder<void>(
          future: _searchHash('link'),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            }
            else{
              return ListView.builder(
                    itemCount: PostDataHash.length,
                    itemBuilder: (context, index) {
                      var post = PostDataHash[index];
                return ModernCardSearch(post: post);
              },
            );
            }
          }
        )
      );
    }
    else{
      return Container();}
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => const Search()));
          },
        ),
        backgroundColor: Colors.black,
        toolbarHeight: 80,
        
        title: Container(
          padding: const EdgeInsets.only(top: 15.0, right: 20.0, bottom: 20.0),
          child: Center(
            child: SizedBox(
              height: 25,
              child: TextField(
                controller: _searchController,
                textAlignVertical: TextAlignVertical.center,
                decoration: InputDecoration(
                  hintText: widget.searchItem,
                  filled: true,
                  fillColor: const Color.fromARGB(255, 50, 50, 50),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(2.0), // Adjust border radius
                    borderSide: BorderSide.none,
                  ),
                  prefixIcon: const Icon(Icons.search, color: Colors.white, size: 18,),
                  contentPadding: EdgeInsets.zero, // Remove default padding
                  isDense: true, // Reduce the vertical size of the input field
                ),
                style: const TextStyle(color: Colors.white),
                onChanged: (value) {
                  // Handle text field changes
                },
              ),
            ),
          ),
        ),
        titleSpacing: 0,
      ),
      body: CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: TabBar(
                    controller: _tabController,
                    isScrollable: true, // Allow swiping between tabs
                    tabs: const [
                      Tab(text: 'Posts',),
                      Tab(text:'Communities'),
                      Tab(text: 'Comments'),
                      Tab(text: 'People'),
                      Tab(text: 'Hashtags',)
                    ],
                  ),
                ),
                SliverFillRemaining(
                  child: TabBarView(
                    controller: _tabController,
                    children: [
                      // Replace these with actual content
                      SearchPost(),
                      Container(), 
                      SearchComment(),
                      SearchUser(),
                      SearchHash(), 
                    ],
                  ),
                ),
              ],
            ),
    );
  } 
}
