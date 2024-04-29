import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/features/home/drawers/community_list_drawer.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppBarMessages extends StatefulWidget {
  AppBarMessages({
    Key? key,
  }) : super(key: key);

  @override
  _AppBarMessagesState createState() => _AppBarMessagesState();
  
}

class _AppBarMessagesState extends State<AppBarMessages> {

  String? access_token;
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
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            CommunityListDrawer(drawer_Width: drawerWidth),
            Text("Inbox"),
            endDrawer(user_width: userWidth, token: access_token,),
          ],
        ),
        Row(
          children: [
            TextButton(
              onPressed: () {
                //Messages()
              },
              child: Text('Activity'),
            ),
            TextButton(
              onPressed: () {
                //Activity()
              },
              child: Text('Messages'),
            ),
          ],
        )
      ],
    );
  }
}
