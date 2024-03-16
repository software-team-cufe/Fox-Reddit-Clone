import 'package:flutter/material.dart';

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
            borderSide: BorderSide(color: Colors.orange),
            borderRadius: BorderRadius.circular(8.0),
          ),
        ),
      ),
      debugShowCheckedModeBanner: false,
      home: CommentScreen(),
    );
  }
}

class CommentScreen extends StatefulWidget {
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
            CircleAvatar(
              // Placeholder for profile picture
              backgroundColor: Colors.blueGrey,
              radius: 16,
              child: Icon(Icons.person, color: Colors.white),
            ),
            SizedBox(width: 8),
            Text(
              comment.username,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        SizedBox(height: 4),
        Text(
          comment.text,
          style: TextStyle(
            fontWeight: FontWeight.normal,
            fontSize: 18,
          ),
        ),
        SizedBox(height: 8),
        if (comment.replies.isNotEmpty)
          Padding(
            padding: EdgeInsets.only(left: 24),
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
              child: Text('Reply'),
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
              SizedBox(width: 8),
              ElevatedButton(
                onPressed: () => addReply(commentIndex),
                child: Text('Post Reply'),
              ),
            ],
          ),
      ],
    );
  }

  Widget buildReply(Comment reply) {
    return Padding(
      padding: EdgeInsets.only(left: 16),
      child: Text(
        '${reply.username}: ${reply.text}',
        style: TextStyle(fontWeight: FontWeight.bold),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reddit Comment Section'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
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
            SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: commentController,
                    decoration: InputDecoration(
                      hintText: 'Add a new comment',
                    ),
                  ),
                ),
                SizedBox(width: 8),
                ElevatedButton(
                  onPressed: addComment,
                  child: Text('Post'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
