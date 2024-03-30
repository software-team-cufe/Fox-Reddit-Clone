import 'package:flutter/material.dart';

class CreateCommentsPage extends StatefulWidget {
  const CreateCommentsPage({super.key});

  @override
  _CreateCommentsPageState createState() => _CreateCommentsPageState();
}

class _CreateCommentsPageState extends State<CreateCommentsPage> {
  TextEditingController _commentController = TextEditingController();

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  void _submitComment() {
    String comment = _commentController.text.trim();
    if (comment.isNotEmpty) {
      print('Submitted comment: $comment');

      _commentController.clear();

      Navigator.pop(context);
    } else {
      print('Comment cannot be empty');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Comment'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _commentController,
              decoration: const InputDecoration(
                hintText: 'Enter your comment',
              ),
              maxLines: null,
              keyboardType: TextInputType.multiline,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitComment,
              child: const Text('Post Comment'),
            ),
          ],
        ),
      ),
    );
  }
}
