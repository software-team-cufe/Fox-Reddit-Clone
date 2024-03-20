import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/GeneralWidgets/poll.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:reddit_fox/GeneralWidgets/browse_row.dart';
import 'package:reddit_fox/GeneralWidgets/video_display.dart';
import 'package:reddit_fox/GeneralWidgets/image_display.dart';
import 'package:image_picker/image_picker.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({Key? key}) : super(key: key);

  @override
  State<CreatePost> createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  Widget? addedWidget;
  bool isPollVisible = false;
  bool isIconSizeDoubled = false;
  double iconsize = 25.0;
  double arrowsize = 25.0;
  late String imagePath;
  late String videoPath;
  bool isFieldEmpty = true; // Initially set to true

  void togglePollVisibility() {
    setState(() {
      isPollVisible = !isPollVisible;
      if (!isPollVisible) {
        addedWidget = null;
      } else {
        addedWidget = PollPage();
      }
    });
  }

  void doubleIconSizeOnce() {
    if (!isIconSizeDoubled) {
      setState(() {
        iconsize *= 2;
        arrowsize = 0.0;
        isIconSizeDoubled = true;
      });
    } else {
      setState(() {
        iconsize /= 2;
        arrowsize = 25.0;
        isIconSizeDoubled = false;
      });
    }
  }

  // void pickVideo() async {
  //   final pickedFile =
  //       await ImagePicker().pickVideo(source: ImageSource.gallery);
  //   if (pickedFile != null) {
  //     setState(() {
  //       videoPath = pickedFile.path;
  //     });
  //     print('Video picked: $videoPath');
  //     addWidget(VideoDisplay(videoPath: videoPath));
  //   }
  // }

  void addWidget(Widget widgetToAdd) {
    setState(() {
      addedWidget = widgetToAdd;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
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
                    onPressed: () {},
                    child: const Text('Next'),
                    style: ButtonStyle(
                      backgroundColor: !isFieldEmpty
                          ? MaterialStateProperty.all<Color>(Colors.blue)
                          : MaterialStateProperty.all<Color>(Colors
                              .grey), // Change colors based on isFieldEmpty condition
                    ),
                  )
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(top: 20.0),
                child: MyTextInputWidget(
                  inputTitle: 'Title',
                  sheight: 50.0,
                  onChanged: (text) {
                    setState(() {
                      isFieldEmpty = text.isEmpty;
                    });
                  },
                ),
              ),
              MyTextInputWidget(
                inputTitle: 'body text(optional)',
                sheight: 250.0,
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
                //pickVideo: pickVideo,
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
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
    );
  }
}
