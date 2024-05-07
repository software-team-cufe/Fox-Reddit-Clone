import 'package:flutter/material.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:share/share.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


enum VoteDirection { Up, Down }

class VoteSection extends StatefulWidget {
  final Map<dynamic, dynamic> post;

  const VoteSection({super.key, required this.post});

  @override
  _VoteSectionState createState() => _VoteSectionState();

  Future<void> postVote(String postID, int type) async {
    final response = await http.post(
      Uri.parse(ApiRoutesBackend.postVote),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'postID': postID,
        'type': type,
      }),
    );

    if (response.statusCode == 200) {
      print('Vote posted successfully');
    } else {
      print('Failed to post vote. Status code: ${response.statusCode}');
    }
  }
}

class _VoteSectionState extends State<VoteSection> {
  int voteCount = 0; // State variable for vote count
  bool hasVoted = false; // Flag to track whether the user has voted
  VoteDirection voteDirection = VoteDirection.Up; // Default vote direction

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
  void initState() {
    super.initState();
    voteCount = widget.post['votesCount'];
    hasVoted = widget.post['hasVoted'] ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            ConstrainedBox(
              constraints: const BoxConstraints.tightFor(width: 35, height: 38),
              child: IconButton(
                icon: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 200),
                  child: hasVoted && voteDirection == VoteDirection.Up
                      ? Image.asset(
                          'assets/Icons/up vote.png',
                          key: UniqueKey(),
                          width: 32,
                          height: 32,
                        )
                      : Image.asset(
                          'assets/Icons/arrow-up.png',
                          key: UniqueKey(),
                          width: 32,
                          height: 32,
                        ),
                ),
                onPressed: () => {
                  vote(VoteDirection.Up),
                  widget.postVote(widget.post['id'], 1),
                  },
              ),
            ),
            Text(
              "$voteCount",
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            ConstrainedBox(
              constraints: const BoxConstraints.tightFor(width: 35, height: 38),
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
                        ),
                ),
                onPressed: () => vote(VoteDirection.Down),
              ),
            ),
          ],
        ),
        const SizedBox(width: 50),
        Expanded(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                child: Row(
                  children: [
                    ConstrainedBox(
                      constraints:
                          const BoxConstraints.tightFor(width: 28, height: 28),
                      child: Image.asset('assets/Icons/comment.png'),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 4.0, right: 4.0),
                      child: Text(
                        "${widget.post['commentsNo']?? 0} Comments",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 50),
              IconButton(
                icon: Transform(
                  alignment: Alignment.center,
                  transform: Matrix4.rotationY(3.14),
                  child: const Icon(Icons.reply),
                ),
                onPressed: () {
                  String postId = widget.post['postId'] ?? 404;
                  String postUrl =
                      'https://icy-desert-094269b03.5.azurestaticapps.net/posts/$postId';
                  Share.share('${widget.post['title']}\n$postUrl');
                },
              ),
            ],
          ),
        ),
      ],
    );
  }
}
