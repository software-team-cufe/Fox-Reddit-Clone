import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/post_details.dart';

void main() {
  testWidgets('PostDetails widget renders correctly', (WidgetTester tester) async {
    // Build PostDetails widget
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(
        post: {
          'postId': '123',
          'communityName': 'FlutterDev',
          'username': 'JohnDoe',
          'title': 'Sample Post',
        },
        myProfile: false,
      ),
    ));

    // Verify the presence of essential widgets
    expect(find.byType(AppBar), findsOneWidget);
    expect(find.byType(CircleAvatar), findsNWidgets(2));
    expect(find.text('r/FlutterDev'), findsOneWidget);
    expect(find.text('u/JohnDoe'), findsOneWidget);
    expect(find.text('Sample Post'), findsOneWidget);
    expect(find.byType(SingleChildScrollView), findsOneWidget);
  });

  testWidgets('Tap on download image action shows snackbar', (WidgetTester tester) async {
    // Build PostDetails widget with a post that has a picture URL
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(
        post: {
          'postId': '123',
          'title': 'Sample Post',
          'picture': 'https://example.com/sample.jpg',
        },
        myProfile: false,
      ),
    ));

    // Tap on the download image icon
    await tester.tap(find.byIcon(Icons.download));
    await tester.pump(); // Rebuild the widget after the tap

    // Verify that a snackbar is shown
    expect(find.byType(SnackBar), findsOneWidget);
    expect(find.text('Image downloaded successfully'), findsOneWidget);
  });

  testWidgets('Toggle vote action updates UI', (WidgetTester tester) async {
    // Build PostDetails widget
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(
        post: {'postId': '123', 'title': 'Sample Post'},
        myProfile: false,
      ),
    ));

    // Initial UI state
    expect(find.byType(Icon), findsNWidgets(4)); // Vote icons and reply icon

    // Tap on the upvote icon
    await tester.tap(find.byKey(const Key('upvote_icon')));
    await tester.pump();

    // Verify that the upvote icon is selected
    expect(find.byKey(const Key('upvote_selected_icon')), findsOneWidget);
    expect(find.byKey(const Key('downvote_icon')), findsOneWidget);

    // Tap on the downvote icon
    await tester.tap(find.byKey(const Key('downvote_icon')));
    await tester.pump();

    // Verify that the downvote icon is selected
    expect(find.byKey(const Key('upvote_icon')), findsOneWidget);
    expect(find.byKey(const Key('downvote_selected_icon')), findsOneWidget);
  });

  testWidgets('Open end drawer action works correctly', (WidgetTester tester) async {
    // Build PostDetails widget
    await tester.pumpWidget(const MaterialApp(
      home: PostDetails(
        post: {'postId': '123', 'title': 'Sample Post'},
        myProfile: false,
      ),
    ));

    // Tap on the more options icon
    await tester.tap(find.byIcon(Icons.more_horiz));
    await tester.pump();

    // Verify that the end drawer is shown
    expect(find.byType(Drawer), findsOneWidget);
  });
}
