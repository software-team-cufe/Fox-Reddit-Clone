import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
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

  @override
  _MessageState createState() => _MessageState();
}

class _MessageState extends State<Message> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  String? access_token;
  late String? profilePic;

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('mocktoken');
      });
    });
  }



  Future<List<dynamic>> fetchMessages() async {
    var url =
        Uri.parse(ApiRoutesMockserver.message); // Endpoint to fetch messages
    var response = await http.get(url);
    print(response.statusCode);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load messages');
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
      drawer: CustomDrawer(
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
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        FaIcon(FontAwesomeIcons.wolfPackBattalion,
                            size: 100, color: Colors.white),
                        SizedBox(height: 20),
                        Text(
                          'Wow Such empty',
                          style: TextStyle(
                              fontSize: 24, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                  FutureBuilder<List<dynamic>>(
                    future: fetchMessages(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return Center(
                          child:
                              CircularProgressIndicator(), // Show a loading indicator
                        );
                      } else if (snapshot.hasError) {
                        return Center(
                            child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            FaIcon(FontAwesomeIcons.wolfPackBattalion,
                                size: 100, color: Colors.white),
                            SizedBox(height: 20),
                            Text(
                              'Wow Such empty',
                              style: TextStyle(
                                  fontSize: 24, fontWeight: FontWeight.bold),
                            ),
                            Text('Error: ${snapshot.error}'),
                          ],
                          // Show an error message if loading fails
                        ));
                      } else {
                        List<dynamic> messages = snapshot.data!;
                        return ListView.builder(
                          itemCount: messages.length,
                          itemBuilder: (context, index) {
                            var message = messages[index];
                            return ListTile(
                              contentPadding: EdgeInsets.all(
                                  16), // Add padding around the content
                              title: Text(
                                message['subject'] ??
                                    '', // Add null safety check
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight:
                                        FontWeight.bold), // Increase font size
                              ),
                              subtitle: Text(
                                message['content'] ??
                                    '', // Add null safety check
                                style: TextStyle(
                                    fontSize: 16), // Increase font size
                              ),
                              onTap: () {
                                // Navigate to message details or perform other actions
                              },
                            );
                          },
                        );
                      }
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

    // Scaffold(
  //     backgroundColor: Colors.black,
  //     appBar: AppBar(
  //       backgroundColor: Colors.black,
  //       iconTheme: const IconThemeData(color: Colors.white),
  //       title: const Text('inbox'),
  //       actions: [WidgetButton(),],
  //     ),
  //     endDrawer: endDrawer(
  //       user_width: userWidth,
  //       user_Id: 1,
  //     ),
  //     drawer: CustomDrawer(
  //       drawer_Width: drawerWidth,
  //     ),
  //     bottomNavigationBar: nBar(),
  //     body: DefaultTabController(
  //       length: 2,
  //       child: Column(
  //         children: [
  //           TabBar(
  //             tabs: [
  //               Tab(text: 'Activity'),
  //               Tab(text: 'Messages'),
  //             ],
  //           ),
  //           Expanded(
  //             child: TabBarView(
  //               children: [
  //                 Center(
  //                   child: Column(
  //                     mainAxisAlignment: MainAxisAlignment.center,
  //                     children: [
  //                       Icon(Icons.star, size: 100, color: Colors.yellow),
  //                       SizedBox(height: 20),
  //                       Text(
  //                         'This is the second tab',
  //                         style: TextStyle(
  //                             fontSize: 24, fontWeight: FontWeight.bold),
  //                       ),
  //                     ],
  //                   ),
  //                 ),

  //                 FutureBuilder<List<dynamic>>(
  //                   future: fetchMessages(),
  //                   builder: (context, snapshot) {
  //                     if (snapshot.connectionState == ConnectionState.waiting) {
  //                       return Center(
  //                         child:
  //                             CircularProgressIndicator(), // Show a loading indicator
  //                       );
  //                     } else if (snapshot.hasError) {
  //                       return Center(
  //                         child: Text(
  //                             'Error: ${snapshot.error}'), // Show an error message if loading fails
  //                       );
  //                     } else {
  //                       List<dynamic> messages = snapshot.data!;
  //                       return ListView.builder(
  //                         itemCount: messages.length,
  //                         itemBuilder: (context, index) {
  //                           var message = messages[index];
  //                           return ListTile(
  //                             contentPadding: EdgeInsets.all(
  //                                 16), // Add padding around the content
  //                             title: Text(
  //                               message['subject'] ??
  //                                   '', // Add null safety check
  //                               style: TextStyle(
  //                                   fontSize: 18,
  //                                   fontWeight:
  //                                       FontWeight.bold), // Increase font size
  //                             ),
  //                             subtitle: Text(
  //                               message['content'] ??
  //                                   '', // Add null safety check
  //                               style: TextStyle(
  //                                   fontSize: 16), // Increase font size
  //                             ),
  //                             onTap: () {
  //                               // Navigate to message details or perform other actions
  //                             },
  //                           );
  //                         },
  //                       );
  //                     }
  //                   },
  //                 ),
  //                 // Tab 2: Icon and Text
  //               ],
  //             ),
  //           ),
  //         ],
  //       ),
  //     ),
  //   );
  // }
  // }
