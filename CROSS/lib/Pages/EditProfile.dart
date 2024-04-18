import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EditProfilePage extends StatefulWidget {
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  bool contentVisibility = true;
  bool showActiveCommunities = true;
  final double coverHight = 200.0;
  final double profileHight = 104;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Profile'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () {
              // Save button action
            },
          ),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          buildTop(),
        ],
      )
    );
  }

  Widget buildRest(){
    return Container(
      

    );
  }

  Widget buildTop(){
    final top = coverHight - profileHight/2;
    return  Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.center,
        children: [
          Container(
            margin: EdgeInsets.only(bottom: profileHight/2),
            child: buildCoverImage()
            ),
          Positioned(
            top: top,
            child: buildProfileImage(),
          ),
        ],
      );
  }

  Widget buildCoverImage() => Container(
    color: Colors.grey,
    child: Image.asset(
      'assets/images/cover.jpg',
      fit: BoxFit.cover, // Move fit property inside Image widget
    ),
    width: double.infinity,
    height: coverHight,
  );
  
  Widget buildProfileImage() => CircleAvatar(
    radius: profileHight /2,
    backgroundColor: Colors.black,
    backgroundImage: AssetImage('assets/images/avatar.png'),
  );

}
