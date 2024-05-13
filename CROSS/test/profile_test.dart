import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/Profile.dart';

class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('ProfilePage Widget Tests', () {
    testWidgets('ProfilePage shows loading indicator', (WidgetTester tester) async {
      // Build our widget
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe')));
      
      // Verify that loading indicator is displayed
      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('ProfilePage renders alternate view when myProfile is false',
        (WidgetTester tester) async {
      // Build our widget for someone else's profile
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'testUser', myProfile: false)));

      // Verify that alternate view is displayed
      await tester.pumpAndSettle();
      expect(find.text('testUser'), findsOneWidget);
    });

    testWidgets('ProfilePage shows follow button when viewing someone else\'s profile', (WidgetTester tester) async {
      // Build our widget for someone else's profile
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe', myProfile: false)));

      // Verify that follow button is displayed
      await tester.pumpAndSettle();
      expect(find.text('Follow'), findsOneWidget);
    });

    testWidgets('ProfilePage shows edit profile button when viewing my profile', (WidgetTester tester) async {
      // Build our widget for my profile
      await tester.pumpWidget(MaterialApp(home: ProfilePage(userName: 'JohnDoe', myProfile: true)));

      // Verify that edit profile button is displayed
      await tester.pumpAndSettle();
      expect(find.text('Edit Profile'), findsOneWidget);
    });

    testWidgets(
        'ProfilePage calls fetchData and fetchUserID when myProfile is true',
        (WidgetTester tester) async {
      // Create a mock client
      MockHttpClient mockClient = MockHttpClient();

      // Build the widget
      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: true,
          access_token: 'testAccessToken',
        ),
      ));

      // Wait for API calls to complete
      await tester.pump();

      // Verify that fetchData and fetchUserID are called
      verify(mockClient.get(Uri.parse('Your getUserByToken URL here'), headers: anyNamed('headers'))).called(1);
      verify(mockClient.get(Uri.parse('Your getPostsByCreatorId URL here'), headers: anyNamed('headers'))).called(1);
    });
  });
}
