import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/post_details.dart';

void main() {
  testWidgets('PostDetails widget displays correctly',
      (WidgetTester tester) async {
    // Build the widget
    await tester.pumpWidget(MaterialApp(home: PostDetails()));

    // Verify if the title is displayed
    expect(find.text('Post Details'), findsOneWidget);

    // Verify if the username is displayed
    expect(find.text('Username'), findsOneWidget);

    // Verify if the post title is displayed
    expect(find.text('Post Title'), findsOneWidget);

    // Verify if the post image placeholder's Icon is displayed within a Container WITHIN CENTER
    expect(
        find.descendant(
          of: find.byType(Container),
          matching: find.byWidgetPredicate(
              (widget) => widget is Center && widget.child is Icon),
        ),
        findsOneWidget);

    // Verify if the comment section header is displayed
    expect(find.text('Comments'), findsOneWidget);

    // Verify if the first comment's username is displayed
    expect(find.text('User1'), findsOneWidget);

    // Verify if the second comment's username is displayed
    expect(find.text('User2'), findsOneWidget);
  });
}
