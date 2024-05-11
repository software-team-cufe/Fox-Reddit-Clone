import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/srView.dart'; // Import the widget to test

void main() {
  testWidgets('SRView renders correctly', (WidgetTester tester) async {
    // Prepare test data
    final Map<String, dynamic> userData = {
      'icon': 'https://example.com/user_icon.png',
      'name': 'example_username',
      'membersCnt': 1000,
    };

    // Build the widget
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: SRView(
            users: userData,
            accessToken: 'example_access_token',
          ),
        ),
      ),
    );

    // Verify that the widget renders correctly
    expect(find.text('r/example_username'), findsOneWidget);
    expect(find.text('1000 member'), findsOneWidget);
  });

}
