import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/core/common/customContainer.dart';
import 'package:reddit_fox/navbar.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const ChatScreen(title: 'Chat');
  }
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key, required this.title});

  final String title;

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;

    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
            _scaffoldKey.currentState!.openDrawer();
          },
        ),
        actions: [
          IconButton(
            icon: const CircleAvatar(),
            onPressed: () {
              _scaffoldKey.currentState!.openEndDrawer();
            },
          ),
        ],
        title: const Text("Chat"),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(user_width: userWidth),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Discover channels"),
                TextButton(
                    onPressed: () {},
                    child: const Text(
                      "View more",
                      style: TextStyle(color: Colors.white),
                    ))
              ],
            ),
          ),
          SizedBox(
            height: 100,
            child: ListView(
              padding: const EdgeInsets.all(9),
              scrollDirection: Axis.horizontal,
              children: const [
                CustomContainer(
                  mainText: 'valroant',
                  subText: 'r/valorant channels',
                ),
                CustomContainer(
                  mainText: 'league of legends',
                  subText: 'r/EGY LOL',
                ),
              ],
            ),
          ),
          const Divider(color: Colors.grey),
          ListTile(
            leading: const Icon(Icons.arrow_downward_outlined),
            title: const Text('Threads'),
            onTap: () {},
            trailing: const Icon(Icons.arrow_forward_ios_sharp),
          ),
          ListTile(
            leading: const Icon(Icons.person_add_alt),
            title: const Text('Requests'),
            onTap: () {},
            trailing: const Icon(Icons.arrow_forward_ios_sharp),
          ),
          SizedBox(
            height: 100,
            width: 100,
            child: Image.asset('assets/images/community.png'),
          ),
          const SizedBox(
            height: 15,
          ),
          const Text(
            "Welcom to Chat",
            style: TextStyle(fontWeight: FontWeight.w700, fontSize: 25),
          ),
          const SizedBox(
            height: 15,
          ),
          const Text("Chat with other Foxers about your favorite topic"),
        ],
      ),
      bottomNavigationBar: const nBar(),
      endDrawerEnableOpenDragGesture: true,
      drawerEnableOpenDragGesture: true,
    );
  }
}
