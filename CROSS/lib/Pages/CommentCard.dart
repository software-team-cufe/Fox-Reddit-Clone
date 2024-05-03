import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:reddit_fox/Pages/post_details.dart';

// Sample class for comment data
class CommentData {
  final String username;
  final String content;
  final int votes;
  final List<CommentData> replies;

  CommentData({
    required this.username,
    required this.content,
    required this.votes,
    required this.replies,
  });
}

class CommentCard extends StatefulWidget {
  final String username;
  final String commentContent;
  final int votes;
  final VoidCallback onReply;
  final VoidCallback onViewMenu;
  final List<CommentData> replies;

  /// Creates a new [CommentCard] instance.
  ///
  /// The [username], [commentContent], [upvotes], [downvotes], [onReply], and [replies] parameters are required.
  const CommentCard({
    Key? key,
    required this.username,
    required this.commentContent,
    required this.votes,
    required this.onReply,
    required this.onViewMenu,
    required this.replies,
  }) : super(key: key);

  @override
  _CommentCardState createState() => _CommentCardState();
}

class _CommentCardState extends State<CommentCard> {
  bool isReplying = false;
  int voteCount = 0; // State variable for vote count
  bool hasVoted = false; // Flag to track whether the user has voted
  VoteDirection voteDirection = VoteDirection.Up; // Default vote direction

  @override
  void initState() {
    super.initState();
    voteCount = widget.votes;
    hasVoted = false;
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
    return Container(
      margin: const EdgeInsets.only(bottom: 2.0),
      decoration: const BoxDecoration(
        border: Border(
          left: BorderSide(width: 2.0, color: Colors.grey), // Vertical line
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 1),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const CircleAvatar(
                  backgroundColor: Colors.transparent,
                  backgroundImage: AssetImage('assets/images/avatar.png'),
                  radius: 15,
                ), // Display the avatar
                const Padding(padding: EdgeInsets.only(left: 2.0)),
                Text(
                  widget.username,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.only(left: 10.0), // Add padding to create space between the avatar and the comment content
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(widget.commentContent),
                  if (isReplying)
                    Container(
                      padding: const EdgeInsets.all(1.0),
                      decoration: const BoxDecoration(
                        border: Border(
                          left: BorderSide(
                              width: 2.0,
                              color:Colors.grey), // Vertical line for reply input
                        ),
                      ),
                      child: Row(
                        children: [
                                  const SizedBox(width: 10), // Add a small space here
                          const Expanded(
                            child: TextField(
                              decoration: InputDecoration(
                                hintText: 'Write a reply...',
                                border: InputBorder.none,
                              ),
                              maxLines: null,
                              keyboardType: TextInputType.multiline,
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.send),
                            onPressed: () {
                              setState(() {
                                isReplying = false; // Close the reply field
                              });
                              // Add logic to handle sending the reply
                            },
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            if (widget.replies.isNotEmpty)
              _buildReplyList(replies: widget.replies),
            Row(
              children: [
                IconButton(
                  icon: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 200),
                            child:
                                hasVoted && voteDirection == VoteDirection.Up
                                    ? Image.asset(
                                        'assets/Icons/up vote.png',
                                        key: UniqueKey(),
                                        width: 18,
                                        height: 18,
                                      )
                                    : Image.asset(
                                        'assets/Icons/arrow-up.png',
                                        key: UniqueKey(),
                                        width: 18,
                                        height: 18,
                                      )),
                        onPressed: () => vote(VoteDirection.Up),
                      ),
                Text(
                  "${voteCount.abs()}",
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 200),
                            child:
                                hasVoted && voteDirection == VoteDirection.Down
                                    ? Image.asset(
                                        'assets/Icons/down vote.png',
                                        key: UniqueKey(),
                                        width: 18,
                                        height: 18,
                                      )
                                    : Image.asset(
                                        'assets/Icons/arrow-down.png',
                                        key: UniqueKey(),
                                        width: 18,
                                        height: 18,
                                      )),
                        onPressed: () => vote(VoteDirection.Down),
                      ),
                const Spacer(),
                IconButton(
                  icon: const Icon(LucideIcons.reply),
                  onPressed: () {
                    setState(() {
                      isReplying = !isReplying;
                    });
                    widget.onReply();
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.more_horiz),
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      builder: (BuildContext context) {
                        return Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            ListTile(
                              leading: const Icon(LucideIcons.share),
                              title: const Text('Share'),
                              onTap: () {
                                // Handle edit action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(LucideIcons.bookmark),
                              title: const Text('Save'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(LucideIcons.bell),
                              title: const Text('Get Reply notifications'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(LucideIcons.copy),
                              title: const Text('Copy text'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(LucideIcons.minimize2),
                              title: const Text('Collapse thread'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.person_off),
                              title: const Text('Block account'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.flag),
                              title: const Text('report'),
                              onTap: () {
                                // Handle delete action
                                Navigator.pop(
                                    context); // Close the bottom sheet
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
          ],
        ),
      ),
    );
  }

  Widget _buildReplyList({required List<CommentData> replies}) {
    return Column(
      children: replies
          .map(
            (reply) => CommentCard(
              username: reply.username,
              commentContent: reply.content,
              votes: reply.votes,
              onReply:
                  () {}, // Implement reply functionality for replies if needed
              onViewMenu:
                  () {}, // Implement view menu functionality for replies if needed
              replies: reply.replies,
            ),
          )
          .toList(),
    );
  }
}
