import 'dart:io';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';
import 'package:share/share.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'CommentSection.dart';

class PostDetails extends StatefulWidget {
  final String redditName;
  final String title;
  final String? picture;
  final int votes;
  final int commentsNo;
  final int? creatorId;
  final int postId;
  final bool nsfw;
  final String description;
  const PostDetails({
    Key? key,
    required this.redditName,
    required this.title,
    this.picture,
    required this.votes,
    required this.commentsNo,
    required this.creatorId,
    required this.postId,
    required this.nsfw,
    required this.description,
  }) : super(key: key);

  @override
  _PostDetailsState createState() => _PostDetailsState();
}

class _PostDetailsState extends State<PostDetails> {
  bool isBlurred = false;

  @override
  void initState() {
    super.initState();
    if (widget.nsfw) {
      isBlurred = true; // Apply blur if the post is NSFW
    }
  }

  void toggleBlur() {
    if (widget.nsfw) { // Check if the post is NSFW
      setState(() {
        isBlurred = !isBlurred; // Toggle blur if the post is NSFW
      });
    }
  }


  Future<void> _downloadImage(BuildContext context) async {
    // Check if permission is granted
    var status = await Permission.storage.status;
    if (status.isGranted) {
      _startDownload(context);
    } else {
      status = await Permission.storage.request();
      if (status.isGranted) {
        _startDownload(context);
      } else {
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
      Directory? downloadsDir = await getDownloadsDirectory();
      String savePath = "${downloadsDir!.path}/${widget.title}.jpg";

      var response = await http.get(Uri.parse(widget.picture!));
      File file = File(savePath);
      await file.writeAsBytes(response.bodyBytes);

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Image downloaded successfully"),
          duration: Duration(seconds: 2),
        ),
      );
    } catch (e) {
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
                // Other menu items...
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
                  onTap: widget.picture != null && widget.picture!.isNotEmpty
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
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        ProfilePage(user_Id: widget.creatorId.toString()),
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
                    widget.redditName,
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
            Text(
  widget.title,
  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
),
if (widget.nsfw)
  Row(
    children: [
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        margin: const EdgeInsets.only(top: 4),
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
    ],
  ),
const SizedBox(height: 8),

            if (widget.picture != null && widget.picture!.isNotEmpty)
  // Wrap GestureDetector around ClipRRect
  GestureDetector(
    onTap: toggleBlur, // Toggle the blur filter on tap
    child: ClipRRect(
      borderRadius: BorderRadius.circular(10), // Adjust border radius as needed
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Image without blur effect
          Image.network(
            widget.picture!,
            width: double.infinity,
            height: 400,
            fit: BoxFit.cover,
            color: isBlurred ? Colors.grey : null,
            colorBlendMode:
                isBlurred ? BlendMode.saturation : BlendMode.dst,
          ),
          if (isBlurred)
            // Blur effect with BackdropFilter
            BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
              child: Container(
                color:
                    const Color.fromARGB(0, 0, 0, 0).withOpacity(0), // Transparent color
                width: double.infinity,
                height: 400,
              ),
            ),
          if (isBlurred)
            const Icon(Icons.remove_red_eye,
                size: 64,
                color: Colors.white), // Icon to indicate blur
        ],
      ),
    ),
  ),
  const SizedBox(height: 8), // Space between picture and description
    Text(
      widget.description, // Include the post description here
      style: const TextStyle(fontSize: 16),
    ),
    const SizedBox(height: 8), // Space between description and actions

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
                      "${widget.votes}",
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
                      Text(
                        "${widget.commentsNo}",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const Icon(Icons.comment),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.share),
                        onPressed: () {
                          String postUrl = 'https://example.com/posts/';
                          Share.share('${widget.title}\n$postUrl');
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 1),
            CommentSection(postId: "${widget.postId}"),
          ],
        ),
      ),
    );
  }
}
