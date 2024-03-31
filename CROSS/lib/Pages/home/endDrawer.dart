import 'package:flutter/material.dart';

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

  /// Constructs an [endDrawer] with the given [user_width].
  const endDrawer({Key? key, required this.user_width}) : super(key: key);

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
                  onTap: () {},
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
              ],
            ),
          ),
        ),
      ],
    );
  }
}
