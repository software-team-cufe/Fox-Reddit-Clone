import "package:flutter/material.dart";
import "package:routemaster/routemaster.dart";

import 'package:reddit_fox/features/community/screens/modtools/community_icon.dart';
import 'package:reddit_fox/features/community/screens/modtools/description.dart';
import 'package:reddit_fox/features/community/screens/modtools/post_types.dart';

class ModToolsScreen extends StatelessWidget {
  final String name;
  const ModToolsScreen({
    super.key,
    required this.name,
  });

  void navigateToModTools(BuildContext context) {
    Navigator.pushNamed(context, '/edit-community/$name');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mod Tools'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'GENERAL',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('Edit Community'),
              onTap: () => navigateToModTools(context),
            ),
            ListTile(
              leading: const Icon(Icons.image),
              title: const Text('Community Icon'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const CommunityIconScreen(
                    subreddit: '',
                  ),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.description),
              title: const Text('Description'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const DescriptionScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.article),
              title: const Text('Post Types'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const PostTypesScreen(),
                ));
              },
            ),
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'USER MANAGEMENT',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.shield),
              title: const Text('Moderators'),
              onTap: () {
                // Navigate to Moderators screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.block),
              title: const Text('Banned Users'),
              onTap: () {
                // Navigate to Banned Users screen
              },
            ),
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'USER MANAGEMENT',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.emoji_events),
              title: const Text('Fox for Community'),
              onTap: () {
                // Navigate to Fox for Community screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.help),
              title: const Text('Mod Help Center'),
              onTap: () {
                // Navigate to Mod Help Center screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.format_list_numbered),
              title: const Text('Mod Code of Conduct'),
              onTap: () {
                // Navigate to Mod Code of Conduct screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.support),
              title: const Text('r/modsupport'),
              onTap: () {
                // Navigate to r/modsupport screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.help_outline),
              title: const Text('r/modhelp'),
              onTap: () {
                // Navigate to r/modhelp screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.contact_support),
              title: const Text('Contact Fox'),
              onTap: () {
                // Navigate to Contact Fox screen or open contact options
              },
            ),
            const SizedBox(height: 20),

            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'Can\'t find something? Visit fox.com on desktop',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
