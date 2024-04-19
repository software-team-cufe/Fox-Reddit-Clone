import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';

class PostCard extends StatelessWidget {
  final Map<String, dynamic> post;

  const PostCard({Key? key, required this.post}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
          trailing: post['picture'] != null &&
                  (post['nsfw'] || post['spoiler'])
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: SizedBox(
                    width: 100,
                    height: 200,
                    child: BackdropFilter(
                      filter: ImageFilter.blur(
                        sigmaX: 10,
                        sigmaY: 10,
                      ),
                      child: Container(
                        color: const Color.fromARGB(0, 0, 0, 0).withOpacity(0),
                        child: Image.network(
                          post['picture'],
                          width: double.infinity,
                          height: 250,
                          fit: BoxFit.cover,
                          colorBlendMode: BlendMode.saturation,
                        ),
                      ),
                    ),
                  ),
                )
              : ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: post['picture'] != null
                      ? Image.network(
                          post['picture'],
                          width: 100,
                          height: 250,
                          fit: BoxFit.cover,
                        )
                      : null,
                ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PostDetails(redditName: post['redditName'],
                              title: post['title'],
                              picture: post['picture'],
                              votes: post['votes'],
                              commentsNo: post['commentsNo'],
                              creatorId: post['creatorId'],
                              postId: post['id'],
                              nsfw: post['nsfw'],
                              description: post['description'],
                              spoiler: post['spoiler'],),
                              ),
            );
          },
        ),
        Row(
          children: [
            if (post['nsfw'])
              Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                  margin: const EdgeInsets.only(right: 0, left: 15),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text(
                    'NSFW',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            if (post['spoiler'])
              Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                  margin: const EdgeInsets.only(left: 15),
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 137, 137, 137),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text(
                    'Spoiler',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
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
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
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
