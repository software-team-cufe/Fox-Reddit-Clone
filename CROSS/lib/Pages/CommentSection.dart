import 'package:flutter/material.dart';
import 'CommentCard.dart';
import 'package:image_picker/image_picker.dart';

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
          _buildCommentList(comments: initialComments),
        ],
      ),
    );
  }

  Widget _buildCommentList({required List<CommentData> comments, int depth = 0}) {
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: comments.length,
      itemBuilder: (BuildContext context, int index) {
        final comment = comments[index];
        return Padding(
          padding: EdgeInsets.only(left: 16.0 * depth),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CommentCard(
                username: comment.username,
                commentContent: comment.content,
                votes: comment.votes,
                onReply: () {},
                onViewMenu: () {}, replies: [],
              ),
              if (comment.replies.isNotEmpty)
                _buildCommentList(comments: comment.replies, depth: depth + 1),
            ],
          ),
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
          replies: [],
        ),
      ],
    ),
  ];
}
