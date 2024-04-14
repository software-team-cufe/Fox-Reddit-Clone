import 'package:flutter/material.dart';
import 'package:share/share.dart';

class CommentWidget extends StatelessWidget {
  final String username;
  final String pfp;
  final String content;
  final int upvotes;
  final int downvotes;
  final BuildContext context;
  final List<String> comments;

  const CommentWidget({
    super.key,
    required this.username,
    required this.pfp,
    required this.content,
    required this.upvotes,
    required this.downvotes,
    required this.context,
    required this.comments,
  });

  @override
  Widget build(BuildContext context) {
    return _buildComment();
  }

  Widget _buildComment() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Display the comment author's avatar and username
        Row(
          children: [
            _buildAvatarIcon(),
            const SizedBox(width: 8),
            Text(
              username,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Display the comment content
        Text(
          content,
          style: const TextStyle(fontSize: 16),
        ),
        const SizedBox(height: 8),
        // Display the comment actions (e.g., upvote, downvote, reply, share)
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_upward),
              onPressed: () {},
            ),
            Text(upvotes.toString()),
            IconButton(
              icon: const Icon(Icons.arrow_downward),
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.reply),
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.share),
              onPressed: () {
                _showBottomMenu(context);
              },
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Display the comment's replies
        ...comments.map((comment) => _buildCommentWidget(comment)),
      ],
    );
  }

  Widget _buildAvatarIcon() {
    return const CircleAvatar(
      radius: 16,
      child: Icon(Icons.account_circle),
    );
  }

  Widget _buildCommentWidget(String comment) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32.0),
      child: Row(
        children: [
          const SizedBox(width: 24),
          Text(
            comment,
            style: const TextStyle(fontSize: 14, fontStyle: FontStyle.italic),
          ),
        ],
      ),
    );
  }

  void _showBottomMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Display the menu items
            _buildMenuItem(context, Icons.share, "Share"),
            _buildMenuItem(context, Icons.save, "Save"),
            _buildMenuItem(
                context, Icons.notifications, "Get Reply Notification"),
            _buildMenuItem(context, Icons.copy, "Copy Text"),
            _buildMenuItem(context, Icons.close_fullscreen, "Collapse Thread"),
            _buildMenuItem(context, Icons.person_off, "Block Account"),
            _buildMenuItem(context, Icons.flag, "Report"),
          ],
        );
      },
    );
  }

  Widget _buildMenuItem(BuildContext context, IconData icon, String label) {
    return ListTile(
      leading: Icon(icon),
      title: Text(label),
      onTap: () {
        Navigator.pop(context); // Close the bottom menu sheet

        // Handle the action based on the selected menu item
        if (label == "Share") {
          _handleShareAction();
        } else if (label == "Save") {
          _handleSaveAction();
        } else if (label == "Get Reply Notification") {
          _handleNotificationAction();
        } else if (label == "copy Text") {
          _handleCopyAction();
        } else if (label == "collapse Thread") {
          _handleCollapseAction();
        } else if (label == "Block Account") {
          _handleBlockAction();
        } else if (label == "Report") {
          _handleReportAction();
        }
      },
    );
  }

  void _handleShareAction() {
    // Implement the logic for sharing the comment
    String postUrl =
        'https://example.com/posts/'; // Replace with your actual post URL
    Share.share('\n$postUrl');
  }

  void _handleSaveAction() {
    // Implement the logic for saving the comment
    // For example, you could add the comment to a list of saved comments
  }

  void _handleNotificationAction() {
    // Implement the logic for getting reply notifications
  }

  void _handleCopyAction() {
    // Implement the logic for getting reply notifications
    // For example, you could subscribe to notifications for replies to this comment
  }
  void _handleCollapseAction() {
    // Implement the logic for getting reply notifications
    // For example, you could subscribe to notifications for replies to this comment
  }
  void _handleBlockAction() {
    // Implement the logic for getting reply notifications
    // For example, you could subscribe to notifications for replies to this comment
  }
  void _handleReportAction() {
    // Implement the logic for getting reply notifications
    // For example, you could subscribe to notifications for replies to this comment
  }
}
