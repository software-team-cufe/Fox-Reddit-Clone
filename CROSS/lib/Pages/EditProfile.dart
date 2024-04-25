import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';

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
          buildRest(),
        ],
      ),
    );
  }

  Widget buildRest() {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Personal Information',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20.0,
            ),
          ),
          SizedBox(height: 10.0),
          // Add your form fields here
          TextFormField(
            decoration: InputDecoration(labelText: 'Name'),
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'Email'),
          ),
          // Add more form fields as needed
        ],
      ),
    );
  }

  Widget buildTop() {
    final top = coverHight - profileHight / 2;
    return Stack(
      clipBehavior: Clip.none,
      alignment: Alignment.center,
      children: [
        Container(
          margin: EdgeInsets.only(bottom: profileHight / 2),
          child: buildCoverImage(),
        ),
        Positioned(
          top: top,
          child: buildProfileImage(),
        ),
        Positioned(
          top: top + profileHight - 180.0,
          left: MediaQuery.of(context).size.width * 0.5 - 40.0,
          child: GestureDetector(
            onTap: () {
              // Handle changing cover photo
              pickImageFromPhone(ImageSource.gallery);
            },
            child: Container(
              width: 80.0,
              height: 44.0,
              decoration: BoxDecoration(
                color: Colors.purple,
                borderRadius: BorderRadius.circular(22.0),
              ),
              child: Center(
                child: Text(
                  "Add Image",
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
        ),
        Positioned(
          top: top + profileHight / 2 + 25.0,
          left: MediaQuery.of(context).size.width * 0.5 + 25.0,
          child: GestureDetector(
            onTap: () {
              // Handle changing profile photo
              pickImageFromPhone(ImageSource.gallery);
            },
            child: Container(
              width: 24.0,
              height: 24.0,
              decoration: BoxDecoration(
                color: Colors.purple,
                borderRadius: BorderRadius.circular(22.0),
              ),
              child: Center(
                child: Icon(
                  Icons.add,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget buildCoverImage() => Container(
        color: Colors.grey,
        child: Image.asset(
          'assets/images/cover.jpg',
          fit: BoxFit.cover,
        ),
        width: double.infinity,
        height: coverHight,
      );

  Widget buildProfileImage() => CircleAvatar(
        radius: profileHight / 2,
        backgroundColor: Colors.black,
        backgroundImage: AssetImage('assets/images/avatar.png'),
      );

  void pickImageFromPhone(ImageSource source) async {
    final picker = ImagePicker();
    final pickedImage = await picker.pickImage(source: ImageSource.gallery);

    if (pickedImage != null) {
    }
  }
}
  
