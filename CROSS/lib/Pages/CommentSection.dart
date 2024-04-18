import 'package:flutter/material.dart';

class CommentSection extends StatefulWidget {
  final String postId; // Identifier for the post
  const CommentSection({Key? key, required this.postId}) : super(key: key);

  @override
  _CommentSectionState createState() => _CommentSectionState();
}

class _CommentSectionState extends State<CommentSection> {
  final TextEditingController _commentController = TextEditingController();
  List<Comment> comments = []; // List to store comments fetched from API

  @override
  void initState() {
    super.initState();
    _fetchComments();
  }

  Future<void> _fetchComments() async {
    // Simulate fetching comments from an API
    // Replace this with your actual API call
    await Future.delayed(Duration(seconds: 2)); // Simulating a delay
    setState(() {
      comments = [
        Comment('Comment 1'),
        Comment('Comment 2'),
        Comment('Comment 3'),
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildNewCommentField(),
        Expanded(
          child: ListView.builder(
            itemCount: comments.length,
            itemBuilder: (context, index) {
              return _buildCommentItem(comments[index]);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildNewCommentField() {
    return Container(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _commentController,
              decoration: const InputDecoration(
                hintText: 'Add a new comment...',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          const SizedBox(width: 8.0),
          ElevatedButton(
            onPressed: () {
              _addComment();
            },
            child: const Text('Post'),
          ),
        ],
      ),
    );
  }

  Widget _buildCommentItem(Comment comment) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(comment.text),
          const SizedBox(height: 8.0),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.thumb_up),
                    onPressed: () {
                      _handleUpvote(comment);
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.thumb_down),
                    onPressed: () {
                      _handleDownvote(comment);
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.reply),
                    onPressed: () {
                      _handleReply(comment);
                    },
                  ),
                ],
              ),
              PopupMenuButton(
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    value: 'edit',
                    child: Text('Edit'),
                  ),
                  const PopupMenuItem(
                    value: 'delete',
                    child: Text('Delete'),
                  ),
                ],
                onSelected: (value) {
                  _handleMenuSelection(value, comment);
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _addComment() {
    if (_commentController.text.isNotEmpty) {
      setState(() {
        comments.add(Comment(_commentController.text));
        _commentController.clear();
      });
    }
  }

  void _handleUpvote(Comment comment) {
    // Implement upvote logic
  }

  void _handleDownvote(Comment comment) {
    // Implement downvote logic
  }

  void _handleReply(Comment comment) {
    // Implement reply logic
  }

  void _handleMenuSelection(String value, Comment comment) {
    // Implement menu item actions
  }
}

class Comment {
  final String text;

  Comment(this.text);
}
