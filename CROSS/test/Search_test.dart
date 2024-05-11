import 'dart:js_util';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'dart:convert';
import 'package:reddit_fox/Pages/search.dart';
import 'package:reddit_fox/Pages/search1.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('Search Widget Tests', () {
    testWidgets('Search widget initializes with empty lists', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: Search()));

      // Verify that the widget initializes with empty lists
      expect(find.byType(ListTile), findsOneWidget); // Verify that Recently Searched list is displayed
      expect(find.byType(ListView), findsNWidgets(2)); // Verify that both Recently Searched and Trending Today lists are displayed
      expect(find.text('Recently Searched'), findsOneWidget); // Verify that Recently Searched title is displayed
    });

    // testWidgets('Search widget fetches recently searched terms successfully', (WidgetTester tester) async {
    //   final mockClient = MockHttpClient();
    //   when(mockClient.get(any)).thenAnswer((_) async => http.Response(json.encode(['term1', 'term2']), 200));

    //   await tester.pumpWidget(MaterialApp(home: Search()));

    //   await tester.pump(); // Allow the widget to load
    //   await tester.pump(Duration.zero); // Trigger a frame to allow setState to be called

    //   expect(find.text('term1'), findsOneWidget);
    //   expect(find.text('term2'), findsOneWidget);
    // });

    testWidgets('Search widget navigates to search result page on search submit', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: Search()));

      await tester.enterText(find.byType(TextField), 'SearchTerm');
      await tester.testTextInput.receiveAction(TextInputAction.done);

      await tester.pump(); // Allow the widget to load
      await tester.pump(Duration.zero); // Trigger a frame to allow navigation

      expect(find.byType(Search1), findsOneWidget);
    });
  });
}
