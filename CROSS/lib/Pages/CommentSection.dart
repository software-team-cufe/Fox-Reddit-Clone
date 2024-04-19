import 'package:flutter/material.dart';
import 'CommentCard.dart'; // Import the CommentCard.dart file

class CommentSection extends StatelessWidget {
  final String postId;

  const CommentSection({
    Key? key,
    required this.postId,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Add a field to enter a new comment
          _buildNewCommentField(),
          const SizedBox(height: 1),
          // Add the comment section below
          // Wrap ListView.builder with SingleChildScrollView
          SingleChildScrollView(
            child: ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 5, // Replace with your actual comment count
              itemBuilder: (BuildContext context, int index) {
                // Replace this with your actual comment widget
                return CommentCard(
                  username: 'User $index',
                  commentContent: 'Comment $index content',
                  upvotes: index * 10,
                  downvotes: index * 5,
                  onReply: () {
                    // Handle reply action
                  },
                  onViewMenu: () {
                    // Handle view menu action
                    _showMenu(context);
                  },
                  replies: [],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNewCommentField() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          const Expanded(
            child: TextField(
              decoration: InputDecoration(
                isDense: true,
                hintText: 'Write a comment...',
                border: OutlineInputBorder(),
              ),
              // Add your comment logic here
              // For example, onChanged or onSubmitted callbacks
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send),
            onPressed: () {
              // Add your send comment logic here
            },
          ),
        ],
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
              leading: Icon(Icons.share),
              title: Text('Share'),
              onTap: () {
                Navigator.pop(context);
                // Handle share action
              },
            ),
            ListTile(
              leading: Icon(Icons.save),
              title: Text('Save'),
              onTap: () {
                Navigator.pop(context);
                // Handle save action
              },
            ),
            ListTile(
              leading: Icon(Icons.notifications),
              title: Text('Get Reply Notifications'),
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
}
