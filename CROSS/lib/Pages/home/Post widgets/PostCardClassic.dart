import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/VoteSection.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/pollWidget.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:video_player/video_player.dart';

/// A stateful widget that represents a post card in the home page.
class ClassicCard extends StatefulWidget {
  final Map<dynamic, dynamic> post;

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
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler'] || false);
  }

  @override
  Widget build(BuildContext context) {
    List<String> attachments = widget.post['attachments']
        .cast<String>(); // Assuming attachments are strings

    String? firstImage;
    String? firstVideo;
    for (String attachment in attachments) {
      if (attachment.endsWith('.jpg') || attachment.endsWith('.png')) {
        firstImage = attachment;
        break;
      } else if (attachment.endsWith('.mp4')) {
        firstVideo = attachment;
        break;
      }
    }
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
            contentPadding: const EdgeInsets.symmetric(horizontal: 16),
            title: Row(
              children: [
                widget.post['picture'] != null
                    ? CircleAvatar(
                        backgroundImage: NetworkImage(widget.post['picture']),
                      )
                    : const Icon(Icons.account_circle, size: 30),
                Text(
                  'r/${widget.post['communityName']}',
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
                  widget.post['title'] ?? "no title",
                  style: const TextStyle(fontSize: 16),
                ),
                if ((firstImage != null && firstImage != 'file:///attachment1.jpg') ||
            (firstVideo != null && firstVideo != 'file:///attachment1.mp4'))
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isBlurred ? Colors.white : Colors.transparent,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        widget.post['text'] ?? "",
                        style: TextStyle(
                          fontSize: 16,
                          color: isBlurred ? Colors.transparent : Colors.white,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            trailing: firstImage != null
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Stack(
                      children: [
                        Image.network(
                          firstImage,
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
          //if (widget.post['poll'] == true &&
          //    (widget.post['nsfw'] == false ||
          //        widget.post['spoiler'] ==
          //            false)) // Check if post has a poll and if it should be shown
          //  PollWidget(
          //    pollOptions: const ['Option 1', 'Option 2', 'Option 3'],
          //    onOptionSelected: (String) {},
          //  ), // Render the poll widget if true
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
