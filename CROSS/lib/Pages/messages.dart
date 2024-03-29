import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key});

  @override
  Widget build(BuildContext context) {
    return Message(title: 'Inbox');
  }
}

class Message extends StatefulWidget {
  const Message({Key? key, required this.title});

  final String title;

  @override
  State<Message> createState() => _MessageState();
}

class _MessageState extends State<Message> {
  void displayEndDrawer(BuildContext context) {
    Scaffold.of(context).openEndDrawer();
  }

  void displayDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }

  @override
  Widget build(BuildContext context) {
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        leading: IconButton(
          icon: Icon(Icons.menu),
          onPressed: () {
            displayDrawer(context);
          },
        ),
        actions: [
          IconButton(
            icon: CircleAvatar(),
            onPressed: () => displayEndDrawer(context),
          ),
        ],
        title: Text("Inbox"),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(user_width: userWidth),
      endDrawerEnableOpenDragGesture: true,
      drawerEnableOpenDragGesture: true,
      body: ListView(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              TextButton(
                onPressed: () {},
                child: Text("Activity"),
              ),
              TextButton(
                onPressed: () {},
                child: Text("Messages"),
              ),
            ],
          ),
          SizedBox(
            height: 75.0,
          ),
          Center(
            child: Column(
              children: [
                FaIcon(
                  FontAwesomeIcons.wolfPackBattalion,
                  color: Colors.white,
                  size: 150.0,
                ),
                Text("WOW, such empty"),
              ],
            ),
          ),
          // Add more widgets here if needed
        ],
      ),
    );
  }
}
