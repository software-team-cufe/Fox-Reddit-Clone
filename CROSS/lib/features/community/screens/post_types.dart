import 'package:flutter/material.dart';

class PostTypesScreen extends StatefulWidget {
  const PostTypesScreen({super.key});

  @override
  _PostTypesScreenState createState() => _PostTypesScreenState();
}

class _PostTypesScreenState extends State<PostTypesScreen> {
  bool _imageLinksSelected = false;
  bool _videoLinksSelected = false;
  bool _pollPostsSelected = false;

  void _toggleImageLinks() {
    setState(() {
      _imageLinksSelected = !_imageLinksSelected;
    });
  }

  void _toggleVideoLinks() {
    setState(() {
      _videoLinksSelected = !_videoLinksSelected;
    });
  }

  void _togglePollPosts() {
    setState(() {
      _pollPostsSelected = !_pollPostsSelected;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Post Types'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Select Post Types:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          ListTile(
            title: const Text('Image Links'),
            trailing: Switch(
              value: _imageLinksSelected,
              onChanged: (value) {
                _toggleImageLinks();
              },
            ),
          ),
          ListTile(
            title: const Text('Video Links'),
            trailing: Switch(
              value: _videoLinksSelected,
              onChanged: (value) {
                _toggleVideoLinks();
              },
            ),
          ),
          ListTile(
            title: const Text('Poll Posts'),
            trailing: Switch(
              value: _pollPostsSelected,
              onChanged: (value) {
                _togglePollPosts();
              },
            ),
          ),
        ],
      ),
    );
  }
}
