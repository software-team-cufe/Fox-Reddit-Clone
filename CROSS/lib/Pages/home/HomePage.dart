import 'package:flutter/material.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/Pages/Search.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:reddit_fox/Pages/post_details.dart'; // Import the PostDetails page
import 'package:http/http.dart';

/// HomePage Widget displays a list of posts or videos based on user selection.
///
/// It contains a custom app bar with a menu for selecting between "Home" and "Popular" options,
/// a search icon for navigating to the search page, and an end drawer.
/// The end drawer contains user-related information and options.
///
/// The [HomePage] Widget utilizes dummy post data and video post data.
/// Posts are displayed in a list view, and videos are displayed using the YoutubePlayer plugin.
///
/// Users can interact with posts by tapping on them, which navigates them to the [PostDetails] page.
///
/// Requires:
///   - 'package:flutter/material.dart'
///   - 'package:reddit_fox/navbar.dart'
///   - 'package:reddit_fox/Pages/Search.dart'
///   - 'package:reddit_fox/Pages/home/Drawer.dart'
///   - 'package:reddit_fox/Pages/home/endDrawer.dart'
///   - 'package:youtube_player_flutter/youtube_player_flutter.dart'
///   - 'package:reddit_fox/Pages/post_details.dart'
///

class HomePage extends StatefulWidget {
  /// Creates a [HomePage] Widget.
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _selectedItem = "Home"; // Default selected item

  /// Opens the end drawer.
  void desplayEndDrawer(BuildContext context) {
    Scaffold.of(context).openEndDrawer();
  }

  /// Opens the main drawer.
  void desplayDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }

  @override
  void initState() {
    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.7;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        iconTheme: const IconThemeData(color: Colors.white),
        leading: Builder(builder: (context) {
          return IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              desplayDrawer(context);
            },
          );
        }),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Search()),
              );
            },
            icon: const Icon(Icons.search),
          ),
          Builder(builder: (context) {
            return IconButton(
              icon: const CircleAvatar(),
              onPressed: () => desplayEndDrawer(context),
            );
          }),
        ],
        title: PopupMenuButton<String>(
          icon: Text(_selectedItem),
          initialValue: _selectedItem,
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: "Home",
              child: Text("Home"),
            ),
            const PopupMenuItem(
              value: "Popular",
              child: Text("Popular"),
            ),
          ],
          onSelected: (value) {
            setState(() {
              _selectedItem = value;
            });
          },
        ),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(user_width: userWidth),
      bottomNavigationBar: const nBar(),
      endDrawerEnableOpenDragGesture: true,
      drawerEnableOpenDragGesture: true,
    );
  }
}
