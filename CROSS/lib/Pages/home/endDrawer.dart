import 'package:flutter/material.dart';

class endDrawer extends StatelessWidget {
  final double user_width; // Define a parameter to hold drawerWidth
  const endDrawer({Key? key, required this.user_width});
  

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: 0,
          bottom: 0,
          right: 0,
          width:user_width,
          child: Drawer(
            backgroundColor: Colors.black,
            child: ListView(
              children: [
                // Add any content you want in the endDrawer
              ],
            ),
          ),
        ),
      ],
    );
  }
}