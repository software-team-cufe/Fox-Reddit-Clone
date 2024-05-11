import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';

void main() {
  testWidgets('NotificationSetting widget renders text widgets correctly',
      (WidgetTester tester) async {
    await tester
        .pumpWidget(MaterialApp(home: Scaffold(body: NotificationSettting())));

    // Wait for initialization to complete
    await tester.pumpAndSettle();

    // Verify the presence of various text widgets
    expect(find.text('Messages'), findsOneWidget);
    expect(find.text('Private messages'), findsOneWidget);
    expect(find.text('Chat messages'), findsOneWidget);
    expect(find.text('Chat requests'), findsOneWidget);
    expect(find.text('Activity'), findsOneWidget);
    expect(find.text('Mention of u/username'), findsOneWidget);
    expect(find.text('Comments on your posts'), findsOneWidget);
    expect(find.text('Upvotes on your post'), findsOneWidget);
    expect(find.text('Upvotes on your comments'), findsOneWidget);
    expect(find.text('Replies to your comments'), findsOneWidget);
    expect(find.text('Activity on your comments'), findsOneWidget);
    expect(find.text('Activity on chat posts you are in'), findsOneWidget);
    expect(find.text('new followers'), findsOneWidget);
    expect(find.text('Awards you receive'), findsOneWidget);
    expect(find.text('posts you follow'), findsOneWidget);
    expect(find.text('comments you follow'), findsOneWidget);
    expect(find.text('Recommendations'), findsOneWidget);
    expect(find.text('Trending posts'), findsOneWidget);
    expect(find.text('Community recommendation'), findsOneWidget);
    expect(find.text('ReFox'), findsOneWidget);
    expect(find.text('featured content'), findsOneWidget);
    expect(find.text('Updates'), findsOneWidget);
    expect(find.text('Community alerts'), findsOneWidget);
    expect(find.text('Fox Announcements'), findsOneWidget);
    expect(find.text('Cake day'), findsOneWidget);
    expect(find.text('Moderation'), findsOneWidget);
    expect(find.text('Mod Notification'), findsOneWidget);
  });
}
