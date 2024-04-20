import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/post_details.dart';
import 'package:reddit_fox/Pages/commentCard.dart';

void main() {
  testWidgets('PostDetails Widget Test', (WidgetTester tester) async {
    // Build the PostDetails widget
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(post: {},),
    ));

    // Find widgets for testing
    final titleFinder = find.text('Test Post');
    final redditNameFinder = find.text('TestUser');
    final avatarFinder = find.byType(CircleAvatar);
    final upvoteButtonFinder = find.byIcon(Icons.arrow_upward);
    final downvoteButtonFinder = find.byIcon(Icons.arrow_downward);
    final commentCountFinder = find.text('5');
    final shareButtonFinder = find.byIcon(Icons.share);

    // Verify that the widgets are present
    expect(titleFinder, findsOneWidget);
    expect(redditNameFinder, findsOneWidget);
    expect(avatarFinder, findsOneWidget);
    expect(upvoteButtonFinder, findsOneWidget);
    expect(downvoteButtonFinder, findsOneWidget);
    expect(commentCountFinder, findsOneWidget);
    expect(shareButtonFinder, findsOneWidget);

    // Tap the share button and verify functionality
    await tester.tap(shareButtonFinder);
    await tester.pump();
    // Add expect statements for share functionality if needed
  });

  testWidgets('CommentCard Widget Test', (WidgetTester tester) async {
    // Create a test instance of ReplyData
    final replyData = ReplyData(
      username: 'TestUser',
      replyContent: 'Test Reply Content',
      upvotes: 15,
      downvotes: 5,
    );

    // Build the CommentCard widget
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: CommentCard(
            username: 'User1',
            commentContent: 'Test Comment Content',
            upvotes: 20,
            downvotes: 10,
            onReply: () {},
            onViewMenu: () {},
            replies: [replyData], // Pass the test replyData
          ),
        ),
      ),
    );

    // Find widgets for testing
    final usernameFinder = find.text('User1');
    final commentContentFinder = find.text('Test Comment Content');
    final upvotesFinder = find.text('20');
    final downvotesFinder = find.text('10');
    final replyUsernameFinder = find.text('TestUser');
    final replyContentFinder = find.text('Test Reply Content');
    final replyUpvotesFinder = find.text('15');
    final replyDownvotesFinder = find.text('5');

    // Verify that the widgets are present
    expect(usernameFinder, findsOneWidget);
    expect(commentContentFinder, findsOneWidget);
    expect(upvotesFinder, findsOneWidget);
    expect(downvotesFinder, findsOneWidget);
    expect(replyUsernameFinder, findsOneWidget);
    expect(replyContentFinder, findsOneWidget);
    expect(replyUpvotesFinder, findsOneWidget);
    expect(replyDownvotesFinder, findsOneWidget);
  });
}
