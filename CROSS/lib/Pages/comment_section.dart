import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class Comment {
  final String username;
  final String text;
  final List<Comment> replies;

  Comment({
    required this.username,
    required this.text,
    this.replies = const [],
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Reddit Comment Section',
      theme: ThemeData(
        primaryColor: Colors.orange,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            // primary: Colors.orange,
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Colors.orange),
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: const CommentScreen(),
    );
  }
}

class CommentScreen extends StatefulWidget {
  const CommentScreen({super.key});

  @override
  _CommentScreenState createState() => _CommentScreenState();
}

class _CommentScreenState extends State<CommentScreen> {
  List<Comment> comments = [
    Comment(
      username: 'User1',
      text: 'This is the first comment.',
      replies: [
        Comment(
          username: 'User2',
          text: 'Reply to the first comment.',
        ),
        Comment(
          username: 'User3',
          text: 'Another reply to the first comment.',
        ),
      ],
    ),
    Comment(
      username: 'User4',
      text: 'This is the second comment.',
    ),
  ];

  TextEditingController commentController = TextEditingController();
  Map<int, TextEditingController> replyControllers = {};

  @override
  void initState() {
    super.initState();
    comments.asMap().forEach((index, comment) {
      replyControllers[index] = TextEditingController();
    });
  }

  void addComment() {
    String newCommentText = commentController.text.trim();
    if (newCommentText.isNotEmpty) {
      Comment newComment = Comment(username: 'NewUser', text: newCommentText);
      setState(() {
        comments.add(newComment);
        replyControllers[comments.length - 1] = TextEditingController();
      });
      commentController.clear();
    }
  }

  void addReply(int commentIndex) {
    TextEditingController? controller = replyControllers[commentIndex];
    if (controller != null) {
      String replyText = controller.text.trim();
      if (replyText.isNotEmpty) {
        Comment newReply = Comment(username: 'NewUser', text: replyText);
        setState(() {
          comments[commentIndex].replies.add(newReply);
          controller.clear();
        });
      }
    }
  }

  Widget buildComment(Comment comment, int commentIndex) {
    bool showReplyBox = false; // Initially set to false

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const CircleAvatar(
              // Placeholder for profile picture
              backgroundColor: Colors.blueGrey,
              radius: 16,
              child: Icon(Icons.person, color: Colors.white),
            ),
            const SizedBox(width: 8),
            Text(
              comment.username,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          comment.text,
          style: const TextStyle(
            fontWeight: FontWeight.normal,
            fontSize: 18,
          ),
        ),
        const SizedBox(height: 8),
        if (comment.replies.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(left: 24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: comment.replies.map((reply) => buildReply(reply)).toList(),
            ),
          ),
        Row(
          children: [
            ElevatedButton(
              onPressed: () {
                setState(() {
                  showReplyBox = !showReplyBox; // Toggle reply box visibility
                });
              },
              child: const Text('Reply'),
            ),
          ],
        ),
        if (showReplyBox)
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: replyControllers[commentIndex],
                  decoration: InputDecoration(
                    hintText: 'Reply to ${comment.username}',
                  ),
                ),
              ),
              const SizedBox(width: 8),
              ElevatedButton(
                onPressed: () => addReply(commentIndex),
                child: const Text('Post Reply'),
              ),
            ],
          ),
      ],
    );
  }

  Widget buildReply(Comment reply) {
    return Padding(
      padding: const EdgeInsets.only(left: 16),
      child: Text(
        '${reply.username}: ${reply.text}',
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Reddit Comment Section'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: comments.length,
                itemBuilder: (context, index) {
                  return buildComment(comments[index], index);
                },
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: commentController,
                    decoration: const InputDecoration(
                      hintText: 'Add a new comment',
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: addComment,
                  child: const Text('Post'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
