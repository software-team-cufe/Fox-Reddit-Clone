import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:reddit_fox/GeneralWidgets/poll.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';

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

  void pickVideo() async {
    final pickedFile =
        await ImagePicker().pickVideo(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        videoPath = pickedFile.path;
      });
      print('Video picked: $videoPath');
      addWidget(VideoDisplay(videoPath: videoPath));
    }
  }

  void addWidget(Widget widgetToAdd) {
    setState(() {
      addedWidget = widgetToAdd;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
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
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    print('Entered text: ');
                  },
                  child: const Text('Next'),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20.0),
              child: MyTextInputWidget(
                inputTitle: 'Title',
                sheight: 50.0,
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
              pickVideo: pickVideo,
            ),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: TextButton(
                onPressed: doubleIconSizeOnce,
                child: FaIcon(
                  FontAwesomeIcons.arrowUp,
                  size: arrowsize,
                ),
              ),
            ),
          ],
        )
      ],
    );
  }
}

class browseRow extends StatefulWidget {
  final void Function() togglePollVisibility;
  final void Function(Widget) addWidget;
  final Function pickVideo;
  final iconSize;

  const browseRow({
    required this.togglePollVisibility,
    required this.addWidget,
    required this.iconSize,
    required this.pickVideo,
  });

  @override
  State<browseRow> createState() => _browseRowState();
}

class _browseRowState extends State<browseRow> {
  bool isURLVisible = false;
  bool isImageVisible = false;
  bool isVideoVisible = false;

  late String imagePath;

  void pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        isImageVisible = true;
        imagePath = pickedFile.path;
      });
      widget.addWidget(ImageDisplay(imagePath: imagePath));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        Row(
          children: [
            TextButton(
              onPressed: () {
                setState(() {
                  isURLVisible = !isURLVisible;
                  if (isURLVisible) {
                    isImageVisible = false;
                    isVideoVisible = false;
                  }
                });
                widget.addWidget(
                  isURLVisible
                      ? MyTextInputWidget(
                          inputTitle: 'URL',
                          sheight: 50.0,
                        )
                      : Container(),
                );
              },
              child: FaIcon(
                FontAwesomeIcons.link,
                size: widget.iconSize,
              ),
            ),
            TextButton(
              onPressed: () async {
                setState(() {
                  isImageVisible = !isImageVisible;
                  if (isImageVisible) {
                    isURLVisible = false;
                    isVideoVisible = false;
                  }
                });
                pickImage();
              },
              child: FaIcon(
                FontAwesomeIcons.image,
                size: widget.iconSize,
              ),
            ),
            TextButton(
              onPressed: () async {
                setState(() {
                  isVideoVisible = !isVideoVisible;
                  if (isVideoVisible) {
                    isURLVisible = false;
                    isImageVisible = false;
                  }
                });
                widget.pickVideo();
              },
              child: FaIcon(
                FontAwesomeIcons.play,
                size: widget.iconSize,
              ),
            ),
            TextButton(
              onPressed: widget.togglePollVisibility,
              child: FaIcon(
                FontAwesomeIcons.listOl,
                size: widget.iconSize,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class ImageDisplay extends StatelessWidget {
  final String imagePath;

  const ImageDisplay({Key? key, required this.imagePath}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return Image.network(imagePath);
    } else {
      return Image.file(File(imagePath));
    }
  }
}

class VideoDisplay extends StatefulWidget {
  final String videoPath;

  const VideoDisplay({Key? key, required this.videoPath}) : super(key: key);

  @override
  _VideoDisplayState createState() => _VideoDisplayState();
}

class _VideoDisplayState extends State<VideoDisplay> {
  late VideoPlayerController _controller;
  late ChewieController _chewieController;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.file(File(widget.videoPath));
    _chewieController = ChewieController(
      videoPlayerController: _controller,
      autoPlay: true,
      looping: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Chewie(
      controller: _chewieController,
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
    _chewieController.dispose();
  }
}