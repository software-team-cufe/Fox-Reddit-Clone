import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:typed_data';
import 'package:intl/intl.dart';
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:share/share.dart';

class ProfilePage extends StatefulWidget {
  ProfilePage({Key? key, required this.user_Id}) : super(key: key);
  final String user_Id;

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage>
    with SingleTickerProviderStateMixin {
  late Map<String, dynamic> userData = {};
  late TabController _tabController;
  bool _showTitle = true;
  late List<Map<String, dynamic>> userPosts = [];

  @override
  void initState() {
    super.initState();
    fetchData();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> fetchData() async {
    try {
      final response = await http
          .get(Uri.parse(ApiRoutesBackend.getUserById(widget.user_Id)));
      if (response.statusCode == 200) {
        setState(() {
          userData = json.decode(response.body);
          print('fetching user data');
        });
      } else {
        throw Exception('Failed to load user data');
      }

      final postResponse = await http.get(
          Uri.parse(ApiRoutesBackend.getPostsByCreatorId(widget.user_Id)));
      if (postResponse.statusCode == 200) {
        setState(() {
          userPosts =
              json.decode(postResponse.body).cast<Map<String, dynamic>>();
          print('fetching user posts');
        });
      } else {
        throw Exception('Failed to load user posts');
      }
    } catch (error) {
      print(error.toString());
      // Handle error, show error message, retry logic, etc.
    }
  }

  ImageProvider<Object> _getImageProvider(dynamic picture) {
    if (picture is String) {
      return NetworkImage(picture);
    } else if (picture is Uint8List) {
      return MemoryImage(picture);
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: userData.isEmpty
          ? Center(child: CircularProgressIndicator())
          : CustomScrollView(
              slivers: <Widget>[
                SliverAppBar(
                  pinned: true,
                  backgroundColor: Colors.deepPurple,
                  expandedHeight: 280,
                  flexibleSpace: LayoutBuilder(
                    builder: (context, constraints) {
                      _showTitle = constraints.biggest.height <= 100;
                      return FlexibleSpaceBar(
                        title: _showTitle
                            ? Text(
                                userData['userName'],
                                style: TextStyle(fontSize: 20),
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
                                padding:
                                    const EdgeInsets.only(top: 80, left: 10),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    CircleAvatar(
                                      radius: 50,
                                      backgroundImage: _getImageProvider(
                                          userData['profilePic']),
                                      backgroundColor: Colors.black,
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.only(
                                          left: 10, top: 10),
                                      child: SizedBox(
                                        height: 35,
                                        child: ElevatedButton(
                                          onPressed: () {
                                            // Add functionality for the button
                                          },
                                          child: Text('Edit Profile'),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding:
                                    const EdgeInsets.only(left: 20, top: 10),
                                child: Text(
                                  userData['userName'],
                                  style: TextStyle(
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 20),
                                child: Text(
                                  '${userData['karma']} karma • ${_formatDate(userData['created_at'])}',
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
                          MaterialPageRoute(
                              builder: (context) => const Search()),
                        );
                      },
                      icon: const Icon(Icons.search),
                    ),
                    IconButton(
                      onPressed: () {
                        Share.share(
                            'https://www.reddit.com/user/${widget.user_Id}/');
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
                      Container(),
                      Container(),
                    ],
                  ),
                ),
              ],
            ),
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
}
