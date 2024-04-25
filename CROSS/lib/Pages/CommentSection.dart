import 'package:flutter/material.dart';
import 'CommentCard.dart';
import 'package:image_picker/image_picker.dart';

// Sample class for comment data
class CommentData {
  final String username;
  final String content;
  final int upvotes;
  final int downvotes;
  final List<CommentData> replies;

  CommentData({
    required this.username,
    required this.content,
    required this.upvotes,
    required this.downvotes,
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
                upvotes: comment.upvotes,
                downvotes: comment.downvotes,
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
      upvotes: 10,
      downvotes: 5,
      replies: [
        CommentData(
          username: 'User 2',
          content: 'Reply to comment 1',
          upvotes: 5,
          downvotes: 2,
          replies: [
            // Adding a reply to the reply of comment 1
            CommentData(
              username: 'User 3',
              content: 'Another reply to comment 1',
              upvotes: 3,
              downvotes: 1,
              replies: [],
            ),
          ],
        ),
      ],
    ),
    CommentData(
      username: 'User 4',
      content: 'Comment 2 content',
      upvotes: 8,
      downvotes: 3,
      replies: [
        // Adding a reply to comment 2
        CommentData(
          username: 'User 5',
          content: 'Reply to comment 2',
          upvotes: 4,
          downvotes: 0,
          replies: [],
        ),
      ],
    ),
  ];
}
