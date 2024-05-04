import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/VoteSection.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/pollWidget.dart';
import 'package:reddit_fox/Pages/post_details.dart';

/// A stateful widget that represents a post card in the home page.
class ClassicCard extends StatefulWidget {
  final Map<String, dynamic> post;

  /// Constructs a [ClassicCard] widget.
  ///
  /// The [post] parameter is required and contains the data for the post.
  const ClassicCard({super.key, required this.post});

  @override
  _ClassicCardState createState() => _ClassicCardState();
}

class _ClassicCardState extends State<ClassicCard> {
  bool isBlurred = false;

  @override
  void initState() {
    super.initState();
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler']);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PostDetails(post: widget.post),
          ),
        );
      },
      child: Column(
        children: [
          ListTile(
            contentPadding:
                const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
            title: Row(
              children: [
                widget.post['redditpic'] != null
                    ? CircleAvatar(
                        backgroundImage: NetworkImage(widget.post['redditpic']),
                      )
                    : const Icon(Icons.account_circle, size: 30),
                Text(
                  widget.post['redditName'],
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 8),
              ],
            ),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.post['title'],
                  style: const TextStyle(fontSize: 16),
                ),
                if (widget.post['picture'] == null)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 0),
                    child: Text(
                      widget.post['description'],
                      style: const TextStyle(fontSize: 16),
                    ),
                  ),
              ],
            ),
            trailing: widget.post['picture'] != null
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Stack(
                      children: [
                        Image.network(
                          widget.post['picture'],
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
          ),
          Row(
            children: [
              if (widget.post['nsfw'])
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  margin: const EdgeInsets.only(top: 4, right: 0, left: 16),
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
              if (widget.post['spoiler'])
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  margin: widget.post['nsfw']
                      ? const EdgeInsets.only(top: 4, left: 2)
                      : const EdgeInsets.only(top: 4, left: 16),
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
          if (widget.post['poll'] == true &&
              (widget.post['nsfw'] == false ||
                  widget.post['spoiler'] ==
                      false)) // Check if post has a poll and if it should be shown
            PollWidget(
              pollOptions: ['Option 1', 'Option 2', 'Option 3'],
              onOptionSelected: (String) {},
            ), // Render the poll widget if true
          VoteSection(post: widget.post),
          const Divider(
              height: 1,
              color: Color.fromARGB(255, 44, 43, 43),
              thickness: 1,
              indent: 16,
              endIndent: 16),
        ],
      ),
    );
  }
}
