import 'dart:io';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:share/share.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'CommentSection.dart'; // Import the CommentSection.dart file

class PostDetails extends StatelessWidget {
  final String redditName;
  final String title;
  final String? picture;
  final int votes;
  final int commentsNo;
  final int? creatorId;
  final int postId;
  // Add other parameters here

  const PostDetails({
    Key? key,
    required this.redditName,
    required this.title,
    this.picture,
    required this.votes,
    required this.commentsNo,
    required this.creatorId,
    required this.postId,
  }) : super(key: key);

  Future<void> _downloadImage(BuildContext context) async {
  // Check if permission is granted
  var status = await Permission.storage.status;
  if (status.isGranted) {
    // Permission is already granted, proceed with download
    _startDownload(context);
  } else {
    // Permission is not granted, request permission
    status = await Permission.storage.request();
    if (status.isGranted) {
      // Permission granted after request, start download
      _startDownload(context);
    } else {
      // Permission denied or restricted
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Permission denied for image download"),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }
}

void _startDownload(BuildContext context) async {
  try {
    // Get the downloads directory
    Directory? downloadsDir = await getDownloadsDirectory();
    String savePath = "${downloadsDir!.path}/$title.jpg";

    // Download the image
    var response = await http.get(Uri.parse(picture!));
    File file = File(savePath);
    await file.writeAsBytes(response.bodyBytes);

    // Show a snackbar indicating successful download
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Image downloaded successfully"),
        duration: Duration(seconds: 2),
      ),
    );
  } catch (e) {
    // Handle download errors
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Error downloading image"),
        duration: Duration(seconds: 2),
      ),
    );
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Post Details"),
        actions: [
          PopupMenuButton(
            icon: const Icon(Icons.more_vert),
            itemBuilder: (BuildContext context) {
              return [
                PopupMenuItem(
                  child: const Text("Save"),
                  onTap: () {
                    // Handle save action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Copy Text"),
                  onTap: () {
                    // Handle copy text action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Turn on Captions"),
                  onTap: () {
                    // Handle turn on captions action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Crosspost to Community"),
                  onTap: () {
                    // Handle crosspost action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Copy Image"),
                  onTap: () {
                    // Handle copy image action
                  },
                ),
                PopupMenuItem(
                  onTap: picture != null && picture!.isNotEmpty
                      ? () => _downloadImage(context)
                      : null,
                  child: const Text("Download Image"),
                ),
                PopupMenuItem(
                  child: const Text("Report"),
                  onTap: () {
                    // Handle report action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Block Account"),
                  onTap: () {
                    // Handle block account action
                  },
                ),
                PopupMenuItem(
                  child: const Text("Hide"),
                  onTap: () {
                    // Handle hide action
                  },
                ),
              ];
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Display the author's avatar and username
            GestureDetector(
              /*
              onTap: () {
                // Navigate to the poster's account page
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => ProfilePage(user_Id: creatorId)),
                );
              },
              */
              child: Row(
                children: [
                  _buildAvatarIcon(),
                  const SizedBox(width: 8),
                  Text(
                    redditName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // Display the post title
            Text(
              title,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            // Display the post image if available
            if (picture != null && picture!.isNotEmpty)
              Image.network(
                picture!,
                width: double.infinity,
                height: 400,
                fit: BoxFit.cover,
              ),

            // Display the post actions (e.g., reply, upvote, downvote)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Display the reply, upvote, and downvote buttons
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_upward),
                      onPressed: () {},
                    ),
                    Text(
                      "$votes",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    IconButton(
                      icon: const Icon(Icons.arrow_downward),
                      onPressed: () {},
                    ),
                  ],
                ),
                // Display the comment count and share button
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "$commentsNo",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const Icon(Icons.comment),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.share),
                        onPressed: () {
                          String postUrl =
                              'https://example.com/posts/'; // Replace with your actual post URL
                          Share.share('$title\n$postUrl');
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Add the CommentSection widget below the post content
            //CommentSection(postId: "$postId",),
          ],
        ),
      ),
    );
  }

  /// Builds the avatar icon widget.
  Widget _buildAvatarIcon() {
    return const CircleAvatar(
      radius: 16,
      child: Icon(Icons.account_circle),
    );
  }
}
