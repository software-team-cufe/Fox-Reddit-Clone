import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/postDetailsForProfilePage.dart';
import 'package:share/share.dart';

/// Enum to represent the direction of the vote.
enum VoteDirection {
  Up,
  Down,
}

/// A stateful widget that represents a post card in the home page.
class ClassicCard extends StatefulWidget {
  final Map<String, dynamic> post;

  const ClassicCard({
    Key? key,
    required this.post,
  }) : super(key: key);

  @override
  _ClassicCardState createState() => _ClassicCardState();
}

class _ClassicCardState extends State<ClassicCard> {
  bool isBlurred = false;
  int voteCount = 0;
  bool hasVoted = false;
  VoteDirection voteDirection = VoteDirection.Up;

  @override
  void initState() {
    super.initState();
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler']);
    voteCount = widget.post['votesCount'] ?? 0; // Changed 'votes' to 'votesCount'
  }

  void vote(VoteDirection direction) {
    setState(() {
      if (voteDirection == direction && hasVoted) {
        voteCount -= direction == VoteDirection.Up ? 1 : -1;
        hasVoted = false;
        voteDirection = VoteDirection.Up;
      } else {
        if (hasVoted) {
          voteCount -= voteDirection == VoteDirection.Up ? 1 : -1;
        }
        voteCount += direction == VoteDirection.Up ? 1 : -1;
        hasVoted = true;
        voteDirection = direction;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PostDetailsPage(post: widget.post),
          ),
        );
      },
      child: Column(
        children: [
          SizedBox(height: 10),
          SizedBox(width: 10),
          ListTile(
            contentPadding:
                const EdgeInsets.symmetric(vertical: 0, horizontal: 10),
            title: Row(
              children: [
                const Icon(Icons.account_circle, size: 30), // Removed 'redditpic' as it does not exist in the response
                SizedBox(width: 10),
                Text("U/" + 
                  widget.post['title'], // Changed 'redditName' to 'title'
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.more_vert), // Menu icon
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      builder: (BuildContext context) {
                        return Column(
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
                              title: const Text('Edit post'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.call_split),
                              title: const Text('Mark spoiler'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.call_split),
                              title: const Text('Mark NSFW'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.call_split),
                              title: const Text('Delete post'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.call_split),
                              title: const Text('Crosspost to a community'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              tileColor:
                                  Colors.transparent, // Transparent background
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
                                    color:
                                        Colors.red.shade400), // Softer red text
                              ),
                            ),
                            ListTile(
                              tileColor:
                                  Colors.transparent, // Transparent background
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
                                    color:
                                        Colors.red.shade400), // Softer red text
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
                        );
                      },
                    );
                  },
                ),
              ],
            ),
            subtitle: Row(
              children: [
                SizedBox(width: 42,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.post['textHTML'], // Changed 'description' to 'textHTML'
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ],
            ),
            // Removed 'picture' related code as it does not exist in the response
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              ConstrainedBox(
                      constraints: const BoxConstraints.tightFor(width: 42, height: 40), // Set a fixed size
                      child: IconButton(
                        icon: AnimatedSwitcher(
                          duration: const Duration(milliseconds: 200),
                          child: hasVoted && voteDirection == VoteDirection.Up
                              ? Image.asset(
                                  'assets/Icons/up vote.png',
                                  key: UniqueKey(),
                                  width: 40,
                                  height: 42,
                                )
                              : Image.asset(
                                  'assets/Icons/arrow-up.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )  
                        ),
                        onPressed: () => vote(VoteDirection.Up),
                      ),
                      ),

                    Text(
                      "${voteCount.abs()}",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    ConstrainedBox(
                      constraints: const BoxConstraints.tightFor(width: 40, height: 38), // Set a fixed size
                      child: IconButton(
                        icon: AnimatedSwitcher(
                          duration: const Duration(milliseconds: 200),
                          child: hasVoted && voteDirection == VoteDirection.Down
                              ? Image.asset(
                                  'assets/Icons/down vote.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )
                              : Image.asset(
                                  'assets/Icons/arrow-down.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )  
                        ),
                        onPressed: () => vote(VoteDirection.Down),
                      ),
                      ),

              const SizedBox(width:125),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(               
                        child: Row(
                          children: [
                            ConstrainedBox(
                              constraints: const BoxConstraints.tightFor(width: 28, height: 28), // Set a fixed size
                              child: Image.asset('assets/Icons/comment.png')
                            ),
                          ],
                        ),
                      ),
                    const SizedBox(width:125),
                  IconButton(
                    icon: Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.rotationY(
                          3.14), // Flips the icon horizontally
                      child: const Icon(Icons.reply),
                    ),
                    onPressed: () {
                      int postId = widget.post['id'];
                      String postUrl =
                          'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                      Share.share('${widget.post['title']}\n$postUrl');
                    },
                  ),
                ],
              ),
            ],
          ),
          const Divider(
            height: 1,
            color: Color.fromARGB(255, 44, 43, 43),
            thickness: 1,
            indent: 16,
            endIndent: 16,
          ),
        ],
      ),
    );
  }
}
