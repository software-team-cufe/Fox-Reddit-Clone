import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';
import 'package:lucide_icons/lucide_icons.dart';

/// A stateful widget that represents a post card in the home page.
class ModernCard extends StatefulWidget {
  final Map<String, dynamic> post;

  /// Constructs a [ModernCard] widget.
  ///
  /// The [post] parameter is required and contains the data for the post.
  const ModernCard({
    super.key,
    required this.post,
  });

  @override
  _ModernCardState createState() => _ModernCardState();
}

class _ModernCardState extends State<ModernCard> {
  bool isBlurred = false;
  int voteCount = 0; // State variable for vote count
  bool hasVoted = false; // Flag to track whether the user has voted
  VoteDirection voteDirection = VoteDirection.Up; // Default vote direction
  @override
  void initState() {
    super.initState();
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler']);
    voteCount = widget.post['votes'] ?? 0;
    hasVoted = widget.post['hasVoted'] ?? false;
  }

  void vote(VoteDirection direction) {
    setState(() {
      if (voteDirection == direction && hasVoted) {
        // User clicks the same button, cancel the vote
        voteCount -= direction == VoteDirection.Up ? 1 : -1;
        hasVoted = false;
        voteDirection = VoteDirection.Up; // Reset vote direction
      } else {
        // User clicks a different button or hasn't voted yet
        if (hasVoted) {
          // Cancel the previous vote
          voteCount -= voteDirection == VoteDirection.Up ? 1 : -1;
        }
        // Apply the new vote
        voteCount += direction == VoteDirection.Up ? 1 : -1;
        hasVoted = true;
        voteDirection = direction; // Update vote direction
      }
      // Update the vote count and user's vote status in the backend
    });
  }

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
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    CircleAvatar(
                      radius: 18,
                      child: Icon(Icons.account_circle),
                    ),
                    SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'r/Valorant',
                          style: TextStyle(
                            fontSize: 20,
                            color: Color(0xFFFFFFFF),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const Spacer(), // Added Spacer
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
                              title: const Text('Crosspost to community'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.flag),
                              title: const Text('Report'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.person_off),
                              title: const Text('Block account'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.visibility_off),
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
            Text(
              widget.post['title'],
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Row(
              children: [
                if (widget.post['nsfw'])
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    margin: const EdgeInsets.only(top: 4, right: 4),
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'NSFW',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                if (widget.post['spoiler'])
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    margin: const EdgeInsets.only(top: 4),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 137, 137, 137),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'Spoiler',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            if (widget.post['picture'] != null &&
                widget.post['picture']!.isNotEmpty)
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Image.network(
                      widget.post['picture']!,
                      width: double.infinity,
                      height: 400,
                      fit: BoxFit.cover,
                      color: isBlurred
                          ? const Color.fromARGB(0, 158, 158, 158)
                          : null,
                      colorBlendMode:
                          isBlurred ? BlendMode.saturation : BlendMode.dst,
                    ),
                    if (isBlurred)
                      BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          color:
                              const Color.fromARGB(0, 0, 0, 0).withOpacity(0),
                          width: double.infinity,
                          height: 400,
                        ),
                      ),
                  ],
                ),
              ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: isBlurred ? Colors.white : Colors.transparent,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                widget.post['description'],
                style: TextStyle(
                  fontSize: 16,
                  color: isBlurred ? Colors.transparent : Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
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


                  ],
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Spacer(),
                      SizedBox(               
                        child: Row(
                          children: [
                            ConstrainedBox(
                              constraints: const BoxConstraints.tightFor(width: 28, height: 28), // Set a fixed size
                              child: Image.asset('assets/Icons/comment.png')
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 4.0, right: 4.0),
                              child: Text(
                                "${widget.post['commentsNo']} Comments",
                                style: const TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Spacer(),
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
                ),
              ],
            ),
            const Divider(
              height: 1,
              color: Color.fromARGB(255, 44, 43, 43),
              thickness: 1,
              indent: 1,
              endIndent: 1,
            ),
          ],
        ),
      ),
    );
  }
}
