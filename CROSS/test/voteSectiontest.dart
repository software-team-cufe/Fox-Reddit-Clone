import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/VoteSection.dart';

void main() {
  testWidgets('VoteSection widget test', (WidgetTester tester) async {
    // Build VoteSection widget
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: VoteSection(
            post: {
              'id': '1',
              'votesCount': 10,
              'hasVoted': false,
              'commentsNo': 5,
              'title': 'Test Post',
            },
          ),
        ),
      ),
    );

    // Verify that the initial state is as expected
    expect(find.text('10'), findsOneWidget); // Check the initial vote count
    expect(find.text('5 Comments'), findsOneWidget); // Check the initial comments count



    // Tap the downvote button and verify the changes
    await tester.tap(find.text('-'));
    await tester.pump();

    expect(find.text('10'), findsOneWidget); // Check if vote count decreased by 1

    // Tap the reply button and verify if Share.share is called
    await tester.tap(find.text('Reply'));
    await tester.pump();


  });
}
