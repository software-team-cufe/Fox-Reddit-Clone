import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'CommentWidget.dart'; // Import the CommentWidget file
import 'package:share/share.dart';

class PostDetails extends StatelessWidget {
  final String redditName;
  final String title;
  final String? picture;
  final int votes;
  final int commentsNo;
  final int? creatorId;
  // Add other parameters here

  const PostDetails({
    super.key,
    required this.redditName,
    required this.title,
    this.picture,
    required this.votes,
    required this.commentsNo,
    required this.creatorId,
    // Add other parameters here
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Post Details"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Display the author's avatar and username
            
            GestureDetector(
              /*
              onTap: () {
                // Navigate to the poster's account page
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ProfilePage(user_Id: creatorId)),
                );
              },
                */
              child: Row(
                children: [
                  _buildAvatarIcon(),
                  const SizedBox(width: 8),
                  Text(
                    redditName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors
                          .blue, // Optional: Change color to indicate it's clickable
                    ),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 16),
            // Display the post title
            Text(
              title,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            // Display the post image if available
            if (picture != null && picture!.isNotEmpty)
              Image.network(
                picture!,
                width: double.infinity,
                height: 400,
                fit: BoxFit.cover,
              ),

            // Display the post actions (e.g., reply, upvote, downvote)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Display the reply, upvote, and downvote buttons
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_upward),
                      onPressed: () {},
                    ),
                    Text(
                      "$votes",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    IconButton(
                      icon: const Icon(Icons.arrow_downward),
                      onPressed: () {},
                    ),
                  ],
                ),
                // Display the comment count and share button
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "$commentsNo",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const Icon(Icons.comment),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.share),
                        onPressed: () {
                          String postUrl =
                              'https://example.com/posts/'; // Replace with your actual post URL
                          Share.share('$title\n$postUrl');
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Display the first comment
            CommentWidget(
              username: "User1",
              pfp: "",
              content: "This is a comment.",
              upvotes: 10,
              downvotes: 5,
              context: context,
              comments: const [
                "Reply 1",
                "Reply 2",
              ],
            ),
            // Display the second comment
            CommentWidget(
              username: "User2",
              pfp: "",
              content: "Another comment here.",
              upvotes: 15,
              downvotes: 3,
              context: context,
              comments: const [
                "Comment A",
                "Comment B",
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
          child: _buildNewCommentField(context),
        ),
      ),
    );
  }

  /// Builds the avatar icon widget.
  Widget _buildAvatarIcon() {
    return const CircleAvatar(
      radius: 16,
      child: Icon(Icons.account_circle),
    );
  }

  Widget _buildNewCommentField(BuildContext context) {
    TextEditingController commentController = TextEditingController();

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: commentController,
              decoration: const InputDecoration(
                hintText: 'Write a comment...',
                border: OutlineInputBorder(),
              ),
              keyboardType:
                  TextInputType.multiline, // Allow multiline text input
              maxLines: null, // Allow the TextField to expand as needed
              textInputAction:
                  TextInputAction.newline, // Enter key creates a new line
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Handle sending the comment here
                String commentText = commentController.text;
                if (commentText.isNotEmpty) {
                  // Send the comment logic
                  commentController
                      .clear(); // Clear the text field after sending
                }
              },
              child: const Text('Send'),
            ),
          ],
        ),
      ),
    );
  }
}
