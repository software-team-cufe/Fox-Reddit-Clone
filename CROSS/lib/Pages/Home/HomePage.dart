import 'package:flutter/material.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/Pages/SearchInHomePage.dart';
import 'package:reddit_fox/Pages/Home/Drawer.dart';
import 'package:reddit_fox/Pages/Home/endDrawer.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _selectedItem = "Home"; // Default selected item

  void desplayEndDrawer(BuildContext context) {
    Scaffold.of(context).openEndDrawer();
  }
  void desplayDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }

  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.6;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        iconTheme: IconThemeData(color: Colors.white),
        leading: Builder(builder: (context){
          return IconButton(
            icon: Icon(Icons.menu),
            onPressed: (){
              desplayDrawer(context);
            },
          );
        }
        ),
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
                onPressed: () => desplayEndDrawer(context), // No action on press
              );
            }
          ),
        ],
        title: PopupMenuButton<String>(
          icon: Text(_selectedItem),
          initialValue: _selectedItem,
          itemBuilder: (context) => [
            PopupMenuItem(
              child: Text("Home"),
              value: "Home",
            ),
            PopupMenuItem(
              child: Text("Category 1"),
              value: "Category 1",
            ),
            PopupMenuItem(
              child: Text("Category 2"),
              value: "Category 2",
            ),
            // Add more items as needed
          ],
          onSelected: (value) {
            setState(() {
              _selectedItem = value!;
            });
          },
        ),
      ),
      drawer: CustomDrawer(drawer_Width: drawerWidth,),
      endDrawer: endDrawer(user_width: userWidth),
      // endDrawer: Drawer(
      //   width: userWidth,
      //   backgroundColor: Colors.black,
      //   child: ListView(
      //     children: [
      //       // Add any content you want in the endDrawer
      //     ],
      //   ),
      // ),
      bottomNavigationBar: nBar(),
      endDrawerEnableOpenDragGesture: true, 
      drawerEnableOpenDragGesture: true,
    );
  }
}
