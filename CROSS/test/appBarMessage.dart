import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/newMessage.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';
import 'package:reddit_fox/GeneralWidgets/dots.dart'; // Update this import path

void main() {
  testWidgets('WidgetButton displays correct options and navigates properly',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: WidgetButton(),
        ),
      ),
    );
    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle();

    expect(find.text('New Messages'), findsOneWidget);

    expect(find.text('Mark all inbox as read'), findsOneWidget);

    expect(find.text('Edit notification Settings'), findsOneWidget);
  });
}
