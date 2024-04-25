  import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
  import 'package:http/http.dart' as http;
  import 'dart:convert';
  import 'dart:typed_data';
  import 'package:intl/intl.dart';
  import 'package:reddit_fox/Pages/Search.dart';
  import 'package:reddit_fox/Pages/EditProfile.dart';
import 'package:reddit_fox/navbar.dart';
  import 'package:reddit_fox/routes/Mock_routes.dart';
  import 'package:share/share.dart';
  import 'package:shared_preferences/shared_preferences.dart';


  class ProfilePage extends StatefulWidget {
    ProfilePage({Key? key, required this.user_Id, this.myProfile = false, this.access_token = null}) : super(key: key);
    final int user_Id;
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
    late String? userName = '';
    bool _showTitle = true;
    late String? created_at;
    

    @override
    void initState() {
      super.initState();
      _myProfile = widget.myProfile;
      _tabController = TabController(length: 3, vsync: this);
      access_token = widget.access_token;

      if (_myProfile) {
        print(access_token);
        fetchUserID(access_token);
      }
      else{
        getUserData();
        fetchData();
      }
      fetchData();
    }

    @override
    void dispose() {
      _tabController.dispose();
      super.dispose();
    }

    Future<void> fetchUserID(String? accessToken) async {
      try {
        if (accessToken == null) {
          throw Exception('Access token is null');
        }

        var url = Uri.parse(ApiRoutesBackend.getUserByToken(accessToken));
        var response = await http.get(
          url,
          headers: {'Authorization': 'Bearer $accessToken'},
        );
        
        if (response.statusCode == 200) {
          Map<String, dynamic> responseData = json.decode(response.body);
          if (responseData.containsKey('user')) {
            Map<String, dynamic> user = responseData['user'];
            setState(() {
              profilePic = user['avatar'];
              if(profilePic == 'default.jpg'){
                profilePic = null;
              }
              userID = user['_id'].toString();
              created_at = user['createdAt'].toString();
              userName = user['username'];
              print(
                'User ID: $userID, Username: $userName, Profile Pic: $profilePic, Created at: $created_at'
              );
            });
          } else {
            throw Exception('User data is not present in the response');
          }
        } else {
          throw Exception('Failed to fetch user data, status code: ${response.statusCode}');
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

        final postResponse = await http.get(Uri.parse(ApiRoutesMockserver.getPostsByCreatorId(widget.user_Id.toString())));
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

    Future<void> getUserData() async {
      try {
        final url = ApiRoutesMockserver.getUserById(widget.user_Id);
        print('URL: $url');
        final response = await http.get(Uri.parse(url));
        print('Response Status Code: ${response.statusCode}');
        print('Response Body: ${response.body}');
        if (response.statusCode == 200) {
          setState(() {
            userData = json.decode(response.body);
            userName = userData['userName'];
            profilePic = userData['profilePic']; 
          });
        } else {
          throw Exception('Failed to load user data');
        }
      } catch (error) {
        print('Error fetching user data: $error');
        // Handle error, show error message, retry logic, etc.
      }
    }



    ImageProvider<Object> _getImageProvider(dynamic picture) {
      if (profilePic is String) {
        return NetworkImage(profilePic!);
      } else if (profilePic is Uint8List) {
        return MemoryImage(profilePic! as Uint8List);
      } else {
        return AssetImage('assets/images/avatar.png');
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
        expandedHeight: 280,
        flexibleSpace: LayoutBuilder(
          builder: (context, constraints) {
             _showTitle = constraints.biggest.height <= 100;
            return FlexibleSpaceBar(
              title: _myProfile && userName != null && _showTitle
                  ? Text(
                      userName!,
                      style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                    )
                  : null,
              background: Container(
                decoration: BoxDecoration(
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
                          Padding(
                            padding: const EdgeInsets.only(left: 10, top: 10),
                            child: SizedBox(
                              height: 35,
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => EditProfilePage()),
                                  );
                                },
                                child: Text('Edit Profile'),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20),
                      child: Text(
                        '$userName',
                        style: TextStyle(
                          fontSize: 26,
                          color: Colors.grey[400],
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20),
                      child: Text(
                        'u/$userName • 1 karma • ${_formatDate(created_at)}',
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
              Share.share('https://www.reddit.com/user/${widget.user_Id}/');
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
          tabs: [
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
            _buildPostsContainer(),
            Container(), // Placeholder for Comments
            Container(), // Placeholder for About
          ],
        ),
      ),
    ],
  );
}

    Widget _buildAlternateView() {
      return CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            pinned: true,
            backgroundColor: Colors.deepPurple,
            expandedHeight: 380,
            flexibleSpace: LayoutBuilder(
              builder: (context, constraints) {
                _showTitle = constraints.biggest.height <= 100;
                return FlexibleSpaceBar(
                  title: _myProfile && userData['userName']  != null && _showTitle
                      ? Text(
                          userName!,
                          style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
                        )
                      : null,
                  background: Container(
                    decoration: BoxDecoration(
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
                                  Padding(
                                    padding: const EdgeInsets.only(left: 240,),
                                      child: CircleAvatar(
                                        backgroundColor: Colors.transparent,
                                        radius: 50, // Increase the radius to increase the size of the CircleAvatar
                                        child: ElevatedButton(
                                          onPressed: () {},
                                          style: ElevatedButton.styleFrom(
                                            shape: CircleBorder(), // Make the ElevatedButton circular
                                          ),
                                          child: Image.asset(
                                            'assets/Icons/Chat.png',
                                            width: 32, // Set the width of the Image
                                            height: 32, // Set the height of the Image
                                          ),
                                        ),
                                      ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(),
                                      child: SizedBox(
                                        height: 35,
                                        child: ElevatedButton(
                                          onPressed: () {
                                          },
                                          child: Text('Follow'),
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 20),
                          child: Text(
                            '$userName',
                            style: TextStyle(
                              fontSize: 26,
                              color: Colors.grey[400],
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 20),
                          child: Text(
                            'u/$userName • 1 karma • ${_formatDate(userData['created_at'])}',
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
                  Share.share('https://www.reddit.com/user/${widget.user_Id}/');
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
              tabs: [
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
                _buildPostsContainer(),
                Container(), // Placeholder for Comments
                Container(), // Placeholder for About
              ],
            ),
          ),
        ],
      );
    }

    Widget _buildPostsContainer() {
      return ListView.builder(
        shrinkWrap: true,
        itemCount: userPosts.length,
        itemBuilder: (context, index) {
          final post = userPosts[index];
          return ListTile(
            title: Text(
              post['redditName'] ?? '',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              post['title'] ?? '',
              style: TextStyle(fontSize: 16),
            ),
            trailing: post['picture'] != null
                ? Image.network(
                    post['picture'],
                    width: 100,
                    height: 250,
                    fit: BoxFit.cover,
                  )
                : null,
          );
        },
      );
    }

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        body: postData.isEmpty
            ? Center(child: CircularProgressIndicator())
            : _myProfile
                ? _buildTitleView()
                : _buildAlternateView(),
        bottomNavigationBar: const nBar(),
      );
    }
  }
