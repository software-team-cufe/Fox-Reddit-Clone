import 'package:flutter/material.dart';

/// A screen for configuring media options in comments.
class MediaInCommentsScreen extends StatefulWidget {
  /// Constructor for the MediaInCommentsScreen.
  const MediaInCommentsScreen({super.key});

  @override
  _MediaInCommentsScreenState createState() => _MediaInCommentsScreenState();
}

class _MediaInCommentsScreenState extends State<MediaInCommentsScreen> {
  bool _showGiphy = false;
  bool _showImages = false;
  bool _showGifs = false;
  bool _showCollectibleExpressions = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Media in Comments'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            title: const Text('Show GIFs from GIPHY'),
            trailing: Switch(
              value: _showGiphy,
              onChanged: (value) {
                setState(() {
                  _showGiphy = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show Images'),
            trailing: Switch(
              value: _showImages,
              onChanged: (value) {
                setState(() {
                  _showImages = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show GIFs'),
            trailing: Switch(
              value: _showGifs,
              onChanged: (value) {
                setState(() {
                  _showGifs = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show Collectible Expressions'),
            trailing: Switch(
              value: _showCollectibleExpressions,
              onChanged: (value) {
                setState(() {
                  _showCollectibleExpressions = value;
                });
              },
            ),
          ),
        ],
      ),
    );
  }
}
