import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/GeneralWidgets/switchpost.dart';
import 'package:reddit_fox/Pages/settings/email.dart';


void main() {
  testWidgets('EmailsSetting widget renders text widgets correctly',
      (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: EmailsSetting())));
    await tester.pumpAndSettle();  

    // Verify the presence of various text widgets
    expect(find.text('Messages'), findsOneWidget);
    expect(find.text('Chat requests'), findsOneWidget);
    expect(find.text('Activity'), findsOneWidget);
    expect(find.text('New Sletters'), findsOneWidget);
    expect(find.text('Private messages'), findsOneWidget);
    expect(find.text('Chat requests'), findsOneWidget);
    expect(find.text('New user welcome'), findsOneWidget);
    expect(find.text('Comments on your posts'), findsOneWidget);
    expect(find.text('Replies to your comments'), findsOneWidget);
    expect(find.text('Upvotes on your post'), findsOneWidget);
    expect(find.text('Upvotes on your comments'), findsOneWidget);
    expect(find.text('User name mentions'), findsOneWidget);
    expect(find.text('new followers'), findsOneWidget);
    expect(find.text('Daily Digest'), findsOneWidget);
    expect(find.text('Unsubscribe From all emails'), findsOneWidget);
  });
}
