import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';

class AppBarMessages extends StatefulWidget {
  AppBarMessages({
    Key? key,
  }) : super(key: key);

  @override
  _AppBarMessagesState createState() => _AppBarMessagesState();
}

class _AppBarMessagesState extends State<AppBarMessages> {
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
            CustomDrawer(drawer_Width: drawerWidth),
            Text("Inbox"),
            endDrawer(user_width: userWidth),
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
