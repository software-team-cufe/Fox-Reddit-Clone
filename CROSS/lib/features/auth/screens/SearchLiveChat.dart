import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';

class SearchLiveChat extends StatefulWidget {
  const SearchLiveChat({super.key});

  @override
  State<SearchLiveChat> createState() => _SearchLiveChatState();
}

class _SearchLiveChatState extends State<SearchLiveChat> {
  String? accessToken;
  late String? profilePic;
  late String userName;
  late List<dynamic> users = [];

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        accessToken = sharedPrefValue.getString('backtoken');
      });
    });
  }

  void fetchUser(String userName) async {
    try {
      final response = await http.get(
        Uri.parse(ApiRoutesBackend.getUserForChat(userName)),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $accessToken'
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final List<dynamic> data = json.decode(response.body)['users'];
        setState(() {
          users = data;
        });
        print('users fetched correctly ${response.statusCode}');
      } else {
        print('Failed to load users ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching users: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Search',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(20.0),
                    borderSide: BorderSide.none,
                  ),
                  prefixIcon: Icon(Icons.search),
                  filled: true,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16.0),
                ),
                onChanged: (value) {
                  fetchUser(value);
                },
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: users.length,
                itemBuilder: (BuildContext context, int index) {
                  String? avatar = users[index]['avatar'];
                  Widget leadingWidget;
                  if (avatar != 'default.jpg') {
                    leadingWidget = CircleAvatar(
                      backgroundImage: NetworkImage(avatar!),
                    );
                  } else {
                    leadingWidget = CircleAvatar(
                        backgroundImage:
                            AssetImage('assets/images/avatar.png'));
                  }
                  return ListTile(
                    leading: leadingWidget,
                    title: Text(users[index]['username']),
                    subtitle: Text('${users[index]['karma'].toString()} Karma'),
                    onTap: () {
                      // Navigator.push(
                      //   context,
                      //   MaterialPageRoute(
                      //     builder: (context) => ChatScreen(
                      //       title: users[index]['username'],
                      //     ),
                      //   ),
                      // );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
