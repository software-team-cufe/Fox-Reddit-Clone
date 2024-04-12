import "package:flutter/material.dart";
import "package:routemaster/routemaster.dart";
import 'package:reddit_fox/features/community/screens/welcome_message_edit.dart';
import 'package:reddit_fox/features/community/screens/insights.dart';
import 'package:reddit_fox/features/community/screens/mod_log.dart';
import 'package:reddit_fox/features/community/screens/community_icon.dart';
import 'package:reddit_fox/features/community/screens/description.dart';
import 'package:reddit_fox/features/community/screens/post_types.dart';
import 'package:reddit_fox/features/community/screens/discovery.dart';
import 'package:reddit_fox/features/community/screens/modmail.dart';
import 'package:reddit_fox/features/community/screens/mod_notifications.dart';
import 'package:reddit_fox/features/community/screens/archive_posts.dart';
import 'package:reddit_fox/features/community/screens/media_in_comments.dart';

class ModToolsScreen extends StatelessWidget {
  final String name;
  const ModToolsScreen({
    super.key,
    required this.name,
  });

  void navigateToModTools(BuildContext context) {
    Routemaster.of(context).push('/edit-community/$name');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mod Tools'),
      ),
      body: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.add_moderator),
            title: const Text('Add Moderator'),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(Icons.edit),
            title: const Text('Edit Community'),
            onTap: () => navigateToModTools(context),
          ),
          ListTile(
            leading: const Icon(Icons.info),
            title: const Text('Insights'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => InsightsScreen(),
              ));
            },
          ),
          ListTile(
            leading: const Icon(Icons.history),
            title: const Text('Mod Log'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => ModLogScreen(),
              ));
            },
          ),
          ListTile(
            leading: const Icon(Icons.image),
            title: const Text('Community Icon'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => CommunityIconScreen(),
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
            leading: const Icon(Icons.message),
            title: const Text('Welcome Message'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => const WelcomeMessageEditScreen(),
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
          ListTile(
            leading: const Icon(Icons.explore),
            title: const Text('Discovery'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => const DiscoveryScreen(),
              ));
            },
          ),
      //modmail goes here
          ListTile(
            leading: const Icon(Icons.notifications),
            title: const Text('Mod Notifications'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => const ModNotificationsScreen(),
              ));
            },
          ),
          ListTile(
            leading: const Icon(Icons.archive),
            title: const Text('Archive Posts'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => const ArchivePostsScreen(),
              ));
            },
          ),
          ListTile(
            leading: const Icon(Icons.photo),
            title: const Text('Media in Comments'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(
                builder: (context) => const MediaInCommentsScreen(),
              ));
            },
          ),
        ],
      ),
    );
  }
}
