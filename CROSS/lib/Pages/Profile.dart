import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:typed_data';
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:share/share.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key, required this.user_Id}) : super(key: key);
  final int user_Id;

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late Map<String, dynamic> userData = {};

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    final response = await http.get(Uri.parse(ApiRoutes.getUserById(widget.user_Id)));
    if (response.statusCode == 200) {
      setState(() {
        userData = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load user data');
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: userData.isEmpty
          ? Center(child: CircularProgressIndicator())
          : CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            backgroundColor: Colors.transparent,
            expandedHeight: 280,
            flexibleSpace: FlexibleSpaceBar(
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
                            backgroundImage: _getImageProvider(userData['profilePic']),
                            backgroundColor: Colors.black,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 10, top: 10),
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
                      padding: const EdgeInsets.only(left: 20, top: 10),
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
                        '${userData['karma']} karma • ${userData['created_at']}',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey[400],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
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
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.business),
            label: 'Business',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'School',
          ),
        ],
        currentIndex: 0,
        selectedItemColor: Colors.amber[800],
        onTap: (_) {},
      ),

    );
  }
}
