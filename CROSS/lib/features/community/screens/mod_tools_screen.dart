import "package:flutter/material.dart";
import "package:routemaster/routemaster.dart";
//general
import 'package:reddit_fox/features/community/screens/welcome_message_edit.dart';
import 'package:reddit_fox/features/community/screens/insights.dart';
import 'package:reddit_fox/features/community/screens/mod_log.dart';
import 'package:reddit_fox/features/community/screens/community_icon.dart';
import 'package:reddit_fox/features/community/screens/description.dart';
import 'package:reddit_fox/features/community/screens/post_types.dart';
import 'package:reddit_fox/features/community/screens/discovery.dart';
//import 'package:reddit_fox/features/community/screens/modmail.dart';
import 'package:reddit_fox/features/community/screens/mod_notifications.dart';
import 'package:reddit_fox/features/community/screens/archive_posts.dart';
import 'package:reddit_fox/features/community/screens/media_in_comments.dart';

//content and regulation
import 'queues_screen.dart';
import 'rules_screen.dart';
import 'removal_reasons_screen.dart';
import 'post_flair_screen.dart';
import 'safety_screen.dart';

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
              leading: const Icon(Icons.info),
              title: const Text('Insights'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const InsightsScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.history),
              title: const Text('Mod Log'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const ModLogScreen(),
                ));
              },
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
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'CONTENT AND REGUALTION',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.queue),
              title: const Text('Queues'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const QueuesScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.format_list_numbered),
              title: const Text('Rules'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const RulesScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.close),
              title: const Text('Removal Reasons'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const RemovalReasonsScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.local_offer),
              title: const Text('Post Flair'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const PostFlairScreen(),
                ));
              },
            ),
            ListTile(
              leading: const Icon(Icons.key),
              title: const Text('Safety'),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const SafetyScreen(),
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
              leading: const Icon(Icons.check_circle),
              title: const Text('Approved Users'),
              onTap: () {
                // Navigate to Approved Users screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.volume_off),
              title: const Text('Muted Users'),
              onTap: () {
                // Navigate to Muted Users screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.block),
              title: const Text('Banned Users'),
              onTap: () {
                // Navigate to Banned Users screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.local_offer),
              title: const Text('User Flair'),
              onTap: () {
                // Navigate to User Flair screen
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
            const SizedBox(height: 20), // Adjust the height as needed

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
