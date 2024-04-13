import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Blanck.dart';
import 'package:reddit_fox/features/community/screens/mod_tools_screen.dart';
import 'package:reddit_fox/features/community/screens/modmail.dart';
/// Widget representing a custom drawer.
///
/// The [CustomDrawer] widget displays a drawer that slides in from the left side of the screen.
/// It typically contains navigation options or other actions.
///
/// Requires:
///   - 'package:flutter/material.dart'
///   - 'package:reddit_fox/Pages/Blanck.dart'
///
/// Example:
/// ```dart
/// CustomDrawer(drawer_Width: drawerWidth),
/// ```
class CustomDrawer extends StatelessWidget {
  /// Width of the custom drawer.
  final double drawer_Width;

  /// Constructs a [CustomDrawer] with the given [drawer_Width].
  const CustomDrawer({super.key, required this.drawer_Width});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: 0,
          bottom: 0,
          left: 0,
          width: drawer_Width,
          child: Drawer(
            width: drawer_Width,
            backgroundColor: Colors.black,
            child: ListView(
              children: [
                ListTile(
                  leading: const Icon(Icons.add, color: Colors.white),
                  title: const Text(
                    "Create Community",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const BlankPage()),
                    );
                  },
                ),
                const SizedBox(height: 10), // Add some space between items
                // Moderating section
                ListTile(
                  leading: const Icon(Icons.star, color: Colors.white),
                  title: const Text(
                    "Mod Feed",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    // Navigate to Mod Feed page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.list, color: Colors.white),
                  title: const Text(
                    "Queues",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    // Navigate to Queues page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.mail, color: Colors.white),
                  title: const Text(
                    "Modmail",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              ModMailScreen()), 
                    );
                  },
                ),

                const Divider(color: Colors.white), // Add a divider
                ListTile(
                  title: const Text(
                    "Mod Tools", // Add "Mod Tools" section
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ModToolsScreen(
                                name: '',
                              )),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
