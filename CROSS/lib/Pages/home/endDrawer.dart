import 'package:flutter/material.dart';

class endDrawer extends StatelessWidget {
  final double user_width; // Define a parameter to hold drawerWidth
  const endDrawer({super.key, required this.user_width});

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
                ) // Add any content you want in the endDrawer
                ,
                ListTile(
                  leading: const Icon(Icons.add_circle_outline_sharp),
                  title: const Text('Create community'),
                  onTap: () {},
                ) // Add any content you want in the endDrawer
                ,
                ListTile(
                  leading: const Icon(Icons.access_time),
                  title: const Text('History'),
                  onTap: () {},
                ) // Add any content you want in the endDrawer
              ],
            ),
          ),
        ),
      ],
    );
  }
}
