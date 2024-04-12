import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/Blanck.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';

void main() {
  testWidgets('CustomDrawer widget test', (WidgetTester tester) async {
    // Build our CustomDrawer widget
    await tester.pumpWidget(const MaterialApp(
      home: Scaffold(
        body: CustomDrawer(drawer_Width: 200.0),
      ),
    ));

    // Verify that CustomDrawer contains a ListTile with the expected text
    expect(find.text('Create Community'), findsOneWidget);

    // Tap on the ListTile
    await tester.tap(find.text('Create Community'));
    await tester.pump();

    // Verify that the BlankPage route is pushed
    expect(find.byType(BlankPage), findsOneWidget);
  });
}
