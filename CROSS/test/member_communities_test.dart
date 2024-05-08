import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/settings/blockedAccounts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/models/community_model.dart';
import 'package:http/http.dart' as http;

class MockHttpClient extends Mock implements http.Client {}

class MockSharedPreferences extends Mock implements SharedPreferences {}

void main() {
  group('getUserCommunities Test', () {
    late MockHttpClient mockClient;
    late MockSharedPreferences mockSharedPreferences;

    setUp(() {
      mockClient = MockHttpClient();
      mockSharedPreferences = MockSharedPreferences();
    });

    testWidgets('getUserCommunities renders correctly with empty list', (WidgetTester tester) async {
      // Mock SharedPreferences for accessToken
      when(mockSharedPreferences.getString('backtoken')).thenReturn('testAccessToken');

      // Mock the HTTP client response for getUserCommunities API call
      when(mockClient.get(Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/subreddits/mine/member'),
          headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer testAccessToken'}))
          .thenAnswer((_) async => http.Response('{"communities": []}', 200));

      await tester.pumpWidget(MaterialApp(
        home: BlockedAccounts(),
      ));

      // Wait for API call to complete
      await tester.pump();

      // Assertions here...
    });

    testWidgets('getUserCommunities renders correctly with non-empty list', (WidgetTester tester) async {
      // Mock SharedPreferences for accessToken
      when(mockSharedPreferences.getString('backtoken')).thenReturn('testAccessToken');

      // Mock the HTTP client response for getUserCommunities API call
      when(mockClient.get(Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/subreddits/mine/member'),
          headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': 'Bearer testAccessToken'}))
          .thenAnswer((_) async => http.Response(jsonEncode({"communities": [
        {"name": "Community1", "memberCount": 100, "icon": "icon1.jpg"},
        {"name": "Community2", "memberCount": 200, "icon": "icon2.jpg"}
      ]}), 200));

      await tester.pumpWidget(MaterialApp(
        home: BlockedAccounts(),
      ));

      // Wait for API call to complete
      await tester.pump();

      // Assertions here...
    });

    // Add more tests as needed...

  });
}
