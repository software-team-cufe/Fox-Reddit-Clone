import 'package:flutter/material.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'CommentCard.dart';
import 'package:image_picker/image_picker.dart';
 import 'package:http/http.dart' as http;
  import 'dart:convert';
  
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

class CommentSection extends StatelessWidget {
  final String postId;
  final TextEditingController commentController = TextEditingController();
    final access_token;

  CommentSection({
    super.key,
    required this.postId,
    required this.access_token,
  });

  void _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      // Handle the picked image file
    } else {
      // Handle if no image was picked
    }
  }

Future<void> createComment(String linkID, String textHTML, String textJSON) async {
  try {
    // Add 't3_' before the post ID
    String formattedLinkID = 't3_$linkID';

    // API endpoint URL
    String apiUrl = ApiRoutesBackend.addComment;

    final response = await http.post(
      Uri.parse(apiUrl),
      body: json.encode({
        'linkID': formattedLinkID, // Use the formatted link ID
        'textHTML': textHTML,
        'textJSON': textJSON,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $access_token',
      },
    );

    if (response.statusCode == 200) {
    } else {
    }
  } catch (error) {
  }
}

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildNewCommentField(),
              _buildCommentList(comments: initialComments),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildNewCommentField() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: commentController,
              decoration: const InputDecoration(
                hintText: 'Write a new comment...',
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.camera_alt),
            onPressed: () {
              // Add your logic here to handle adding an image as a comment
              _pickImage();
            },
          ),
          IconButton(
            icon: const Icon(Icons.send),
            onPressed: () {
              // Add your logic here to handle sending the comment
              String newComment = commentController.text;
              commentController.clear();
              // Call a function to handle adding the new comment
                createComment(postId, newComment, newComment);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCommentList({
    required List<CommentData> comments,
    int depth = 0,
  }) {
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: comments.length,
      itemBuilder: (BuildContext context, int index) {
        final comment = comments[index];
        final double indent = 16.0 * depth;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(left: indent),
              decoration: const BoxDecoration(
                border: Border(
                  left: BorderSide(
                    color: Colors.grey, // Grey vertical line
                    width: 2.0,
                  ),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: CommentCard(
                      username: comment.username,
                      commentContent: comment.content,
                      votes: comment.votes,
                      onReply: () {},
                      onViewMenu: () {},
                      replies: [],
                    ),
                  ),
                ],
              ),
            ),
            Column(
              children: [
                if (comment.replies.isNotEmpty)
                  _buildCommentList(
                    comments: comment.replies,
                    depth: depth + 1,
                  ),
                if (comment.replies.isEmpty)
                  Container(
                    height: 10.0,
                  ),
              ],
            ),
          ],
        );
      },
    );
  }

  // Dummy data for initial comments, replace this with your actual data
  List<CommentData> get initialComments => [
        CommentData(
          username: 'User 1',
          content: 'Comment 1 content',
          votes: 10,
          replies: [
            CommentData(
              username: 'User 2',
              content: 'Reply to comment 1',
              votes: 5,
              replies: [
                // Adding a reply to the reply of comment 1
                CommentData(
                  username: 'User 3',
                  content: 'Another reply to comment 1',
                  votes: 3,
                  replies: [],
                ),
              ],
            ),
          ],
        ),
        CommentData(
          username: 'User 4',
          content: 'Comment 2 content',
          votes: 8,
          replies: [
            // Adding a reply to comment 2
            CommentData(
              username: 'User 5',
              content: 'Reply to comment 2',
              votes: 4,
              replies: [
                CommentData(
                  username: 'User 2',
                  content: 'Reply to comment 1',
                  votes: 5,
                  replies: [
                    // Adding a reply to the reply of comment 1
                    CommentData(
                      username: 'User 3',
                      content: 'Another reply to comment 1',
                      votes: 3,
                      replies: [],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        CommentData(
          username: 'User 1',
          content: 'Comment 1 content',
          votes: 10,
          replies: [
            CommentData(
              username: 'User 2',
              content: 'Reply to comment 1',
              votes: 5,
              replies: [
                // Adding a reply to the reply of comment 1
                CommentData(
                  username: 'User 3',
                  content: 'Another reply to comment 1',
                  votes: 3,
                  replies: [],
                ),
              ],
            ),
          ],
        ),
        CommentData(
          username: 'User 4',
          content: 'Comment 2 content',
          votes: 8,
          replies: [
            // Adding a reply to comment 2
            CommentData(
              username: 'User 5',
              content: 'Reply to comment 2',
              votes: 4,
              replies: [],
            ),
          ],
        ),
      ];
}
