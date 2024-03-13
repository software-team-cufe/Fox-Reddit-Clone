import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        iconTheme: IconThemeData(color: Colors.white),
      ),
      drawer: Drawer(
        width: drawerWidth,
        backgroundColor: Colors.deepPurple,
        child: ListView(
          children: [
            ListTile(
              title: Text(
                "Recently Visited", 
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ), 
      ),
      endDrawer: Drawer(        
        width: userWidth,
        backgroundColor: Colors.deepPurple,
        child: ListView(
          children: [
            // Add any content you want in the endDrawer
          ],
        ),
      ),
      // bottomNavigationBar: BottomBar(),
    );
  }
}
