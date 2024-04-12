import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/GeneralWidgets/dots.dart';

class Message extends StatefulWidget {
  const Message({Key? key}) : super(key: key);

  @override
  _MessageState createState() => _MessageState();
}

class _MessageState extends State<Message> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  Future<List<dynamic>> fetchMessages() async {
    var url = Uri.parse(ApiRoutes.message); // Endpoint to fetch messages
    var response = await http.get(url);
    print(response.statusCode);
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load messages');
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
          WidgetButton(),
          IconButton(
            icon: const CircleAvatar(),
            onPressed: () {
              _scaffoldKey.currentState!.openEndDrawer();
            },
          ),
        ],
        title: const Text("Inbox"),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(
        user_width: userWidth,
        user_Id: 1,
      ),
      body: DefaultTabController(
        length: 2,
        child: Column(
          children: [
            TabBar(
              tabs: [
                Tab(text: 'Activity'),
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
                        FaIcon(FontAwesomeIcons.wolfPackBattalion, size: 100, color: Colors.white),
                        SizedBox(height: 20),
                        Text(
                          'This is the second tab',
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
                          child: Text(
                              'Error: ${snapshot.error}'), // Show an error message if loading fails
                        );
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
