import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/GeneralWidgets/poll.dart';
import 'package:reddit_fox/GeneralWidgets/switchpost.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:reddit_fox/GeneralWidgets/browse_row.dart';
import 'package:reddit_fox/GeneralWidgets/video_display.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reddit_fox/Pages/Blanck.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({Key? key}) : super(key: key);

  @override
  State<CreatePost> createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  late TextEditingController _titleController;
  late TextEditingController _bodyController;
  Widget? addedWidget;
  bool isPollVisible = false;
  bool isIconSizeDoubled = false;
  double iconsize = 25.0;
  double arrowsize = 25.0;
  bool isTitleEmpty = true;
  bool isBodyEmpty = true;
  late String access_token;

  // Variables to hold the states of the switches
  bool isSpoiler = false;
  bool isNsfw = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController();
    _bodyController = TextEditingController();
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken')!;
      });
    });
  }

  @override
  void dispose() {
    _titleController.dispose();
    _bodyController.dispose();
    super.dispose();
  }

  void togglePollVisibility() {
    setState(() {
      isPollVisible = !isPollVisible;
      if (!isPollVisible) {
        addedWidget = null;
      } else {
        addedWidget = const PollPage();
      }
    });
  }

  void doubleIconSizeOnce() {
    setState(() {
      isIconSizeDoubled = !isIconSizeDoubled;
      iconsize = isIconSizeDoubled ? 50.0 : 25.0;
      arrowsize = isIconSizeDoubled ? 0.0 : 25.0;
    });
  }

  void pickVideo() async {
    final pickedFile =
        await ImagePicker().pickVideo(source: ImageSource.gallery);
    if (pickedFile != null) {
      final videoPath = pickedFile.path;
      print('Video picked: $videoPath');
      addWidget(VideoDisplay(videoPath: videoPath));
    }
  }

  void addWidget(Widget widgetToAdd) {
    setState(() {
      addedWidget = widgetToAdd;
    });
  }

  Future<void> submitPost(
      String title, String text, bool isNsfw, bool isSpoiler) async {
    final postData = {
      'title': title,
      'text': text,
      'attachments': ['screen.png'], // Add attachments if any
      'nsfw': isNsfw, // Include value of NSFW switch
      'spoiler': isSpoiler, // Include value of spoiler switch
      // 'CommunityID': '', // Add community ID if needed
    };

    final response = await http.post(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/api/submit'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        // Add any required headers
      },
      body: jsonEncode(postData),
    );

    if (response.statusCode == 201) {
      print('Post submitted successfully');
    } else {
      print('Error submitting post: ${response.body}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              children: <Widget>[
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const FaIcon(
                        FontAwesomeIcons.xmark,
                        size: 25.0,
                        color: Colors.white,
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        final title = _titleController.text;
                        final body = _bodyController.text;
                        if (title.isEmpty || body.isEmpty) {
                          // Show error message or handle empty fields
                          return;
                        }
                        // Proceed with submitting post
                        submitPost(title, body, isNsfw, isSpoiler);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const HomePage()),
                        );
                      },
                      child: const Text('Next'),
                    )
                  ],
                ),
                TextField(
                  controller: _titleController,
                  decoration: InputDecoration(
                    labelText: 'Title',
                  ),
                  onChanged: (text) {
                    setState(() {
                      isTitleEmpty = text.isEmpty;
                    });
                  },
                ),
                TextField(
                  controller: _bodyController,
                  decoration: InputDecoration(
                    labelText: 'Body Text (optional)',
                  ),
                  onChanged: (text) {
                    setState(() {
                      isBodyEmpty = text.isEmpty;
                    });
                  },
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Spoiler'),
                    Switch(
                      value: isSpoiler,
                      onChanged: (value) {
                        setState(() {
                          isSpoiler = value;
                        });
                      },
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('NSFW'),
                    Switch(
                      value: isNsfw,
                      onChanged: (value) {
                        setState(() {
                          isNsfw = value;
                        });
                      },
                    ),
                  ],
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: addedWidget != null ? [addedWidget!] : [],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                browseRow(
                  togglePollVisibility: togglePollVisibility,
                  addWidget: addWidget,
                  iconSize: iconsize,
                  pickVideo: pickVideo,
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextButton(
                    onPressed: doubleIconSizeOnce,
                    child: FaIcon(
                      FontAwesomeIcons.arrowUp,
                      size: arrowsize,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
