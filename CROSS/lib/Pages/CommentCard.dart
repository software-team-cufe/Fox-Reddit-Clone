import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';

/// A card widget that represents a comment
class CommentCard extends StatelessWidget {
  final String username;
  final String commentContent;
  final int upvotes;
  final int downvotes;
  final VoidCallback onReply;
  final List<ReplyData> replies; // List of replies

  /// Creates a new [CommentCard] instance.
  ///
  /// The [username], [commentContent], [upvotes], [downvotes], [onReply], and [replies] parameters are required.
  const CommentCard({
    super.key,
    required this.username,
    required this.commentContent,
    required this.upvotes,
    required this.downvotes,
    required this.onReply,
    required this.replies,
    required Null Function() onViewMenu,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.transparent,
      margin: const EdgeInsets.symmetric(vertical: 1),
      child: Padding(
        padding: const EdgeInsets.only(top: 1),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const SizedBox(width: 8),
                const CircleAvatar(
                  radius: 12,
                  child: Icon(Icons.account_circle),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    username,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),

            Padding(
              padding: const EdgeInsets.only(left: 16, top: 4),
              child: Text(
                commentContent,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_upward, size: 20),
                  onPressed: () {},
                ),
                Text('$upvotes'),
                IconButton(
                  icon: const Icon(Icons.arrow_downward, size: 20),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(LucideIcons.reply, size: 20),
                  onPressed: onReply,
                ),
                IconButton(
                  icon: const Icon(Icons.more_vert, size: 20),
                  onPressed: () {
                    _showMenu(context);
                  },
                ),
              ],
            ),

            // Display replies here with indentation
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: replies
                  .map((reply) => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(
                              left: 16,
                            ),
                            child: _buildReply(reply),
                          ),
                        ],
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }

  void _showMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Wrap(
          children: [
            ListTile(
              leading: const Icon(Icons.share),
              title: const Text('Share'),
              onTap: () {
                Navigator.pop(context);
                // Handle share action
              },
            ),
            ListTile(
              leading: const Icon(Icons.save),
              title: const Text('Save'),
              onTap: () {
                Navigator.pop(context);
                // Handle save action
              },
            ),
            ListTile(
              leading: const Icon(Icons.notifications),
              title: const Text('Get Reply Notifications'),
              onTap: () {
                Navigator.pop(context);
                // Handle reply notifications action
              },
            ),
            // Add other menu items as needed
          ],
        );
      },
    );
  }

  Widget _buildReply(ReplyData replyData) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const CircleAvatar(
              child: Icon(Icons.account_circle),
            ),
            const SizedBox(width: 8),
            Text(
              replyData.username,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Padding(
          padding: const EdgeInsets.only(
              left: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(replyData.replyContent),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.arrow_upward),
                        onPressed: () {},
                      ),
                      Text('${replyData.upvotes}'),
                      IconButton(
                        icon: const Icon(Icons.arrow_downward),
                        onPressed: () {},
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// Represents a reply to a comment.
class ReplyData {
  final String username;
  final String replyContent;
  final int upvotes;
  final int downvotes;

  /// Creates a new [ReplyData] instance.
  ///
  /// The [username], [replyContent], [upvotes], and [downvotes] parameters are required.
  ReplyData({
    required this.username,
    required this.replyContent,
    required this.upvotes,
    required this.downvotes,
  });
}
