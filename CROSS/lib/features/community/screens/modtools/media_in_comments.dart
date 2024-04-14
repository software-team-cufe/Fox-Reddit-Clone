import 'package:flutter/material.dart';

class MediaInCommentsScreen extends StatefulWidget {
  const MediaInCommentsScreen({super.key});

  @override
  _MediaInCommentsScreenState createState() => _MediaInCommentsScreenState();
}

class _MediaInCommentsScreenState extends State<MediaInCommentsScreen> {
  bool showGiphy = false;
  bool showImages = false;
  bool showGifs = false;
  bool showCollectibleExpressions = false;

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
              value: showGiphy,
              onChanged: (value) {
                setState(() {
                  showGiphy = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show Images'),
            trailing: Switch(
              value: showImages,
              onChanged: (value) {
                setState(() {
                  showImages = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show GIFs'),
            trailing: Switch(
              value: showGifs,
              onChanged: (value) {
                setState(() {
                  showGifs = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Show Collectible Expressions'),
            trailing: Switch(
              value: showCollectibleExpressions,
              onChanged: (value) {
                setState(() {
                  showCollectibleExpressions = value;
                });
              },
            ),
          ),
        ],
      ),
    );
  }
}
