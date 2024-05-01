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
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              ConstrainedBox(
                      constraints: const BoxConstraints.tightFor(width: 42, height: 40), // Set a fixed size
                      child: IconButton(
                        icon: AnimatedSwitcher(
                          duration: const Duration(milliseconds: 200),
                          child: hasVoted && voteDirection == VoteDirection.Up
                              ? Image.asset(
                                  'assets/Icons/up vote.png',
                                  key: UniqueKey(),
                                  width: 40,
                                  height: 42,
                                )
                              : Image.asset(
                                  'assets/Icons/arrow-up.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )  
                        ),
                        onPressed: () => vote(VoteDirection.Up),
                      ),
                      ),

                    Text(
                      "${voteCount.abs()}",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    ConstrainedBox(
                      constraints: const BoxConstraints.tightFor(width: 40, height: 38), // Set a fixed size
                      child: IconButton(
                        icon: AnimatedSwitcher(
                          duration: const Duration(milliseconds: 200),
                          child: hasVoted && voteDirection == VoteDirection.Down
                              ? Image.asset(
                                  'assets/Icons/down vote.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )
                              : Image.asset(
                                  'assets/Icons/arrow-down.png',
                                  key: UniqueKey(),
                                  width: 32,
                                  height: 32,
                                )  
                        ),
                        onPressed: () => vote(VoteDirection.Down),
                      ),
                      ),

              const SizedBox(width: 2),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(               
                        child: Row(
                          children: [
                            ConstrainedBox(
                              constraints: const BoxConstraints.tightFor(width: 28, height: 28), // Set a fixed size
                              child: Image.asset('assets/Icons/comment.png')
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 4.0, right: 4.0),
                              child: Text(
                                "${widget.post['commentsNo']} Comments",
                                style: const TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                      ),
                  IconButton(
                    icon: Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.rotationY(
                          3.14), // Flips the icon horizontally
                      child: const Icon(Icons.reply),
                    ),
                    onPressed: () {
                      int postId = widget.post['id'];
                      String postUrl =
                          'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                      Share.share('${widget.post['title']}\n$postUrl');
                    },
                  ),
                ],
              ),
            ],
          ),
          const Divider(
            height: 1,
            color: Color.fromARGB(255, 44, 43, 43),
            thickness: 1,
            indent: 16,
            endIndent: 16,
          ),
        ],
      ),
    );
  }
}
