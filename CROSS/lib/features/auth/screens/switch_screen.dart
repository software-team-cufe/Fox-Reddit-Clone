import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/models/user_model.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/models/user_model.dart';

class AuthContainer extends StatefulWidget {
  const AuthContainer({
    super.key,
  });

  @override
  State<AuthContainer> createState() => _AuthContainerState();
}

class _AuthContainerState extends State<AuthContainer> {
  String? access_token; // Variable to store the access token

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable

        // saveToken('jessicatoken');
        // sharedPrefValue.remove('token');

        access_token = sharedPrefValue.getString('token');

        print(access_token);
      });
    });
  }

  getData() async {
    if (access_token != null) {
      final url = ApiRoutes.getUserByToken(access_token!);
      // final response = await http.get(Uri.parse(url));
      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        final user = data[0];

        UserModel usermodel = UserModel(
            email: user['email'],
            name: user['name'],
            profilePic: user['profilePic'],
            uid: user['id'],
            karma: user['karma'],
            isAuthenticated: false,
            banner: '');
        CurrentUserData.setUser(usermodel);

        // user.name=response.body.['name'];
      } else {
        print('invalid login');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (access_token == null) {
      return const StartingScreen();
    } else {
      return const HomePage();
    }
  }
}

class CurrentUserData {
  static UserModel? _user;
  static String? access_token;
  // static UserModel? get user => _user;
  void initState() {
    // Retrieve token from shared preferences when the widget initializes

    SharedPreferences.getInstance().then((sharedPrefValue) {
      // Store the token in the access_token variable
      // access_token = sharedPrefValue.getString('token');
      access_token = sharedPrefValue.getString('token');
    });
  }

  static void setUser(UserModel newUser) {
    _user = newUser;
  }

  static UserModel getUser() {
    return _user!;
  }
}
