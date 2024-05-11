import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/commentSearch.dart'; // Import the widget to test

void main() {
  testWidgets('ComentViewSearch renders correctly', (WidgetTester tester) async {
    // Build the widget
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: ComentViewSearch(
            comment: {
              'communityIcon': 'https://example.com/community_icon.png',
              'communityName': 'example_community',
              'textHTML': 'Comment HTML text',
              'textJSON': 'Comment JSON text',
            },
          ),
        ),
      ),
    );

    // Verify that the widget renders correctly
    expect(find.text('r/example_community'), findsOneWidget);
    expect(find.text('Comment HTML text'), findsOneWidget);
    expect(find.text('Comment JSON text'), findsOneWidget);
  });

  // Add more test cases as needed to cover different scenarios and behavior
}
