import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/PostCardModern.dart';

void main() {
  testWidgets('ModernCard widget builds correctly',
      (WidgetTester tester) async {
    final widget = ModernCard(
      post: const {
        // Sample post data
        'communityName': 'Flutter',
        'communityIcon': 'sample_icon.png',
        'username': 'User1',
      },
      access_token: 'dummy_access_token',
      userName: 'User1',
      history: false,
      myProfile: false,
    );

    await tester.pumpWidget(MaterialApp(home: Scaffold(body: widget)));

    // Verify that essential widgets are present
    expect(find.byType(GestureDetector), findsOneWidget);
    expect(find.byType(Column), findsOneWidget);
    expect(find.byType(CircleAvatar), findsOneWidget);
    expect(find.byType(Row), findsWidgets);
  });

  testWidgets('ModernCard widget handles menu actions',
      (WidgetTester tester) async {
    final widget = ModernCard(
      post: const {
        // Sample post data
        'communityName': 'Flutter',
        'communityIcon': 'sample_icon.png',
        'username': 'User1',
      },
      access_token: 'dummy_access_token',
      userName: 'User1',
      history: false,
      myProfile: true,
    );

    await tester.pumpWidget(MaterialApp(home: Scaffold(body: widget)));

    await tester.tap(find.byIcon(Icons.more_vert));

    // Verify that the modal bottom sheet is displayed
    expect(find.byType(SingleChildScrollView), findsOneWidget);
    expect(find.byType(Column), findsOneWidget);
    expect(find.text('Save'), findsOneWidget);

    // Simulate tapping on a menu option
    await tester.tap(find.text('Save'));
    await tester.pump();
  });
}
