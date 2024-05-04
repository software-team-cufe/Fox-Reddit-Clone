import 'package:flutter/material.dart';

class PostDetailsPage extends StatelessWidget {
  final Map<String, dynamic> post;

  const PostDetailsPage({Key? key, required this.post}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Post Details'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              post['title'] ?? 'No Title',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Text(
              post['textHTML'] ?? 'No Content',
              style: TextStyle(fontSize: 18),
            ),
            ],
        ),
      ),
    );
  }
}
