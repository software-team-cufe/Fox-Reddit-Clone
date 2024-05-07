import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/CommentSection.dart';

void main() {
  late CommentSection commentSection;

  setUp(() {
    commentSection = CommentSection(
      postId: '12345',
      access_token: 'dummy_access_token',
    );
  });

  testWidgets('CommentSection widget builds correctly',
      (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: commentSection)));

    expect(find.byType(TextField), findsOneWidget);
    expect(find.byIcon(Icons.camera_alt), findsOneWidget);
    expect(find.byIcon(Icons.send), findsOneWidget);
  });
}
