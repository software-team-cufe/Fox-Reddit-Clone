import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/settings/setting.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:reddit_fox/Pages/Profile.dart';

/// Widget representing an end drawer.
///
/// The [endDrawer] widget displays a drawer that slides in from the right side of the screen.
/// It typically contains user-related information and options.
///
/// Requires:
///   - 'package:flutter/material.dart'
///
/// Example:
/// ```dart
/// endDrawer(user_width: userWidth),
/// ```
class endDrawer extends StatelessWidget {
  /// Width of the end drawer.
  final double user_width;
  final int user_Id;

  /// Constructs an [endDrawer] with the given [user_width].
  const endDrawer({Key? key, required this.user_width, required this.user_Id}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: 0,
          bottom: 0,
          right: 0,
          width: user_width,
          child: Drawer(
            backgroundColor: Colors.black,
            child: ListView(
              children: [
                Image.asset(
                  "assets/images/avatar.png",
                  width: 250,
                  height: 250,
                ),
                ListTile(
                  leading: const Icon(Icons.person_outlined),
                  title: const Text('My profile'),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ProfilePage(user_Id: user_Id)),
                    );
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.add_circle_outline_sharp),
                  title: const Text('Create community'),
                  onTap: () {},
                ),
                ListTile(
                  leading: const Icon(Icons.access_time),
                  title: const Text('History'),
                  onTap: () {},
                ),
                ListTile(
                  leading: const Icon(Icons.settings),
                  title: const Text('Setting'),
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const setting()));
                  }
                ),
                ListTile(
                  leading: const Icon(Icons.settings),
                  title: const Text('logout'),
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const setting()));
                  }
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}