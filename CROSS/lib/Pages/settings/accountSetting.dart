//accountsettings
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';
import 'package:reddit_fox/GeneralWidgets/switch.dart';
import 'package:reddit_fox/GeneralWidgets/validators.dart';
import 'package:reddit_fox/Pages/settings/Followers.dart';
import 'package:reddit_fox/Pages/settings/blockedAccounts.dart';
import 'package:reddit_fox/Pages/settings/chatPermission.dart';
import 'package:reddit_fox/Pages/settings/email.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
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
  String? mockToken;
  String? backToken;
  bool errorMessage = false;
  late Map<String, dynamic> user = {};
  late String? profilePic = null;
  late String? userName = '';
  late String? email = '';

  @override
  void initState() {
    super.initState();
    // Assign the userData from the widget to the local variable
    userData = widget.userData;

    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the accessToken variable
        mockToken = sharedPrefValue.getString('mocktoken');
        backToken = sharedPrefValue.getString('backtoken');
        fetchUser(backToken);
        print(backToken);
      });
    });
  }

  Future<void> fetchUser(String? accessToken) async {
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
            if (profilePic == 'default.jpg') {
              profilePic = null;
            }
            email = user['email'];

            userName = user['username'];
            print(' Username: $userName, ');
            print(user);
          });
        } else {
          throw Exception('User data is not present in the response');
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

  Future<void> changeEmail(String email, String password) async {
    // final Uri url = Uri.parse(ApiRoutes.getUserByToken("ahmedtoken"));
    // dynamic response = await http.get(url);

    try {
      final Map<String, dynamic> requestBody = {
        "newemail": email,
        "currentpassword": password
      };

      final response = await http.post(
        Uri.parse(ApiRoutesBackend.changeEmail),
        body: jsonEncode(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $backToken'
        },
      );
      print(response.statusCode);

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

  Future<void> changePassword(String newpassword, String oldpassword) async {
    // final Uri url = Uri.parse(ApiRoutes.getUserByToken("ahmedtoken"));
    // dynamic response = await http.get(url);

    try {
      final Map<String, dynamic> requestBody = {
        "currentpassword": oldpassword,
        "newpassword": newpassword,
        "newpasswordConfirmation": newpassword
      };
      final response = await http.post(
        Uri.parse(ApiRoutesBackend.changePassword),
        body: jsonEncode(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $backToken'
        },
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
                const Padding(
                  padding: EdgeInsets.all(15.0),
                  child: Text('Basic Setting'),
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
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
                            userName ?? "/Username",
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
                            final password = TextEditingController();
                            return AlertDialog(
                              backgroundColor:
                                  const Color.fromARGB(221, 0, 0, 0),
                              contentPadding: const EdgeInsets.all(4),
                              surfaceTintColor: Colors.black87,
                              title: const Text('Update Email Address'),
                              content: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Gap(20),
                                  CustomTextBox(
                                    hintText: "Enter your new email address...",
                                    controller: newEmail,
                                    isEmail: true,
                                    onChanged: (value) {
                                      // print(newEmail);
                                    },
                                  ),
                                  const Gap(30),
                                  CustomTextBox(
                                    hintText: "Enter your password",
                                    controller: password,
                                    isPassword: true,
                                    onChanged: (value) {},
                                  ),
                                  const Gap(15),
                                  if (errorMessage == true)
                                    const Text('please enter valid data'),
                                  const Gap(5),
                                ],
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                  child: const Text('Cancel'),
                                ),
                                TextButton(
                                  onPressed: () {
                                    if (emailvalidator(newEmail.text) == null) {
                                      changeEmail(newEmail.text, password.text);
                                      Navigator.of(context).pop();
                                    } else {
                                      setState(() {
                                        errorMessage = true;
                                      });
                                    }
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
                                email ?? '1111@fox.com',
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
                            return CHangePassswordDialog(
                                changePassword: changePassword);
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
                    const Padding(
                      padding: EdgeInsets.all(15.0),
                      child: Text('Connected Accounts'),
                    ),
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
                    const Padding(
                      padding: EdgeInsets.all(15.0),
                      child: Text('Safety'),
                    ),
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
                    const Padding(
                      padding: EdgeInsets.only(top: 15.0),
                      child: Text('privcy'),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(bottom: 15.0),
                      child: Text(
                        'Device take actions over the setting below',
                        style: TextStyle(fontWeight: FontWeight.w100),
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
                    const Padding(
                      padding: EdgeInsets.only(top: 15.0),
                      child: Text('sensitive advertising categoris'),
                    ),
                    const Padding(
                      padding: EdgeInsets.only(bottom: 15.0),
                      child: Text(
                        'You can limit ads about these topics',
                        style: TextStyle(fontWeight: FontWeight.w100),
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

class CHangePassswordDialog extends StatefulWidget {
  const CHangePassswordDialog({super.key, required this.changePassword});

  final Future<void> Function(String, String) changePassword;
  @override
  State<CHangePassswordDialog> createState() => _CHangePassswordDialogState();
}

class _CHangePassswordDialogState extends State<CHangePassswordDialog> {
  final newPassword = TextEditingController();
  final newPasswordConfirmation = TextEditingController();
  final oldPassword = TextEditingController();

  String? passwodDialogErrorMessage;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      surfaceTintColor: Colors.black87,
      backgroundColor: const Color.fromARGB(221, 0, 0, 0),
      title: const Text('Change password'),
      contentPadding: const EdgeInsets.all(3),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Gap(20),
          CustomTextBox(
            hintText: "Enter your old password",
            controller: oldPassword,
            isPassword: true,
            onChanged: (value) {},
          ),
          const Gap(20),
          CustomTextBox(
            hintText: "Enter your new password",
            controller: newPassword,
            isPassword: true,
            onChanged: (value) {},
          ),
          const Gap(20),
          CustomTextBox(
            hintText: "Confirm your password",
            controller: newPasswordConfirmation,
            isPassword: true,
            onChanged: (value) {},
          ),
          const Gap(15),
          if (passwodDialogErrorMessage != null)
            Text(passwodDialogErrorMessage!)
        ],
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
            if (newPassword.text == '' ||
                newPasswordConfirmation.text == '' ||
                oldPassword.text == '') {
              setState(() {
                passwodDialogErrorMessage = "please enter your data";
              });
            } else if (newPassword.text != newPasswordConfirmation.text) {
              setState(() {
                passwodDialogErrorMessage =
                    "confirm password does notmatch the new password";
              });
            } else {
              setState(() {
                passwodDialogErrorMessage = null;
              });
              widget.changePassword(newPassword.text, oldPassword.text);

              Navigator.of(context).pop();
            }
            print("######################");
            print(passwodDialogErrorMessage);
          },
          child: const Text('Update'),
        ),
      ],
    );
  }
}
