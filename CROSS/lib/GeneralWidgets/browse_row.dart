import 'package:flutter/material.dart';
import 'textInput.dart';
import 'image_display.dart';
import 'package:image_picker/image_picker.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class browseRow extends StatefulWidget {
  final void Function() togglePollVisibility;
  final void Function(Widget) addWidget;
  final Function pickVideo;
  final iconSize;

  const browseRow({
    super.key,
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
  late TextEditingController urlController;
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
  void dispose() {
    urlController.dispose();
    super.dispose();
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
                      ? TextField(
                          controller: urlController,
                          decoration: InputDecoration(
                            labelText: '',
                          ),
                        )
                      : Container(),
                );
              },
              child: FaIcon(
                FontAwesomeIcons.link,
                size: widget.iconSize,
                color: Colors.white,
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
                color: Colors.white,
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
                color: Colors.white,
              ),
            ),
            TextButton(
              onPressed: widget.togglePollVisibility,
              child: FaIcon(
                FontAwesomeIcons.listOl,
                size: widget.iconSize,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
