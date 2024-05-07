import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/VoteSection.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/cardCoreWidget.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

/// A stateful widget that represents a post card in the home page.
class ModernCard extends StatefulWidget {
  final Map<dynamic, dynamic> post;
  TextEditingController editedText = TextEditingController();
  String? access_token;
  String? userName;
  final bool history;
  final bool myProfile;

  /// Constructs a [ModernCard] widget.
  ///
  /// The [post] parameter is required and contains the data for the post.
  ModernCard({
    super.key,
    required this.post,
    this.access_token,
    this.userName,
    this.history = false,
    this.myProfile = false,
  });

  @override
  _ModernCardState createState() => _ModernCardState();
}

class _ModernCardState extends State<ModernCard> {
  bool currentuserpost = false;

  @override
  void initState() {
    super.initState();
    String? id;
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        id = sharedPrefValue.getString('userid')!;
        if (id ==
            (widget.history
                ? widget.post['userID']
                : widget.post['userID']['_id'])) {
          currentuserpost = true;
        }
        print(currentuserpost);

        //   print(widget.currentuserpost);
        // }
      });
      print(currentuserpost);
    });
  }

  Future<void> delPost(String postId) async {
    final response = await http.post(
      Uri.parse(ApiRoutesBackend.delPost),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ${widget.access_token}'
      },
      body: json.encode({'linkID': "t3_$postId"}),
    );
    print("response status code: ${response.statusCode}");
    if (response.statusCode == 200) {
      print("Post deleted");
    } else {
      print("Post not deleted");
    }
  }

  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PostDetails(post: widget.post),
          ),
        );
      },
      child: Padding(
        padding: const EdgeInsets.all(5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (widget.post["communityName"] != null)
                      const CircleAvatar(
                        radius: 18,
                        backgroundImage:
                            // AssetImage(widget.post["communityIcon"]),
                            AssetImage('assets/images/avatar.png'),
                            backgroundColor: Colors.transparent,
                      )
                    else
                      const CircleAvatar(
                        radius: 18,
                        child: Icon(Icons.account_circle),
                      ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        GestureDetector(
                          onTap: () {
                            if (widget.post["communityName"] != null) {
                              // Navigate to the community page
                            } else {
                              // Navigate to the user's profile page
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ProfilePage(
                                      userName: widget.post['username'],
                                      access_token: widget.access_token),
                                ),
                              );
                            }
                          },
                          child: Text(
                            widget.post["communityName"] != null
                                ? "r/${widget.post["communityName"]}"
                                : "u/${widget.post["username"]}",
                            style: const TextStyle(
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.more_vert), // Menu icon
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      builder: (BuildContext context) {
                        return SingleChildScrollView(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              ListTile(
                                leading: const Icon(Icons.bookmark),
                                title: const Text('Save'),
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 1
                                },
                              ),
                              Visibility(
                                visible: currentuserpost,
                                child: ListTile(
                                  leading: const Icon(Icons.edit_document),
                                  title: const Text('Edit'),
                                  onTap: () {
                                    showModalBottomSheet(
                                      context: context,
                                      // isScrollControlled:
                                      //     true, // Adjust based on content size
                                      builder: (BuildContext context) {
                                        return StatefulBuilder(
                                          builder: (context, setState) =>
                                              Container(
                                            height: MediaQuery.of(context)
                                                .size
                                                .height,
                                            width: MediaQuery.of(context)
                                                .size
                                                .width, // Adjust height as needed
                                            decoration: const BoxDecoration(
                                              color: Colors.black87,
                                              borderRadius:
                                                  BorderRadius.vertical(
                                                      top: Radius.circular(
                                                          20.0)),
                                            ),
                                            child: Padding(
                                              padding:
                                                  const EdgeInsets.all(16.0),
                                              child: SingleChildScrollView(
                                                child: Form(
                                                  // Wrap in Form for validation (optional)
                                                  key: _formKey,
                                                  child: SizedBox(
                                                    height: 1000,
                                                    width: 500,
                                                    child: Column(
                                                      children: [
                                                        Row(
                                                          children: [
                                                            IconButton(
                                                              icon: const Icon(Icons
                                                                  .cancel_outlined),
                                                              iconSize: 35,
                                                              onPressed: () =>
                                                                  Navigator.pop(
                                                                      context),
                                                            ),
                                                            // Textbuttoncontainer(
                                                            //   text: 'Cancel',
                                                            //   color: const Color(
                                                            //       0xFFB02F00),
                                                            //   onPressed: () =>
                                                            //       Navigator.pop(
                                                            //           context),
                                                            // ),
                                                            const Gap(15),
                                                            RegularText(
                                                                text:
                                                                    "Edit Post"),
                                                            const Spacer(),
                                                            Textbuttoncontainer(
                                                              text: 'Save',
                                                              color: const Color(
                                                                  0xFFB02F00),
                                                              onPressed: () {
                                                                if (_formKey
                                                                    .currentState!
                                                                    .validate()) {
                                                                  // Save the text (implement your logic here)
                                                                  Navigator.pop(
                                                                      context); // Close bottom sheet after save
                                                                }
                                                              },
                                                            ),
                                                          ],
                                                        ),
                                                        const Gap(30),
                                                        TextField(
                                                          controller:
                                                              widget.editedText,
                                                          decoration:
                                                              InputDecoration(
                                                            suffixIconColor:
                                                                Colors.white,
                                                            prefixIconColor:
                                                                Colors.white,
                                                            fillColor:
                                                                const Color
                                                                    .fromARGB(
                                                                    255,
                                                                    18,
                                                                    16,
                                                                    15),
                                                            filled: true,
                                                            border:
                                                                OutlineInputBorder(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          15.0),
                                                            ),
                                                          ),
                                                          maxLines: 10,
                                                          // validator: (value) {
                                                          //   if (value == null ||
                                                          //       value.isEmpty) {
                                                          //     return 'Please enter some text';
                                                          //   }
                                                          //   return null; // Add validation logic here (optional)
                                                          // },
                                                        ),
                                                        // const Spacer(),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                        );
                                      },
                                    ); // Handle option 1
                                  },
                                ),
                              ),
                              widget.myProfile == true
                              ?ListTile(
                                leading:const Icon(Icons.delete),
                                title: const Text('Delete'),
                                onTap: () {
                                  delPost(widget.post["_id"]);
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => ProfilePage(
                                              userName: widget.userName!,
                                              myProfile: true,
                                              access_token:
                                                  widget.access_token!,
                                            )),
                                  ); // Close the menu
                                  // Handle option 1
                                },
                              )
                              :
                              ListTile(
                                leading: const Icon(Icons.content_copy),
                                title: const Text('Copy text'),
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 2
                                },
                              ),
                              ListTile(
                                leading: const Icon(Icons.call_split),
                                title: const Text('Crosspost to community'),
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 1
                                },
                              ),
                              ListTile(
                                tileColor: Colors
                                    .transparent, // Transparent background
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 1
                                },
                                leading: Icon(Icons.flag_outlined,
                                    color:
                                        Colors.red.shade400), // Softer red icon
                                title: Text(
                                  'Report',
                                  style: TextStyle(
                                      color: Colors
                                          .red.shade400), // Softer red text
                                ),
                              ),
                              ListTile(
                                tileColor: Colors
                                    .transparent, // Transparent background
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 2
                                },
                                leading: Icon(Icons.person_off_outlined,
                                    color:
                                        Colors.red.shade400), // Softer red icon
                                title: Text(
                                  'Block account',
                                  style: TextStyle(
                                      color: Colors
                                          .red.shade400), // Softer red text
                                ),
                              ),
                              ListTile(
                                leading:
                                    const Icon(Icons.visibility_off_outlined),
                                title: const Text('Hide'),
                                onTap: () {
                                  Navigator.pop(context); // Close the menu
                                  // Handle option 1
                                },
                              ),
                            ],
                          ),
                        );
                      },
                    );
                  },
                ),
              ],
            ),
            cardCoreWidget(post: widget.post, detailsPageOpen: false),
            VoteSection(post: widget.post),
            const Divider(
                height: 1,
                color: Color.fromARGB(255, 44, 43, 43),
                thickness: 1,
                indent: 1,
                endIndent: 1),
          ],
        ),
      ),
    );
  }
}
