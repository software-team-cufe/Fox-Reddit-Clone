  import 'package:flutter/material.dart';
  import 'package:flutter/widgets.dart';
  import 'package:http/http.dart' as http;
  import 'dart:convert';
  import 'dart:typed_data';
  import 'package:intl/intl.dart';
  import 'package:reddit_fox/Pages/Search.dart';
  import 'package:reddit_fox/Pages/EditProfile.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/PostCardModern.dart';
  import 'package:reddit_fox/navbar.dart';
  import 'package:reddit_fox/routes/Mock_routes.dart';
  import 'package:share/share.dart';


  class ProfilePage extends StatefulWidget {
    ProfilePage({Key? key, required this.userName, this.myProfile = false, this.access_token = null}) : super(key: key);
    final String userName;
    final bool myProfile;
    final String? access_token;

    @override
    _ProfilePageState createState() => _ProfilePageState();
  }

  class _ProfilePageState extends State<ProfilePage> with SingleTickerProviderStateMixin {
    late Map<String, dynamic> userData = {};
    late Map<String, dynamic> postData = {};
    late TabController _tabController;
    late bool _myProfile;
    late List<Map<String, dynamic>> userPosts = [];
    String? access_token;
    late String? userID;
    late String? profilePic = null;
    late String? userName = widget.userName;
    bool _showTitle = true;
    late String? createdAt = "";
    List<dynamic> data = [];
    List<dynamic> posts = [];
    List<dynamic> userComments = [];
    late int totalKarma = 0;
    late int commentKarma = 0;
    

    @override
    void initState() {
      super.initState();
      _myProfile = widget.myProfile;
      _tabController = TabController(length: 3, vsync: this);
      access_token = widget.access_token;

      fetchUserAbout(widget.userName);
      fetchData();
      fetchDataBack();
      getUserComments();
    }

    @override
    void dispose() {
      _tabController.dispose();
      super.dispose();
    }


    Future<void> fetchUserAbout(String userName) async {
      print("userName: $userName");
      String editedUsername = userName;
    if (editedUsername.startsWith('u/')) {
      editedUsername = editedUsername.substring(2); // Extracts the part after 'u/'
    }
      try {
      var url = Uri.parse(ApiRoutesBackend.getUserAbout(editedUsername));
      var response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $access_token'},
    );
      print("response statues code: ${response.statusCode}");
        if (response.statusCode == 200) {
          Map<String, dynamic> responseData = json.decode(response.body);
          print("Response Data: $responseData");
          if (responseData.containsKey('userID')) {
            setState(() {
              profilePic = responseData['avatar'];
              if (profilePic == 'default.jpg') {
                profilePic = null;
              }
              userID = responseData['userID'];
              createdAt = responseData['createdAt'] ?? "";
              userName = responseData['email'];
              commentKarma = responseData['commentKarma'];
              totalKarma = responseData['totalKarma'];
            });
          } else {
            throw Exception('User ID is not present in the response');
          }
        } else {
          throw Exception(
              'Failed to fetch user data, status code: ${response.statusCode}');
        }
      } catch (error) {
        print('Error fetching user data: $error');
        // Handle error, show error message, retry logic, etc.
      }
    }

    Future<void> fetchData() async {
      try {
        final response = await http.get(Uri.parse(ApiRoutesMockserver.getUserById(1)));
        if (response.statusCode == 200) {
          setState(() {
            postData = json.decode(response.body);
          });
        } else {
          throw Exception('Failed to load user data');
        }

        final postResponse = await http.get(Uri.parse(ApiRoutesMockserver.getPostsByCreatorId(widget.userName.toString())));
        if (postResponse.statusCode == 200) {
          setState(() {
            userPosts = json.decode(postResponse.body).cast<Map<String, dynamic>>();
          });
        } else {
          throw Exception('Failed to load user posts');
        }
      } catch (error) {
        print('Error fetching data: $error');
        // Handle error, show error message, retry logic, etc.
      }
    }


    Future<void> fetchDataBack() async {
      // Base URL and endpoint
      String baseUrl = 'http://foxnew.southafricanorth.cloudapp.azure.com';
      String endpoint = '/user/${widget.userName}/overview';

      // Query parameters
      // Map<String, String> queryParams = {
      //   'page': '1',
      //   'count': '5',
      //   'limit': '10',
      //   't': 'all'
      //   // Add any additional query parameters here if needed
      // };

      // Constructing URL with query parameters
      Uri uri = Uri.parse(baseUrl + endpoint); //.replace(queryParameters: queryParams);

      try {
        // Sending GET request with headers
        http.Response response = await http.get(
          uri,
          headers: {'Authorization': 'Bearer ${widget.access_token}'},
        );

        print("status code for fetchDataBack: ${response.statusCode}");
        print("response body: ${response.body}");

        if (response.statusCode == 200) {
          // Parsing response data
          Map<String, dynamic> responseData = jsonDecode(response.body);
          
          // Updating state with fetched data
          setState(() {
            posts = responseData['posts'];
          });
        } else {
          print('Request failed with status: ${response.statusCode}');
        }
      } catch (e) {
        print('Error fetching data: $e');
      }
    }



  Future<void> getUserComments() async {
    try{
      final commentResponse = await http.get(Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/user/${widget.userName}/comments?page=1&count=5&limit=10&t=1'), headers: {'Authorization': 'Bearer $access_token'});
    print("status code for getUserComments: ${commentResponse.statusCode}");
    if (commentResponse.statusCode == 200) {
      setState(() {
        userComments = json.decode(commentResponse.body)['posts'].cast<Map<String, dynamic>>();
        print("user Comments : $userComments");
      });
    } else {
      throw Exception('Failed to load user comments');
    }
  } catch (error) {
    print('Error fetching data: $error');
    // Handle error, show error message, retry logic, etc.
  }
  }

  @override
    ImageProvider<Object> _getImageProvider(dynamic picture) {
      if (profilePic is String) {
        return NetworkImage(profilePic!);
      } else if (profilePic is Uint8List) {
        return MemoryImage(profilePic! as Uint8List);
      } else {
        return const AssetImage('assets/images/avatar.png');
      }
    }

    String _formatDate(String? date) {
      if (date != null && date.isNotEmpty) {
        final parsedDate = DateTime.parse(date);
        return DateFormat.MMMd().add_y().format(parsedDate);
      }
      return ''; // Return an empty string if date is null or empty
    }

Widget _buildTitleView() {
  return CustomScrollView(
    slivers: <Widget>[
      SliverAppBar(
        pinned: true,
        backgroundColor: Colors.deepPurple,
        expandedHeight: 350,
        flexibleSpace: LayoutBuilder(
          builder: (context, constraints) {
             _showTitle = constraints.biggest.height <= 100;
            return FlexibleSpaceBar(
              title: userName != null  && _showTitle
                  ? Text(
                      userName!,
                      style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                    )
                  : null,
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.deepPurple, Colors.black],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 50, left: 10),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CircleAvatar(
                            radius: 50,
                            backgroundImage: _getImageProvider(profilePic ?? ''),
                            backgroundColor: Colors.black,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 10, top: 15),
                            child: SizedBox(
                              height: 40,
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => EditProfilePage()),
                                  );
                                },
                                child: const Text('Edit Profile'),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20, top: 15),
                      child: Text(
                        '$userName',
                        style: TextStyle(
                          fontSize: 26,
                          color: Colors.grey[400],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20, top: 5),
                      child: Text(
                        'u/$userName • 1 karma •  ${_formatDate(createdAt)}',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey[400],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
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
          IconButton(
            onPressed: () {
              Share.share('https://www.reddit.com/user/${widget.userName}/');
              print("it is pressed");
            },
            icon: Transform.scale(
              scale: 0.55,
              child: Image.asset('assets/Icons/share.png'),
            ),
          ),
        ],
      ),
      SliverToBoxAdapter(
        child: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Posts'),
            Tab(text: 'Comments'),
            Tab(text: 'About'),
          ],
        ),
      ),
      SliverFillRemaining(
        child: TabBarView(
          controller: _tabController,
          children: [
            buildPostsContainer(),
            Container(), // Placeholder for Comments
            buildAboutContainer(), // Placeholder for About
          ],
        ),
      ),
    ],
  );
}

    Widget _buildAlternateView() {
      double screenWidth = MediaQuery.of(context).size.width;
      return CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            pinned: true,
            backgroundColor: Colors.deepPurple,
            expandedHeight: 350,
            flexibleSpace: LayoutBuilder(
              builder: (context, constraints) {
                _showTitle = constraints.biggest.height <= 100;
                return FlexibleSpaceBar(
                  title: userName  != null && _showTitle
                      ? Text(
                          userName!,
                          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                        )
                      : null,
                  background: Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Colors.deepPurple, Colors.black],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                          Padding(
                          padding: const EdgeInsets.only(top: 80, left: 10),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              CircleAvatar(
                                radius: 50,
                                backgroundImage: _getImageProvider(profilePic ?? ''),
                                backgroundColor: Colors.black,
                              ),
                              
                              Row(
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(),
                                        child: Text(
                                          '$userName',
                                          style: TextStyle(
                                            fontSize: 22,
                                            color: Colors.grey[400],
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(),
                                        child: Text(
                                          'u/$userName • 1 karma • ${_formatDate(createdAt)}',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.grey[400],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              Row(children: [
                                Padding(
                                padding: const EdgeInsets.only(),
                                  child: CircleAvatar(
                                    backgroundColor: Colors.transparent,
                                    radius: 50, // Increase the radius to increase the size of the CircleAvatar
                                    child: ElevatedButton(
                                      onPressed: () {},
                                      style: ElevatedButton.styleFrom(
                                        shape: const CircleBorder(), // Make the ElevatedButton circular
                                      ),
                                      child: Image.asset(
                                        'assets/Icons/Chat.png',
                                        width: 28, // Set the width of the Image
                                        height: 28, // Set the height of the Image
                                      ),
                                    ),
                                  ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(),
                                  child: SizedBox(
                                    width: screenWidth * 0.25, // 50% of screen width
                                    height: 35,
                                    child: ElevatedButton(
                                      onPressed: () {
                                      },
                                      child: const Text('Follow'),
                                    ),
                                  ),
                                ),
                              ],)
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
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
              IconButton(
                onPressed: () {
                  Share.share('https://www.reddit.com/user//');
                  print("it is pressed");
                },
                icon: Transform.scale(
                  scale: 0.55,
                  child: Image.asset('assets/Icons/share.png'),
                ),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: TabBar(
              controller: _tabController,
              tabs: const [
                Tab(text: 'Posts'),
                Tab(text: 'Comments'),
                Tab(text: 'About'),
              ],
            ),
          ),
          SliverFillRemaining(
            child: TabBarView(
              controller: _tabController,
              children: [
                buildPostsContainer(),
                Container(), // Placeholder for Comments
                buildAboutContainer(), // Placeholder for About
              ],
            ),
          ),
        ],
      );
    }

    Widget buildPostsContainer(){
      return CustomScrollView(
        slivers: [
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                return ModernCard(post: posts[index], access_token: access_token);
              },
              childCount: posts.length,
            ),
          ),
        ],
      );
    }

    Widget buildAboutContainer(){
        double screenHeight = MediaQuery.of(context).size.height;

        return Scaffold(
          body: Column(
            children: [
              SizedBox(
                height: screenHeight * 0.08, // 20% of screen height
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        color: const Color.fromARGB(255, 26, 26, 26),
                        alignment: Alignment.center,
                        child: Text(
                      "Post Karma: $totalKarma",
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      )
                    ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        color: const Color.fromARGB(255, 26, 26, 26),
                        alignment: Alignment.center,
                        child: Text(
                      "Comment Karma: $commentKarma",
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        )
                      ),
                      ),
                    )
                  ],
                ),
              ),
              const Divider(
                color: Color.fromARGB(255, 88, 88, 88),
                height: 2,
              ),
            ],
          ),
        );

      }

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        body: postData.isEmpty
            ? const Center(child: CircularProgressIndicator())
            : _myProfile
                ? _buildTitleView()
                : _buildAlternateView(),
        bottomNavigationBar: const nBar(),
      );
    }
  }
