import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Blanck.dart';

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
  const CustomDrawer({Key? key, required this.drawer_Width}) : super(key: key);

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
                  leading: Icon(Icons.add, color: Colors.white), 
                  title: Text(
                    "Create Community",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.push(context,
                  MaterialPageRoute(builder: (context) => BlankPage()));
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
