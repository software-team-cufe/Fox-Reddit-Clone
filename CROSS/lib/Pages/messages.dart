import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/Pages/inboxChat.dart';
import 'package:reddit_fox/Pages/notification_page.dart';
import 'package:reddit_fox/features/home/drawers/community_list_drawer.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/GeneralWidgets/dots.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Message();
  }
}

class Message extends StatefulWidget {
  const Message({super.key});
  static const route = '/message-screen';

  @override
  _MessageState createState() => _MessageState();
}

class _MessageState extends State<Message> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  String? access_token;
  late String? profilePic;
  late List<dynamic> messages = [];

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken');
      });
      fetchMessages();
    });
  }

  void fetchMessages() async {
    try {
      final response = await http.get(
        Uri.parse(ApiRoutesBackend.getinbox),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $access_token'
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = json.decode(response.body);

        setState(() {
          messages = data['messages'];
        });
        print('message fetched correctly ${response.statusCode}');
      } else {
        print('Failed to load messages ${response.statusCode}');
        // Return an empty list if the request fails
      }
    } catch (e) {
      print('Error fetching messages: $e');
      // Return an empty list if an exception occurs
    }
  }

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
    final message = ModalRoute.of(context)!.settings.arguments;
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.7;
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: Colors.black,
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            _scaffoldKey.currentState!.openDrawer();
          },
        ),
        actions: [
          WidgetButton(),
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
                            backgroundColor: Colors.transparent,
                            backgroundImage:
                                AssetImage('assets/images/avatar.png'),
                          );
                        } else {
                          // Check if profile picture URL is null or empty
                          if (snapshot.data == null ||
                              snapshot.data.toString().isEmpty) {
                            // Handle case where profile picture URL is empty or null
                            return const CircleAvatar(
                              backgroundColor: Colors.transparent,
                              backgroundImage:
                                  AssetImage('assets/images/avatar.png'),
                            );
                          } else {
                            // Display profile picture
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
                      backgroundImage: AssetImage('assets/images/avatar.png'),
                    ),
              onPressed: () {
                Scaffold.of(context).openEndDrawer();
              },
            );
          }),
        ],
        title: const Text("Inbox"),
      ),
      drawer: CommunityListDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(
        user_width: userWidth,
        token: access_token,
      ),
      bottomNavigationBar: nBar(),
      body: DefaultTabController(
        length: 2,
        child: Column(
          children: [
            TabBar(
              tabs: [
                Tab(text: 'Notification'),
                Tab(text: 'Messages'),
              ],
            ),
            Expanded(
              child: TabBarView(
                children: [
                  ///////////////////////////////////////////////
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(child: NotificationPage()),
                      ],
                    ),
                  ),
                  //////////////////////////////////////////////
                  messages.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              FaIcon(
                                FontAwesomeIcons.wolfPackBattalion,
                                size: 100,
                                color: Colors.white,
                              ),
                              SizedBox(height: 20),
                              Text(
                                'Wow Such empty',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          itemCount: messages.length,
                          itemBuilder: (context, index) {
                            var message = messages[index];
                            return ListTile(
                              contentPadding: EdgeInsets.all(5),
                              title: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    message['fromUsername'] ?? '',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15.0),
                                    child: Icon(Icons.arrow_forward),
                                  )
                                ],
                              ),
                              subtitle: Text(
                                message['subject'] ?? '',
                                style: TextStyle(fontSize: 16),
                              ),
                              onTap: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => inboxChat(
                                            username:
                                                message['fromUsername'])));
                              },
                            );
                          },
                        ),

                  // FutureBuilder and ListView.builder for messages
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
