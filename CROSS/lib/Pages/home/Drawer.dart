import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Blanck.dart';

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
