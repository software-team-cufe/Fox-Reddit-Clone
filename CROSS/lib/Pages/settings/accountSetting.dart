//accountsettings
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';
import 'package:reddit_fox/GeneralWidgets/switch.dart';
import 'package:reddit_fox/Pages/settings/Followers.dart';
import 'package:reddit_fox/Pages/settings/blockedAccounts.dart';
import 'package:reddit_fox/Pages/settings/chatPermission.dart';
import 'package:reddit_fox/Pages/settings/email.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class AccSetting extends StatefulWidget {
  final Map<String, dynamic> userData;

  const AccSetting({super.key, required this.userData});

  @override
  State<AccSetting> createState() => _AccSettingState();
}

class _AccSettingState extends State<AccSetting> {
  late Map<String, dynamic> userData;
  String? accessToken;

  @override
  void initState() {
    super.initState();
    // Assign the userData from the widget to the local variable
    userData = widget.userData;

    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the accessToken variable
        accessToken = sharedPrefValue.getString('mocktoken');
      });
    });
  }

  Future<void> changeEmail(String email) async {
    // final Uri url = Uri.parse(ApiRoutes.getUserByToken("ahmedtoken"));
    // dynamic response = await http.get(url);

    try {
      final Map<String, dynamic> requestBody = {'email': email};

      final response = await http.patch(
        Uri.parse(
            "https://json-server-k6zb.onrender.com/user/${userData["id"]}"),
        body: jsonEncode(requestBody),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        // Email update successful
        print('Email updated successfully!');
      } else {
        // Email update failed
        print('Failed to update email. Status code: ${response.statusCode}');
      }
    } catch (e) {
      // Exception occurred
      print('Exception: $e');
    }
  }

  Future<void> changePassword(String password) async {
    // final Uri url = Uri.parse(ApiRoutes.getUserByToken("ahmedtoken"));
    // dynamic response = await http.get(url);

    try {
      final Map<String, dynamic> requestBody = {'password': password};

      final response = await http.patch(
        Uri.parse(
            "https://json-server-k6zb.onrender.com/user/${userData["id"]}"),
        body: jsonEncode(requestBody),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        // Email update successful
        print('Email updated successfully!');
      } else {
        // Email update failed
        print('Failed to update email. Status code: ${response.statusCode}');
      }
    } catch (e) {
      // Exception occurred
      print('Exception: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Account Setting'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.only(top: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Basic Setting'),
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CircleAvatar(
                          child: Image.asset(
                            "assets/images/avatar.png",
                            width: 25,
                            height: 25,
                          ),
                        ),
                        Text(
                          userData["userName"] ?? "/Username",
                          style: const TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        TextButton(
                          onPressed: () {},
                          child: const Icon(
                            Icons.keyboard_arrow_down_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        )
                      ],
                    ),
                    const SizedBox(
                      height: 2,
                    ),

                    TextButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            final newEmail = TextEditingController();
                            return AlertDialog(
                              title: const Text('Update Email Address'),
                              content: TextField(
                                controller: newEmail,
                                decoration: const InputDecoration(
                                  hintText: 'Enter your new email address...',
                                ),
                                onChanged: (value) {
                                  changeEmail(newEmail.text);
                                },
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
                                    changeEmail(newEmail.text);

                                    Navigator.of(context).pop();
                                  },
                                  child: const Text('Update'),
                                ),
                              ],
                            );
                          },
                        );
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Icon(
                            Icons.settings,
                            size: 25,
                            color: Colors.white,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                "Update email Address",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                userData['email'] ?? '1111@fox.com',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w100,
                                ),
                              ),
                            ],
                          ),
                          const Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),

                    TextButton(
                      onPressed: () {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            final newPassword = TextEditingController();
                            return AlertDialog(
                              title: const Text('Change password'),
                              content: TextField(
                                controller: newPassword,
                                decoration: const InputDecoration(
                                  hintText: 'Enter your new password ',
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
                                    changePassword(newPassword.text);
                                    Navigator.of(context).pop();
                                  },
                                  child: const Text('Update'),
                                ),
                              ],
                            );
                          },
                        );
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            size: 25,
                            color: Colors.white,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Change password",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              // Text(
                              //   userData['email'] ?? '1111@fox.com',
                              //   style: const TextStyle(
                              //     color: Colors.white,
                              //     fontWeight: FontWeight.w100,
                              //   ),
                              // ),
                            ],
                          ),
                          Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),

                    // TextButton(
                    //   onPressed: () {},
                    //   child: const Row(
                    //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    //     children: [
                    //       Icon(
                    //         Icons.settings,
                    //         size: 25,
                    //         color: Colors.white,
                    //       ),
                    //       Column(
                    //         children: [
                    //           Text(
                    //             "Change password",
                    //             style: TextStyle(
                    //                 color: Colors.white,
                    //                 fontWeight: FontWeight.bold),
                    //           ),
                    //         ],
                    //       ),
                    //       Icon(
                    //         Icons.arrow_forward_rounded,
                    //         size: 25,
                    //         color: Colors.white,
                    //       ),
                    //     ],
                    //   ),
                    // ),

                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    const NotificationSettting()));
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.phonelink_ring_sharp,
                            size: 25,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                "Manage notification",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const EmailsSetting()));
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.email_outlined,
                            size: 25,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                "Manage emails",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          Icon(
                            Icons.arrow_forward_rounded,
                            size: 25,
                            color: Colors.white,
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
                            Icons.man_outlined,
                            size: 25,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                "gender",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          DropdownWidget(items: ['Man', 'female'])
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.location_on,
                            size: 15,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                "location customization",
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                              Text(
                                'Use approximate location(based on IP)',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w100,
                                ),
                              ),
                              Text(
                                'Specfiy a location ',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w100,
                                ),
                              ),
                              Text(
                                'to customize Your recommendations and feed',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w100,
                                ),
                              ),
                            ],
                          ),
                          Icon(
                            Icons.arrow_forward_rounded,
                            size: 15,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Connected Accounts'),
                    Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const FaIcon(
                            FontAwesomeIcons.google,
                            size: 50,
                          ),
                          const Text('Google'),
                          Text(
                            'Disconnect',
                            style: TextStyle(
                              color: Colors.blue[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const FaIcon(
                            FontAwesomeIcons.apple,
                            size: 50,
                          ),
                          const Text('apple'),
                          Text(
                            'connect',
                            style: TextStyle(
                              color: Colors.blue[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Safety'),
                    TextButton(
                      onPressed: () {
                        Get.to(const BlockedAccounts());
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.block_flipped,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Manage Blocked accounts',
                            style: TextStyle(color: Colors.white),
                          ),
                          Icon(
                            Icons.arrow_forward,
                            size: 25,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Get.to(const FollowersPage());
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.person_add_alt_1_sharp,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'View Followers',
                            style: TextStyle(color: Colors.white),
                          ),
                          Icon(
                            Icons.arrow_forward,
                            size: 25,
                            color: Colors.white,
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
                            Icons.macro_off_outlined,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Manage muted communities',
                            style: TextStyle(color: Colors.white),
                          ),
                          Icon(
                            Icons.arrow_forward,
                            size: 25,
                            color: Colors.white,
                          ),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const permissionChat()),
                        );
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.email_outlined,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'chat and messages permissions',
                            style: TextStyle(color: Colors.white),
                          ),
                          Icon(
                            Icons.arrow_forward,
                            size: 25,
                            color: Colors.white,
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
                            Icons.man,
                            color: Colors.white,
                            size: 25,
                          ),
                          Column(
                            children: [
                              Text(
                                'Allow people to follow you',
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                              Text('(followers will notifed about your posts)',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w100,
                                  )),
                            ],
                          ),
                          SwitchWidget()
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.block_flipped,
                            color: Colors.white,
                            size: 25,
                          ),
                          Text(
                            'Show your followers Count',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget()
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('privcy'),
                    const Text(
                      'Device take actions over the setting below',
                      style: TextStyle(fontWeight: FontWeight.w100),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Enable home feed Recommendations',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Show up in search engine',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                'Personalize ads on Fox based on ',
                                style: TextStyle(color: Colors.white),
                              ),
                              Text(
                                'information and activity',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('sensitive advertising categoris'),
                    const Text(
                      'You can limit ads about these topics',
                      style: TextStyle(fontWeight: FontWeight.w100),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Alcohol',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Dating',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Gaming',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'Pregnancy and parenting',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                    TextButton(
                      onPressed: () {},
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Icon(
                            Icons.settings,
                            color: Colors.white,
                          ),
                          Text(
                            'weight loss',
                            style: TextStyle(color: Colors.white),
                          ),
                          SwitchWidget(),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
