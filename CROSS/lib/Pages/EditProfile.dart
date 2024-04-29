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
  bool isVisible = false;
  bool isActive = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text('Edit Profile'),
        actions: <Widget>[
          ElevatedButton(
            child: Text("Save", style: TextStyle(
              color: Colors.white,
            ),),
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
          SizedBox(height: 30.0),
          // Add your form fields here
          Text("Display Name (optional)"),
          SizedBox(height: 10.0),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Show on your profile page',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color(0xFF2c2b2b),
          ),
          ),
          SizedBox(height: 10.0),
          Text("This will be displayed to viewers of your profile page and does not change your username", style: TextStyle(color: Color(0xFF787878)),),
          SizedBox(height: 30.0),
          Text("About (optional)"),
          SizedBox(height: 10.0),
          TextFormField(
            maxLines: null, // Allow multiple lines
            minLines: 5, // Set a minimum of 3 lines
            decoration: InputDecoration(
              hintText: 'A little description of yourself',
              hintStyle: TextStyle(color: Color(0xFF787878)),
              border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
            ),
              filled: true, // Fill the background
              fillColor: Color(0xFF2c2b2b),
          ),
          ),
          SizedBox(height: 30.0),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                Text('Content visibility',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 10.0),
                Text(
                  'All posts to this profile will appear in r/all and your profile can be discovered in /user',
                  style: TextStyle(color: Color(0xFF787878)),
                ),
              ],),
              SizedBox(width: 10.0),
              Switch(
                value: isVisible,
                onChanged: (value){
                  setState(() {
                    isVisible = value;
                  });
                },
              )
            ],
          ),
          SizedBox(height: 30.0),
          Row(
            children: [
              Container(
                width: 280.0,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                  Text('Show active communites',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10.0),
                  Text(
                    'Decide whether to show the communites you are active in on your profile',
                    style: TextStyle(color: Color(0xFF787878)),
                  ),
                ],),
              ),
              SizedBox(width: 10.0),
              Switch(
                value: isVisible,
                onChanged: (value){
                  setState(() {
                    isVisible = value;
                  });
                },
              )
            ],
          )
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
  
