import 'package:flutter/material.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthContainer extends StatefulWidget {
  const AuthContainer({Key? key});

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
        access_token = sharedPrefValue.getString('token');
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if(access_token == null){
      return const StartingScreen();
    }
    else {
      return const HomePage();
    }
  }
}


