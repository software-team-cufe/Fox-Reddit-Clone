import 'dart:convert';
import 'dart:core';
import 'dart:ui';
import 'package:dio/dio.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:reddit_fox/GeneralWidgets/image_display.dart';
import 'package:reddit_fox/GeneralWidgets/poll.dart';

import 'package:reddit_fox/GeneralWidgets/video_display.dart';
import 'package:image_picker/image_picker.dart';

import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({super.key});

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
  bool isURLVisible = false;
  bool isImageVisible = false;
  bool isVideoVisible = false;
  late TextEditingController urlController;
  late String imagePath;
  late List<String> _poll;
  late List<String> communities = [];
  String selectedCommunity = '';
  late String access_token;
  List attachments = [];

  // Variables to hold the states of the switches
  bool isSpoiler = false;
  bool isNsfw = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController();
    _bodyController = TextEditingController();
    urlController = TextEditingController();
    _poll = [];
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken')!;
      });
      fetchUserCommunities();
    });
    selectedCommunity = communities.isNotEmpty ? communities.first : '';
  }

  @override
  void dispose() {
    _titleController.dispose();
    _bodyController.dispose();
    urlController.dispose();
    super.dispose();
  }

  void togglePollVisibility() {
    setState(() {
      isPollVisible = !isPollVisible;
      if (!isPollVisible) {
        addedWidget = null;
      } else {
        addedWidget = PollPage(options: _poll);
      }
    });
  }

  void pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      final imageUrl = await uploadImage(pickedFile, 'image');
      if (imageUrl.isNotEmpty) {
        setState(() {
          isImageVisible = true;
          attachments.add(imageUrl);
        });
        addWidget(ImageDisplay(imagePath: pickedFile.path));
        print('Image uploaded to Cloudinary: $imageUrl');
      } else {
        print('Failed to upload image to Cloudinary');
      }
    }
  }

  void pickVideo() async {
    final pickedFile =
        await ImagePicker().pickVideo(source: ImageSource.gallery);
    if (pickedFile != null) {
      final videoUrl = await uploadImage(pickedFile, 'video');
      if (videoUrl.isNotEmpty) {
        setState(() {
          isVideoVisible = true;
          attachments.add(videoUrl);
        });
        addWidget(VideoDisplay(videoPath: pickedFile.path));
        print('Video uploaded to Cloudinary: $videoUrl');
      } else {
        print('Failed to upload video to Cloudinary');
      }
    }
  }

  Future<String> uploadImage(XFile file, String imageOrVideo) async {
    final formData = FormData.fromMap({
      'file': await MultipartFile.fromFile(file.path),
      'upload_preset': 'postImageOrVideo',
    });

    final response = await Dio().post(
      'https://api.cloudinary.com/v1_1/dtl7z245k/$imageOrVideo/upload',
      data: formData,
    );

    if (response.statusCode == 200) {
      final data = response.data;
      return data['secure_url'];
    } else {
      throw Exception('Failed to upload file to Cloudinary');
    }
  }

  void doubleIconSizeOnce() {
    setState(() {
      isIconSizeDoubled = !isIconSizeDoubled;
      iconsize = isIconSizeDoubled ? 50.0 : 25.0;
      arrowsize = isIconSizeDoubled ? 0.0 : 25.0;
    });
  }

  void addWidget(Widget widgetToAdd) {
    addedWidget = SizedBox(
      width: double.infinity,
      height: 200,
      child: widgetToAdd,
    );
  }

  void fetchUserCommunities() async {
    final response = await http.get(
      Uri.parse(
          ApiRoutesBackend.getCommunities), // Replace with your API endpoint
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token'
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final List<dynamic> communityData = data['communities'];
      final List<String> uniqueCommunities =
          communityData.map((dynamic item) => item.toString()).toSet().toList();
      setState(() {
        communities = uniqueCommunities;
      });
      print('communities fetched successfully ');
    } else {
      print('Failed to fetch user communities: ${response.statusCode}');
    }
  }

  Future<void> submitPost(String title, String text, bool isNsfw,
      bool isSpoiler, String urlController, List<String> poll) async {
    var formData = FormData();

    // Add attachments to formData
    for (var attachment in attachments) {
      // Check if the attachment is a String (URL) or bytes (image)
      if (attachment is String) {
        // If it's a URL, add it directly
        formData.fields.add(MapEntry('url', attachment));
      } else if (attachment is List<int>) {
        String base64Image = 'image/png;base64,${base64Encode(attachment)}';
        formData.fields.add(MapEntry('attachments', base64Image));
        print(base64Image);
      }
    }

    var fields = {
      'request': jsonEncode({
        'title': title,
        'text': text,
        'nsfw': isNsfw,
        'spoiler': isSpoiler,
        'poll': poll,
        'createdAt':
            DateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").format(DateTime.now()),
        if (selectedCommunity.isNotEmpty) 'Communityname': selectedCommunity,
      }),
    };

    // Convert fields map to the required type
    formData.fields.addAll(fields.entries);

    var dio = Dio();
    var response = await dio.post(
      ApiRoutesBackend.submitPost,
      data: formData,
      options: Options(
        headers: {
          'Authorization': 'Bearer $access_token',
          'Content-Type': 'multipart/form-data',
        },
      ),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      print('Post submitted successfully');
      print('access_token $access_token');
    } else {
      print('Error submitting post: ${response.statusCode}');
      print('access_token $access_token');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(6.0),
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
                          FontAwesomeIcons.times,
                          size: 25.0,
                          color: Colors.white,
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          final title = _titleController.text;
                          final body = _bodyController.text;
                          String url = urlController.text;
                          if (title.isEmpty || body.isEmpty) {
                            return;
                          }

                          submitPost(
                              title, body, isNsfw, isSpoiler, url, _poll);
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const HomePage()),
                          );
                        },
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.resolveWith<Color>(
                            (Set<MaterialState> states) {
                              if (_titleController.text.isEmpty ||
                                  _bodyController.text.isEmpty) {
                                return Theme.of(context).colorScheme.primary;
                              }

                              return const Color.fromARGB(255, 76, 168, 243);
                            },
                          ),
                        ),
                        child: const Text('Next'),
                      )
                    ],
                  ),
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(
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
                    decoration: const InputDecoration(
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
                      const Text('Spoiler'),
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
                      const Text('NSFW'),
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
                  DropdownButtonFormField<String>(
                    value:
                        selectedCommunity.isNotEmpty ? selectedCommunity : null,
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedCommunity = newValue!;
                      });
                    },
                    items: communities.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    hint: const Text('Choose a Community'),
                  ),
                ],
              ),
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: addedWidget != null ? [addedWidget!] : [],
                  ),
                ),
              ),
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          TextButton(
                            onPressed: () {
                              setState(() {
                                isURLVisible = !isURLVisible;
                                if (isURLVisible) {
                                  isImageVisible = false;
                                  isVideoVisible = false;
                                  if (urlController.text.isNotEmpty) {
                                    attachments.add(urlController.text);
                                  }
                                }
                              });
                              addWidget(
                                isURLVisible
                                    ? TextField(
                                        controller: urlController,
                                        decoration: const InputDecoration(
                                          labelText: 'URL',
                                        ),
                                      )
                                    : Container(),
                              );
                            },
                            child: FaIcon(
                              FontAwesomeIcons.link,
                              size: iconsize,
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
                              size: iconsize,
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
                              pickVideo();
                            },
                            child: FaIcon(
                              FontAwesomeIcons.play,
                              size: iconsize,
                              color: Colors.white,
                            ),
                          ),
                          TextButton(
                            onPressed: togglePollVisibility,
                            child: FaIcon(
                              FontAwesomeIcons.listOl,
                              size: iconsize,
                              color: Colors.white,
                            ),
                          ),
                        ],
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
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
