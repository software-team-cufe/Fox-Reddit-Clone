import 'package:flutter/material.dart';

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
    Key? key,
    required this.username,
    required this.commentContent,
    required this.upvotes,
    required this.downvotes,
    required this.onReply,
    required this.replies,
    required Null Function() onViewMenu,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.symmetric(vertical: 2),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const CircleAvatar(
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
                IconButton(
                  icon: const Icon(Icons.more_vert),
                  onPressed: () {
                    _showMenu(context);
                  },
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(commentContent),
            const SizedBox(height: 8),
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_upward),
                  onPressed: () {},
                ),
                Text('$upvotes'),
                IconButton(
                  icon: const Icon(Icons.arrow_downward),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.reply),
                  onPressed: onReply, // Trigger reply action
                ),
              ],
            ),
            // Display replies here with indentation
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: replies
                  .map((reply) => Padding(
                        padding: const EdgeInsets.only(left: 16), // Indentation
                        child: _buildReply(reply),
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
