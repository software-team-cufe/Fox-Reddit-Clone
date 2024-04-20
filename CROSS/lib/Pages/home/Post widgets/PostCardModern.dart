import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';

class ModernCard extends StatelessWidget {
  final Map<String, dynamic> post;

  const ModernCard({
    Key? key,
    required this.post,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    bool isBlurred = (post['nsfw'] || post['spoiler']);

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PostDetails(post: post),
          ),
        );
      },
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ProfilePage(
                          user_Id: post['creatorId'].toString(),
                        ),
                      ),
                    );
                  },
                  child: Row(
                    children: [
                      const CircleAvatar(
                        radius: 16,
                        child: Icon(Icons.account_circle),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        post['redditName'],
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.blue,
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(), // Added Spacer
                IconButton(
                  icon: const Icon(Icons.more_vert), // Menu icon
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      builder: (BuildContext context) {
                        return Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            ListTile(
                              leading: const Icon(Icons.bookmark), 
                              title: const Text('Save'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.content_copy), 
                              title: const Text('Copy text'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 2
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.call_split), 
                              title: const Text('Crosspost to community'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.flag), 
                              title: const Text('Report'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.person_off), 
                              title: const Text('Block account'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                            ListTile(
                              leading: const Icon(Icons.visibility_off), 
                              title: const Text('Hide'),
                              onTap: () {
                                Navigator.pop(context); // Close the menu
                                // Handle option 1
                              },
                            ),
                          ],
                        );
                      },
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              post['title'],
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Row(
              children: [
                if (post['nsfw'])
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
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
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
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
            const SizedBox(height: 8),
            if (post['picture'] != null && post['picture']!.isNotEmpty)
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Image.network(
                      post['picture']!,
                      width: double.infinity,
                      height: 400,
                      fit: BoxFit.cover,
                      color: isBlurred
                          ? const Color.fromARGB(0, 158, 158, 158)
                          : null,
                      colorBlendMode:
                          isBlurred ? BlendMode.saturation : BlendMode.dst,
                    ),
                    if (isBlurred)
                      BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          color:
                              const Color.fromARGB(0, 0, 0, 0).withOpacity(0),
                          width: double.infinity,
                          height: 400,
                        ),
                      ),
                  ],
                ),
              ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: isBlurred ? Colors.white : Colors.transparent,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                post['description'],
                style: TextStyle(
                  fontSize: 16,
                  color: isBlurred ? Colors.transparent : Colors.white,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_upward),
                      onPressed: () {},
                    ),
                    Text(
                      "${post['votes']}",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    IconButton(
                      icon: const Icon(Icons.arrow_downward),
                      onPressed: () {},
                    ),
                  ],
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 40.0, right: 4.0),
                        child: Text(
                          "${post['commentsNo']}",
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                      const Icon(Icons.comment),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.share),
                        onPressed: () {
                          int postId = post['id'];
                          String postUrl =
                              'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                          Share.share('${post['title']}\n$postUrl');
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Divider(
              height: 1,
              color: Colors.grey[300],
              thickness: 1,
              indent: 1,
              endIndent: 1,
            ),
          ],
        ),
      ),
    );
  }
}
