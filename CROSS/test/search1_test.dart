import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/Search.dart';
import 'dart:convert';
import 'package:reddit_fox/Pages/Search1.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('Search1 Widget Tests', () {
    testWidgets('Search1 widget initializes with default state', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: Search1(searchItem: 'Flutter')));

      // Verify that the widget initializes with TabBar and initial search item displayed
      expect(find.byType(TabBar), findsOneWidget);
      expect(find.text('Flutter'), findsOneWidget);
    });

    // testWidgets('Search1 widget fetches post data successfully', (WidgetTester tester) async {
    //   final mockClient = MockHttpClient();
    //   when(mockClient.get(any)).thenAnswer((_) async => http.Response(json.encode({'postsSearchResultNotAuth': [{'title': 'Post 1'}, {'title': 'Post 2'}]}), 200));

    //   await tester.pumpWidget(MaterialApp(home: Search1(searchItem: 'Flutter')));

    //   await tester.pump(); // Allow the widget to load
    //   await tester.pump(Duration.zero); // Trigger a frame to allow setState to be called

    //   expect(find.text('Post 1'), findsOneWidget);
    //   expect(find.text('Post 2'), findsOneWidget);
    // });

    testWidgets('Search1 widget navigates back to previous search page', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: Search1(searchItem: 'Flutter')));

      await tester.tap(find.byIcon(Icons.arrow_back));
      await tester.pumpAndSettle();

      // Verify that the widget navigates back to the previous search page
      expect(find.byType(Search), findsOneWidget);
    });
  });
}
