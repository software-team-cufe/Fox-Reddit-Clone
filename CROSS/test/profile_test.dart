import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/Profile.dart';


class MockHttpClient extends Mock implements http.Client {}

void main() {
  group('ProfilePage Widget Tests', () {
    late MockHttpClient mockClient;

    setUp(() {
      mockClient = MockHttpClient();
    });

    testWidgets('ProfilePage renders loading indicator when userData is empty', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          myProfile: true,
          access_token: 'testAccessToken', userName: '',
        ),
      ));

      expect(find.byType(CircularProgressIndicator), findsOneWidget);
    });

    testWidgets('ProfilePage renders title view when myProfile is true and userData is not empty', (WidgetTester tester) async {
      // Mocking the http client response for fetchUserID call
      when(mockClient.get(any, headers: anyNamed('headers')))
          .thenAnswer((_) async => http.Response('{"user": {"avatar": "avatar.jpg", "_id": "userId", "createdAt": "2024-04-19T12:00:00Z", "username": "testUser"}}', 200));

      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: true,
          access_token: 'testAccessToken',
        ),
      ));

      // Wait for API call to complete
      await tester.pump();

      expect(find.text('testUser'), findsOneWidget);
    });

    testWidgets('ProfilePage renders alternate view when myProfile is false', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: false,
        ),
      ));

      expect(find.text('Alternate View'), findsOneWidget);
    });

    testWidgets('ProfilePage calls fetchData and fetchUserID when myProfile is true', (WidgetTester tester) async {
      // Mocking the http client response for fetchUserID call
      when(mockClient.get(any, headers: anyNamed('headers')))
          .thenAnswer((_) async => http.Response('{"user": {"avatar": "avatar.jpg", "_id": "userId", "createdAt": "2024-04-19T12:00:00Z", "username": "testUser"}}', 200));

      await tester.pumpWidget(MaterialApp(
        home: ProfilePage(
          userName: 'testUser',
          myProfile: true,
          access_token: 'testAccessToken',
        ),
      ));

      // Wait for API calls to complete
      await tester.pump();

      verify(mockClient.get(Uri.parse('Your getUserByToken URL here'), headers: anyNamed('headers'))).called(1);
      verify(mockClient.get(Uri.parse('Your getPostsByCreatorId URL here'), headers: anyNamed('headers'))).called(1);
    });
  });
}
