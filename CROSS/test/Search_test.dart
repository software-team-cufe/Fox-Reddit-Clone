import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/Pages/Search.dart';

void main() {
  testWidgets('Search widget test', (WidgetTester tester) async {
    // Build our Search widget
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: Search(),
      ),
    ));

    // Verify that Search widget contains an AppBar
    expect(find.byType(AppBar), findsOneWidget);

    // Verify that Search widget contains a TextField for searching
    expect(find.byType(TextField), findsOneWidget);

    // Verify that tapping on the back button navigates to HomePage
    await tester.tap(find.byIcon(Icons.arrow_back));
    await tester.pump();

    // Verify that HomePage route is pushed
    expect(find.byType(HomePage), findsOneWidget);
  });
}
