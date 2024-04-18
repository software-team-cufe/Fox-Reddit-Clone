import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/post_details.dart';

void main() {
  testWidgets('PostDetails Widget Test', (WidgetTester tester) async {
    // Build the PostDetails widget
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(
        redditName: 'TestUser',
        title: 'Test Post',
        votes: 10,
        commentsNo: 5,
        creatorId: 123,
        postId: 2,
      ),
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
}
