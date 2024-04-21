import 'package:flutter/material.dart';

/// A screen widget for enabling or disabling archive functionality for posts.
class ArchivePostsScreen extends StatefulWidget {
  /// Constructor for the ArchivePostsScreen.
  const ArchivePostsScreen({Key? key}) : super(key: key);

  @override
  _ArchivePostsScreenState createState() => _ArchivePostsScreenState();
}

class _ArchivePostsScreenState extends State<ArchivePostsScreen> {
  bool _archiveEnabled = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Archive Posts'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Enable Archive Posts',
              style: Theme.of(context).textTheme.headline6,
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Archive Posts'),
                Switch(
                  value: _archiveEnabled,
                  onChanged: (value) {
                    setState(() {
                      _archiveEnabled = value;
                    });
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
