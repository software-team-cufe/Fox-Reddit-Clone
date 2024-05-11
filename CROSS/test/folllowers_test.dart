import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/settings/Followers.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mockito/mockito.dart'; // Import mockito for mocking SharedPreferences

// Create a mock class for SharedPreferences
class MockSharedPreferences extends Mock implements SharedPreferences {}

void main() {
  group('FollowersPage Widget Test', () {
    late MockSharedPreferences mockSharedPreferences;

    setUp(() {
      mockSharedPreferences = MockSharedPreferences();
    });

    testWidgets('Widget Initialization Test', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: FollowersPage(),
        ),
      );

      expect(find.byType(FollowersPage), findsOneWidget);
      expect(find.text('followed Accounts'), findsOneWidget);
    });

    // testWidgets('Filter Function Test', (WidgetTester tester) async {
    //   await tester.pumpWidget(
    //     MaterialApp(
    //       home: FollowersPage(),
    //     ),
    //   );

    //   final followersPageFinder = find.byType(FollowersPage);
    //   final followersPage = tester.widget<FollowersPage>(followersPageFinder);

    //   followersPage.filterfollowedAccounts('dummy');

    //   expect(followersPage.filteredfollowedAccounts.length, 0);
    // });


  });
}
