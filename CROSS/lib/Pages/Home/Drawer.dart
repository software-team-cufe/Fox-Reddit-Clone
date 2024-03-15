// ignore_for_file: file_names, non_constant_identifier_names

import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  final double drawer_Width;
  
  const CustomDrawer({Key? key, required this.drawer_Width});

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
                  title: Text(
                    "Recently Visited",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                // Add more items if needed
              ],
            ),
          ),
        ),
      ],
    );
  }
}
