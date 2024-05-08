import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/newMessage.dart';

void main() {
  testWidgets('New Message Widget Test', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(
      home: NewMessage(),
    ));
    expect(find.text('New Message'), findsOneWidget);
    expect(find.byType(TextField), findsNWidgets(3));
  });
}
