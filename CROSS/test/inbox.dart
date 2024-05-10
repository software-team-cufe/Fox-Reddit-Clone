import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/inboxChat.dart';

void main() {
  group('inboxChat widget test', () {
    testWidgets('Widget renders correctly', (WidgetTester tester) async {
      // Build our widget and trigger a frame
      await tester.pumpWidget(
        MaterialApp(
          home: inboxChat(
            username: 'moh_amed',
            subject: 'hello',
          ),
        ),
      );

      expect(find.text('moh_amed'), findsOneWidget);
      expect(find.text('hello'), findsOneWidget);

      expect(find.byIcon(Icons.arrow_back_ios), findsOneWidget);

      
      expect(find.byIcon(Icons.flag), findsOneWidget);

      
      expect(find.byType(TextField), findsOneWidget);
    });

    
  });
}
