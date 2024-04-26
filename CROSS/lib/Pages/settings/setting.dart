import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:reddit_fox/GeneralWidgets/switch.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/features/auth/screens/switch_screen.dart';
import 'package:reddit_fox/models/user_model.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/Pages/settings/accountSetting.dart';

import 'package:http/http.dart' as http;

// Define a StatefulWidget named 'setting'
class setting extends StatefulWidget {
  const setting({Key? key}) : super(key: key);

  @override
  State<setting> createState() => _settingState();
}

// Define the State class for 'setting'
class _settingState extends State<setting> {
  // Declare variables
  late Map<String, dynamic> userData = {};
  Map<String, dynamic>? userPrefs;
  Map<String, dynamic>? prefData;

  String? backtoken;
  String? mocktoken;

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        backtoken = sharedPrefValue.getString('backtoken');
        mocktoken = sharedPrefValue.getString('mocktoken');
        getData(mocktoken);
        fetchData();
      });
    });
  }

  // Function to log out
  logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    Get.off(() => const StartingScreen());

    prefs.remove('backtoken');
  }

  // Function to delete account
  deleteAcc() async {
    final Uri url = Uri.parse(ApiRoutesBackend.delelteUser);
    dynamic response = await http.get(url);

    try {
      response = await http.delete(
        Uri.parse(ApiRoutesBackend.delelteUser),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $backtoken'
        },
      );

      if (response.statusCode == 200) {
        // Account deletion successful
        print('Deleted successfully!');
        logout();
      } else {
        // Account deletion failed
        print('Failed to update email. Status code: ${response.statusCode}');
      }
    } catch (e) {
      // Exception occurred
      print('Exception: $e');
    }
  }

  // Function to get user data
  getData(token) async {
    if (token != null) {
      final url = ApiRoutesMockserver.getUserByToken(token);
      final response = await http.get(Uri.parse(url));
      print(response.statusCode);
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        setState(() {
          userData = data[0];
        });
      } else {
        print('invalid login');
      }
    }
  }

  // Function to fetch user preferences
  Future<void> fetchData() async {
    final response = await http.get(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/prefs'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $backtoken'
      },
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      setState(() {
        userPrefs = json.decode(response.body)['userPrefs'];
      });
      print(userPrefs);
    } else {
      throw Exception('Failed to load user preferences ${response.statusCode}');
    }
  }

  // Function to update user preferences
  Future<void> userPref(String language) async {
    Map<String, dynamic> prefData = {
      "language": language,
    };

    final response = await http.patch(
      Uri.parse(
          'http://foxnew.southafricanorth.cloudapp.azure.com/api/v1/me/prefs'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $backtoken'
      },
      body: jsonEncode(prefData),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      print('Preferences updated successfully');
      // Optionally update local state if needed
    } else {
      print('Error updating preferences: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                // Account Settings
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("ACCOUNT SETTINGS"),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      AccSetting(userData: userData)));
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            CircleAvatar(
                              child: Image.asset(
                                "assets/images/avatar.png",
                                width: 15,
                                height: 15,
                              ),
                            ),
                            Text(
                              userData["userName"] ?? 'user.name',
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const Icon(
                              Icons.arrow_right_alt_sharp,
                              size: 25,
                              color: Colors.white,
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                // Fox Premium and other options
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Fox Premium"),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(
                              Icons.security,
                              size: 25,
                              color: Colors.white,
                            ),
                            Text(
                              "Get Premium",
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            Icon(
                              Icons.arrow_right_alt_sharp,
                              size: 25,
                              color: Colors.white,
                            )
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.wolfPackBattalion,
                              size: 25,
                              color: Colors.white,
                            ),
                            Text(
                              "change app icon ",
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            Icon(
                              Icons.arrow_right_alt_sharp,
                              size: 25,
                              color: Colors.white,
                            )
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.shirt,
                              size: 25,
                              color: Colors.white,
                            ),
                            Text(
                              "Style Avatar",
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            Icon(
                              Icons.arrow_right_alt_sharp,
                              size: 25,
                              color: Colors.white,
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                // Feed Options
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('FEED OPTIONS'),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            width: 30,
                            height: 30,
                            decoration: BoxDecoration(
                              color: Colors.black,
                              borderRadius: BorderRadius.circular(
                                  100), // Adjust the radius as per your preference
                            ),
                            child: const Image(
                                image: AssetImage('assets/images/banana.png')),
                          ),
                          const Text(
                            'banana feed',
                            style: TextStyle(color: Colors.white),
                          ),
                          const SwitchWidget(),
                        ],
                      ),
                    ],
                  ),
                ),
                // Language Setting
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Language'),
                      Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Icon(Icons.translate_outlined),
                              TextButton(
                                  onPressed: () {
                                    showDialog(
                                        context: context,
                                        builder: (BuildContext context) {
                                          final lan = TextEditingController();
                                          return AlertDialog(
                                            title:
                                                const Text('Change password'),
                                            content: TextField(
                                              controller: lan,
                                              decoration: const InputDecoration(
                                                hintText:
                                                    'Enter your language (en or ar)',
                                              ),
                                              onChanged: (value) {},
                                            ),
                                            actions: <Widget>[
                                              TextButton(
                                                onPressed: () {
                                                  Navigator.of(context).pop();
                                                },
                                                child: const Text('Cancel'),
                                              ),
                                              TextButton(
                                                onPressed: () {
                                                  userPref(lan.text);
                                                  Navigator.of(context).pop();
                                                },
                                                child: const Text('Update'),
                                              ),
                                            ],
                                          );
                                        });
                                  },
                                  child: const Text(
                                    'Language',
                                    style: TextStyle(color: Colors.white),
                                  )),
                              const Icon(
                                Icons.arrow_right_alt_sharp,
                                size: 25,
                              )
                            ],
                          )
                        ],
                      ),
                    ],
                  ),
                ),
                // View Options
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('View Option'),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.tableList,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Defult view',
                              style: TextStyle(color: Colors.white),
                            ),
                            DropdownWidget(
                              items: ['Card', 'Classic'],
                            ),
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.play,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Auto Play',
                              style: TextStyle(color: Colors.white),
                            ),
                            DropdownWidget(
                              items: ['Always', 'On Wi-Fi', 'Never'],
                            ),
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.image,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Defult view',
                              style: TextStyle(color: Colors.white),
                            ),
                            DropdownWidget(
                              items: [
                                'Community Defult',
                                'Always Show',
                                'Never Show'
                              ],
                            ),
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(
                              Icons.text_fields_sharp,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Text Size',
                              style: TextStyle(color: Colors.white),
                            ),
                            Icon(
                              Icons.arrow_right_alt_sharp,
                              size: 25,
                              color: Colors.white,
                            )
                          ],
                        ),
                      ),
                      // Reduce Animations
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Icon(
                              Icons.remove_red_eye,
                              size: 25,
                              color: Colors.white,
                            ),
                            Text(
                              "reduce Animations",
                              style: TextStyle(color: Colors.white),
                            ),
                            SwitchWidget(),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                // Dark Mode
                const Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Dark mode'),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "Automatic(Follow setting)",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ],
                  ),
                ),
                // Advanced Settings
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Advanced'),
                      // Swipe to Collapse Comments
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.keyboard_double_arrow_up,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "Swipe to collapse comments",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                      // Saved Image Attribution
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.image,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "Saved image attribution",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                      // Mute Videos by Default
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.videocam_off_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "mute videos by default",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                      // Comment Jump Button
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.keyboard_arrow_down,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "comment jump button",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                      // Recent Communities
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.more_time_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                          Text(
                            "Recent Communities",
                            style: TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                      // Default Comment Sort
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.message,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Defult comment sort',
                          ),
                          DropdownWidget(
                            items: [
                              'best',
                              'new',
                              'top',
                              'Q&A',
                              'Controversial'
                            ],
                          ),
                        ],
                      ),
                      // Open Links
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.compass,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Open links',
                          ),
                          DropdownWidget(
                            items: ['in app', 'defualt broswer'],
                          ),
                        ],
                      ),
                      // Clear Local History
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.trash,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Clear Local history ',
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                      // Retry Pending Purchases
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            FaIcon(
                              FontAwesomeIcons.repeat,
                              color: Colors.white,
                              size: 25,
                            ),
                            Text(
                              'Retry Pending Purchases',
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                // About Section
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('About'),
                      // Content Policy
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.text_snippet_rounded,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'Content Policy',
                              style: TextStyle(color: Colors.white),
                            )
                          ],
                        ),
                      ),
                      // Privacy Policy
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.vpn_key,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'Privcy Policy',
                              style: TextStyle(color: Colors.white),
                            )
                          ],
                        ),
                      ),
                      // User Agreement
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.supervised_user_circle_outlined,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'User agreement ',
                              style: TextStyle(color: Colors.white),
                            )
                          ],
                        ),
                      ),
                      // Acknowledgements
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.text_snippet_rounded,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'Acknowledgements',
                              style: TextStyle(color: Colors.white),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                // Support Section
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Support'),
                      // Help Center
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.question_mark_outlined,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'Help Center',
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                      // Visit r/bugs
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.reddit_rounded,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'visit r/bugs',
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                      // Report an Issue
                      TextButton(
                        onPressed: () {},
                        child: const Row(
                          children: [
                            Icon(
                              Icons.email_outlined,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'Report an issue',
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                      // Delete Account
                      TextButton(
                        onPressed: () {
                          showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text(
                                    'Delete your  account?',
                                    style: TextStyle(fontSize: 20),
                                  ),
                                  content:
                                      const Text("All your data will be lost"),
                                  actions: [
                                    TextButton(
                                        onPressed: () {
                                          deleteAcc();
                                        },
                                        child: const Text("Delete"))
                                  ],
                                );
                              });
                        },
                        child: const Row(
                          children: [
                            Icon(
                              Icons.handshake_outlined,
                              color: Colors.white,
                            ),
                            SizedBox(
                              width: 15,
                            ),
                            Text(
                              'delete account',
                              style: TextStyle(color: Colors.red),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
