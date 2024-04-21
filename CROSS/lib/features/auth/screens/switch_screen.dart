import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/models/user_model.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// A StatefulWidget that determines the authentication state and navigates accordingly.
class AuthContainer extends StatefulWidget {
  /// Constructor for the AuthContainer widget.
  const AuthContainer({
    super.key,
  });

  @override
  State<AuthContainer> createState() => _AuthContainerState();
}

/// The state for the AuthContainer widget.
class _AuthContainerState extends State<AuthContainer> {
  String? access_token; // Variable to store the access token

  @override
  void initState() {
    super.initState();
    // Retrieve token from shared preferences when the widget initializes
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken');
        print(access_token);
      });
    });
  }

  /// Retrieves user data from the server.
  void getData() async {
    if (access_token != null) {
      final url = ApiRoutesMockserver.getUserByToken(access_token!);
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
        );
        CurrentUserData.setUser(usermodel);
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

/// A class to store the current user's data.
class CurrentUserData {
  static UserModel? _user;

  /// Sets the current user's data.
  static void setUser(UserModel newUser) {
    _user = newUser;
  }

  /// Gets the current user's data.
  static UserModel getUser() {
    return _user!;
  }
}
