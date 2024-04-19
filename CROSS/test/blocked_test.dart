import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/settings/blockedAccounts.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('BlockedAccounts Widget Tests', () {
    late MockHttpClient mockClient;

    setUp(() {
      mockClient = MockHttpClient();
    });

    testWidgets('BlockedAccounts renders correctly with empty list', (WidgetTester tester) async {
      // Mock SharedPreferences for accessToken
      SharedPreferences.setMockInitialValues({'backtoken': 'testAccessToken'});
      
      // Mock the HTTP client response for blockListAPI call
      when(mockClient.get(Uri.parse('your_url_here'), headers: {'Authorization': 'Bearer testAccessToken'}))
          .thenAnswer((_) async => http.Response('{"blockedsData": []}', 200));

      await tester.pumpWidget(MaterialApp(
        home: BlockedAccounts(),
      ));

      // Wait for API call to complete
      await tester.pump();

      expect(find.text('Blocked Accounts'), findsOneWidget);
      expect(find.byType(TextField), findsOneWidget);
      expect(find.byType(ListTile), findsNothing); // No blocked accounts, so ListTile should not be found
    });

    testWidgets('BlockedAccounts renders correctly with non-empty list', (WidgetTester tester) async {
      // Mock SharedPreferences for accessToken
      SharedPreferences.setMockInitialValues({'backtoken': 'testAccessToken'});
      
      // Mock the HTTP client response for blockListAPI call
      when(mockClient.get(Uri.parse('your_url_here'), headers: {'Authorization': 'Bearer testAccessToken'}))
          .thenAnswer((_) async => http.Response(jsonEncode({"blockedsData": [{"username": "testUser", "avatar": "avatar.jpg"}]}), 200));

      await tester.pumpWidget(MaterialApp(
        home: BlockedAccounts(),
      ));

      // Wait for API call to complete
      await tester.pump();

      expect(find.text('Blocked Accounts'), findsOneWidget);
      expect(find.byType(TextField), findsOneWidget);
      expect(find.byType(ListTile), findsOneWidget); // ListTile should be found for each blocked account
      expect(find.text('testUser'), findsOneWidget);
    });

    // Add more tests as needed...

  });

  group('FollowersBlockedCard Widget Tests', () {
    testWidgets('FollowersBlockedCard renders correctly with initial state', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: FollowersBlockedCard(
          accessToken: 'testAccessToken',
          name: 'testUser',
        ),
      ));

      expect(find.text('testUser'), findsOneWidget);
      expect(find.byType(CircleAvatar), findsOneWidget);
      expect(find.byType(TextButton), findsOneWidget);
      expect(find.text('Unblock'), findsOneWidget); // Initial state should be Unblock
    });

    // Add more tests for button press, API calls, etc...

  });
}
