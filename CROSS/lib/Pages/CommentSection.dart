import 'package:flutter/material.dart';
import 'CommentCard.dart';
import 'package:image_picker/image_picker.dart';

/// A widget that displays the comment section for a post.
class CommentSection extends StatelessWidget {
  final String postId;

  /// Creates a [CommentSection] widget.
  ///
  /// The [postId] parameter is required and specifies the ID of the post.
  const CommentSection({
    super.key,
    required this.postId,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Add a field to enter a new comment
          _buildNewCommentField(),
          const SizedBox(height: 8),
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

  /// Builds the field for entering a new comment.
 Widget _buildNewCommentField() {
  final TextEditingController _textController = TextEditingController();
  final ImagePicker _picker = ImagePicker();
  String? _selectedImage;

  void _selectImage() async {
    final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      _selectedImage = pickedFile.path;
      _textController.text = 'Selected Image: ${pickedFile.path}';
    }
  }

  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(8), // Adjust the radius as needed
    ),
    child: Row(
      children: [
        Expanded(
          child: TextField(
            controller: _textController,
            decoration: InputDecoration(
              isDense: true,
              hintText: 'Enter a comment...',
              border: OutlineInputBorder(),
            ),
            // Add your comment logic here
            // For example, onChanged or onSubmitted callbacks
          ),
        ),
        const SizedBox(width: 8),
        IconButton(
          icon: const Icon(Icons.photo),
          onPressed: _selectImage,
        ),
        const SizedBox(width: 8),
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


  /// Shows the menu options for a comment
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
          ],
        );
      },
    );
  }
}
