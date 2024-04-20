import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:share/share.dart';

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
  int voteCount = 0; // State variable for vote count
  bool hasVoted = false; // Flag to track whether the user has voted
  VoteDirection voteDirection = VoteDirection.Up; // Default vote direction

  @override
  void initState() {
    super.initState();
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler']);
    voteCount = widget.post['votes'] ?? 0;
    hasVoted = widget.post['hasVoted'] ?? false;
  }

  void vote(VoteDirection direction) {
    setState(() {
      if (voteDirection == direction && hasVoted) {
        // User clicks the same button, cancel the vote
        voteCount -= direction == VoteDirection.Up ? 1 : -1;
        hasVoted = false;
        voteDirection = VoteDirection.Up; // Reset vote direction
      } else {
        // User clicks a different button or hasn't voted yet
        if (hasVoted) {
          // Cancel the previous vote
          voteCount -= voteDirection == VoteDirection.Up ? 1 : -1;
        }
        // Apply the new vote
        voteCount += direction == VoteDirection.Up ? 1 : -1;
        hasVoted = true;
        voteDirection = direction; // Update vote direction
      }
      // Update the vote count and user's vote status in the backend
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          contentPadding: const EdgeInsets.all(16),
          leading: widget.post['redditpic'] != null
              ? CircleAvatar(
                  backgroundImage: NetworkImage(widget.post['redditpic']),
                )
              : null,
          title: Text(
            widget.post['redditName'],
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          subtitle: Text(
            widget.post['title'],
            style: const TextStyle(fontSize: 20),
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
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PostDetails(post: widget.post),
              ),
            );
          },
        ),
        Row(
          children: [
            if (widget.post['nsfw'])
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                margin: const EdgeInsets.only(top: 0, right: 0, left: 16),
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
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                margin: const EdgeInsets.only(top: 0, left: 16),
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
                      icon: Icon(Icons.arrow_upward,
                          color: hasVoted && voteDirection == VoteDirection.Up
                              ? Colors.green
                              : null),
                      onPressed: () => vote(VoteDirection.Up), // Upvote
                    ),
                    Text(
                      "${voteCount.abs()}",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    IconButton(
                      icon: Icon(Icons.arrow_downward,
                          color: hasVoted && voteDirection == VoteDirection.Down
                              ? Colors.red
                              : null),
                      onPressed: () => vote(VoteDirection.Down), // Downvote
                    ),
            const SizedBox(width: 2),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(width: 4),
                Text(
                  widget.post['commentsNo'].toString(),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const Icon(Icons.comment),
                IconButton(
                  onPressed: () {
                    int postId = widget.post['id'];
                    String postUrl =
                        'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                    Share.share('${widget.post['title']}\n$postUrl');
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
