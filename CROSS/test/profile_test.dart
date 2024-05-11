import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/Profile.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('ProfilePage Widget Tests', () {
<<<<<<< HEAD
    testWidgets('ProfilePage shows loading indicator', (WidgetTester tester) async {
      // Build our widget
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe')));
=======
    late MockHttpClient mockClient;

    setUp(() {
      mockClient = MockHttpClient();
    });

    testWidgets('ProfilePage renders loading indicator when userData is empty',
        (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          myProfile: true,
          access_token: 'testAccessToken',
          userName: '',
        ),
      ));
>>>>>>> fe450b9084246ebe0caaab633e84dc881d112a0b

      // Verify that loading indicator is displayed
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

<<<<<<< HEAD
=======
    testWidgets(
        'ProfilePage renders title view when myProfile is true and userData is not empty',
        (WidgetTester tester) async {
      // Mocking the http client response for fetchUserID call
>>>>>>> fe450b9084246ebe0caaab633e84dc881d112a0b

    testWidgets('ProfilePage displays alternate view when not my profile', (WidgetTester tester) async {
      // Build our widget
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe', myProfile: false)));

      // Verify that alternate view is displayed
      await tester.pumpAndSettle();
      expect(find.text('JohnDoe'), findsOneWidget);
    });

<<<<<<< HEAD
    // Add more tests for other functionalities
=======
    testWidgets('ProfilePage renders alternate view when myProfile is false',
        (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: false,
        ),
      ));
>>>>>>> fe450b9084246ebe0caaab633e84dc881d112a0b

    testWidgets('ProfilePage shows follow button when viewing someone else\'s profile', (WidgetTester tester) async {
      // Build our widget for someone else's profile
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe', myProfile: false)));

      // Verify that follow button is displayed
      await tester.pumpAndSettle();
      expect(find.text('Follow'), findsOneWidget);
    });

<<<<<<< HEAD
    testWidgets('ProfilePage shows edit profile button when viewing my profile', (WidgetTester tester) async {
      // Build our widget for my profile
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe', myProfile: true)));

      // Verify that edit profile button is displayed
      await tester.pumpAndSettle();
      expect(find.text('Edit Profile'), findsOneWidget);
=======
    testWidgets(
        'ProfilePage calls fetchData and fetchUserID when myProfile is true',
        (WidgetTester tester) async {
      // Mocking the http client response for fetchUserID call

      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: true,
          access_token: 'testAccessToken',
        ),
      ));

      // Wait for API calls to complete
      await tester.pump();

      verify(mockClient.get(Uri.parse('Your getUserByToken URL here'),
              headers: anyNamed('headers')))
          .called(1);
      verify(mockClient.get(Uri.parse('Your getPostsByCreatorId URL here'),
              headers: anyNamed('headers')))
          .called(1);
>>>>>>> fe450b9084246ebe0caaab633e84dc881d112a0b
    });

    // Add more tests as needed
  });
}
