import 'package:flutter/material.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/Pages/SearchInHomePage.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  
  void desplatEndDrawer(BuildContext context) {
    Scaffold.of(context).openEndDrawer();
  }

  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text("Home"),
        centerTitle: false,
        backgroundColor: Colors.black,
        iconTheme: IconThemeData(color: Colors.white),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => Search()),
              );
            },
            icon: Icon(Icons.search),
          ),
          Builder(
            builder: (context) {
              return IconButton( // Avatar IconButton
                icon: CircleAvatar(),
                onPressed: () => desplatEndDrawer(context), // No action on press
              );
            }
          ),
        ],
      ),
      drawer: Drawer(
        width: drawerWidth,
        backgroundColor: Colors.black,
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
        backgroundColor: Colors.black,
        child: ListView(
          children: [
            // Add any content you want in the endDrawer
          ],
        ),
      ),
      bottomNavigationBar: nBar(),
      endDrawerEnableOpenDragGesture: false, // Added to prevent end drawer from opening on swipe
    );
  }
}
