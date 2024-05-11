import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/messages.dart';
import 'package:shared_preferences/shared_preferences.dart';



class MockSharedPreferences extends Mock implements SharedPreferences {}

void main() {
  group('Message widget test', () {
    testWidgets('Widget renders correctly', (WidgetTester tester) async {
      
      final sharedPreferences = MockSharedPreferences();

      
      when(sharedPreferences.getString('backtoken')).thenReturn('test_token');

      
      await tester.pumpWidget(
        MaterialApp(
          home: Message(),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(AppBar), findsOneWidget);
      expect(find.byType(TabBar), findsOneWidget);
      expect(find.byType(TabBarView), findsOneWidget);
   
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

  });
}
