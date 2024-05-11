import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/GeneralWidgets/droplist.dart';
import 'package:reddit_fox/Pages/settings/chatPermission.dart'; // Update this import path

void main() {
  testWidgets('permissionChat widget renders correctly',
      (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: permissionChat(),
        ),
      ),
    );
    expect(find.text('Chat and messaging permissions'), findsOneWidget);
    expect(find.text('Manage who has the permission to send you chat'),
        findsOneWidget);
  });
}
