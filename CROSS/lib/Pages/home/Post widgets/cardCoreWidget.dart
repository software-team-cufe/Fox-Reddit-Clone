import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/pollWidget.dart';
import 'package:reddit_fox/Pages/post_details.dart';

class cardCoreWidget extends StatefulWidget {
  final Map<dynamic, dynamic> post;
  final bool detailsPageOpen;

  const cardCoreWidget(
      {super.key, required this.post, required this.detailsPageOpen});

  @override
  _cardCoreWidgetState createState() => _cardCoreWidgetState();
}

class _cardCoreWidgetState extends State<cardCoreWidget> {
  bool isBlurred = false;
  bool textIsblurred = false;

  @override
  void initState() {
    super.initState();
    isBlurred = (widget.post['nsfw'] || widget.post['spoiler']);
    textIsblurred = (widget.post['nsfw'] || widget.post['spoiler']);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.post['title'] ?? "title",
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        Row(
          children: [
            if (widget.post['nsfw'])
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
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
            if (widget.post['spoiler'])
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
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
         if ('https://drive.google.com/uc?export=download&id=1SrenDt5OMbDbH12eJKTO8avyoCq3P_15' != null &&
             'https://drive.google.com/uc?export=download&id=1SrenDt5OMbDbH12eJKTO8avyoCq3P_15'!.isNotEmpty)
        //Wrap GestureDetector around ClipRRect
        GestureDetector(
          onTap: () {
            if ((widget.post['nsfw'] || widget.post['spoiler']) &&
                widget.detailsPageOpen) {
              // Check if the post is NSFW or spoiler
              setState(() {
                isBlurred = !isBlurred; // Toggle blur if the post is NSFW
              });
            } else if (widget.detailsPageOpen) {
              //do nothing
            } else {
              // Navigate to the details page
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => PostDetails(post: widget.post),
                ),
              );
            }
          },
          child: ClipRRect(
            borderRadius:
                BorderRadius.circular(10), // Adjust border radius as needed
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Image without blur effect
                Image.network(
                  'https://drive.google.com/uc?export=download&id=1SrenDt5OMbDbH12eJKTO8avyoCq3P_15',
                  // widget.post['picture']!,
                  width: double.infinity,
                  height: 400,
                  fit: BoxFit.cover,
                  color:
                      isBlurred ? const Color.fromARGB(0, 158, 158, 158) : null,
                  colorBlendMode:
                      isBlurred ? BlendMode.saturation : BlendMode.dst,
                ),
                if (isBlurred)
                  // Blur effect with BackdropFilter
                  BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                    child: Container(
                      color: const Color.fromARGB(0, 0, 0, 0)
                          .withOpacity(0), // Transparent color
                      width: double.infinity,
                      height: 400,
                    ),
                  ),
                if (isBlurred)
                  const Column(
                    children: [
                      Icon(Icons.remove_red_eye,
                          size: 40,
                          color: Colors.white), // Icon to indicate blur
                      Text(
                        'Click to view',
                        style: TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 8),
        GestureDetector(
          onTap: () {
            if ((widget.post['nsfw'] || widget.post['spoiler']) &&
                widget.detailsPageOpen) {
              // Check if the post is NSFW or spoiler
              setState(() {
                textIsblurred =
                    !textIsblurred; // Toggle blur if the post is NSFW
              });
            } else if (widget.detailsPageOpen) {
              //do nothing
            } else {
              // Navigate to the details page
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => PostDetails(post: widget.post),
                ),
              );
            }
          },
          child: Container(
            decoration: BoxDecoration(
              color: textIsblurred ? Colors.white : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              widget.post['text'],
              style: TextStyle(
                fontSize: 16,
                color: textIsblurred ? Colors.transparent : Colors.white,
              ),
            ),
          ),
        ),
        if (widget.post['poll'] == true &&
            (widget.post['nsfw'] == false ||
                widget.post['spoiler'] ==
                    false)) // Check if post has a poll and if it should be shown
          PollWidget(
              pollOptions: const ['Option 1', 'Option 2', 'Option 3'],
              onOptionSelected: (String) {}), // Render the poll widget if true
      ],
    );
  }
}
