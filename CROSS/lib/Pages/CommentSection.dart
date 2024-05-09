import 'package:flutter/material.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'CommentCard.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CommentSection extends StatefulWidget {
  final String postId;
  final String? access_token;

  CommentSection({
    Key? key,
    required this.postId,
    required this.access_token,
  }) : super(key: key);

  @override
  _CommentSectionState createState() => _CommentSectionState();
}

class _CommentSectionState extends State<CommentSection> {
  final TextEditingController commentController = TextEditingController();
  late List<Map<String, dynamic>> comments = [];

  @override
  void initState() {
    super.initState();
    fetchComments();
  }

  Future<void> fetchComments() async {
    try {
      // API endpoint URL
      String commentsUrl = ApiRoutesBackend.getPostbyId(widget.postId);

      final response = await http.get(
        Uri.parse(commentsUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${widget.access_token}',
        },
      );

      if (response.statusCode == 200) {
        // Parse responseData and update comments list
        setState(() {
          comments = json.decode(response.body).cast<Map<String, dynamic>>();
        });
      } else {
        // Handle error response
        print('Failed to fetch comments: ${response.statusCode}');
        print(response.body);
      }
    } catch (error) {
      print('Error fetching comments: $error');
    }
  }

  List<CommentData> parseComments(dynamic responseData) {
    // Parse responseData and return list of CommentData objects
    // Example parsing logic:
    List<CommentData> parsedComments = [];
    for (var comment in responseData['postComments']) {
      parsedComments.add(CommentData(
        username: comment['username'],
        content: comment['textHTML'],
        votes: comment['votesCount'],
        replies: [], // You may need to parse replies recursively
      ));
    }
    return parsedComments;
  }

  void _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      // Handle the picked image file
    } else {
      // Handle if no image was picked
    }
  }

  Future<void> createComment(
      String linkID, String textHTML, String textJSON) async {
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
          'Authorization': 'Bearer ${widget.access_token}',
        },
      );

      if (response.statusCode == 200) {
        print('comment created');
      } else {}
    } catch (error) {
      print('comment not created');
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
              createComment(widget.postId, newComment, newComment);
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
    if (comments.isNotEmpty) {
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
    } else {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
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
