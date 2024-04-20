import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';

/// A widget that represents a post card in the home page.
class ClassicCard extends StatelessWidget {
  final Map<String, dynamic> post;

  /// Constructs a [ClassicCard] widget.
  ///
  /// The [post] parameter is required and contains the data for the post.
  const ClassicCard({Key? key, required this.post}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    bool isBlurred = (post['nsfw'] || post['spoiler']);

    return Column(
      children: [
        ListTile(
          contentPadding: const EdgeInsets.all(16),
          leading: post['redditpic'] != null
              ? CircleAvatar(
                  backgroundImage: NetworkImage(post['redditpic']),
                )
              : null,
          title: Text(
            post['redditName'],
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          subtitle: Text(
            post['title'],
            style: const TextStyle(fontSize: 16),
          ),
          trailing: post['picture'] != null
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Stack(
                    children: [
                      Image.network(
                        post['picture'],
                        width: 100,
                        height: 250,
                        fit: BoxFit.cover,
                      ),
                      if (isBlurred)
                        BackdropFilter(
                          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                          child: Container(
                            color: Colors.transparent,
                            width: 100,
                            height: 250,
                          ),
                        ),
                    ],
                  ),
                )
              : null,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PostDetails(post: post),
              ),
            );
          },
        ),
        Row(
          children: [
            if (post['nsfw'])
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                margin: const EdgeInsets.only(top: 4, right: 4),
                decoration: BoxDecoration(
                  color: Colors.red,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'NSFW',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            if (post['spoiler'])
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                margin: const EdgeInsets.only(top: 4),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 137, 137, 137),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'Spoiler',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_upward),
              onPressed: () {
                // Implement upvote logic here
              },
            ),
            Text(post['votes'].toString()),
            IconButton(
              icon: const Icon(Icons.arrow_downward),
              onPressed: () {
                // Implement downvote logic here
              },
            ),
            const SizedBox(width: 2),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(width: 4),
                Text(
                  post['commentsNo'].toString(),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const Icon(Icons.comment),
                IconButton(
                  onPressed: () {
                    int postId = post['id'];
                    String postUrl =
                        'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                    Share.share('${post['title']}\n$postUrl');
                  },
                  icon: const Icon(Icons.share),
                ),
              ],
            ),
          ],
        ),
        Divider(
          height: 1,
          color: Colors.grey[300],
          thickness: 1,
          indent: 16,
          endIndent: 16,
        ),
      ],
    );
  }
}
