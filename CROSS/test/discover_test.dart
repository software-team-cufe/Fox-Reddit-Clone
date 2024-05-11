import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/features/auth/screens/discover_community_screen%20.dart';

// Mock the class responsible for fetching communities
class MockDiscoveryCommunities extends Mock
    implements Future<Map<dynamic, dynamic>> {
  // Define a method to mimic the actual behavior of discoveryCommunities
  Future<Map<dynamic, dynamic>> fetchCommunities() =>
      super.noSuchMethod(Invocation.method(#fetchCommunities, []),
          returnValue: Future.value({}));
}

void main() {
  group('MoreLikeContainer Test', () {
    testWidgets(
      'Renders correctly with fetched communities',
      (WidgetTester tester) async {
        // Mock successful community data fetching
        final mockCommunities = {
          '1': {
            'communityName': 'Flutter Dev',
            'Bio': 'Join the Flutter developers community!'
          },
          '2': {
            'communityName': 'Dart',
            'Bio': 'Everything about the Dart programming language.'
          },
        };
        final mockDiscoveryCommunities = MockDiscoveryCommunities();
        when(mockDiscoveryCommunities.fetchCommunities())
            .thenAnswer((_) => Future.value(mockCommunities));

        // Wrap with MaterialApp for widget testing context
        await tester.pumpWidget(MaterialApp(
          home: MoreLikeContainer(
            communityName: 'Popular',
            communityCards: mockDiscoveryCommunities.fetchCommunities(),
          ),
        ));

        // Find and check the title
        expect(find.text('More Like Popular'), findsOneWidget);

        // Check for two SuggestedCommunityCard widgets
        expect(find.byType(SuggestedCommunityCard), findsNWidgets(2));

        // Verify first card content (replace with actual matchers based on your widget structure)
        final firstCard =
            tester.firstWidget(find.byType(SuggestedCommunityCard));
        expect((firstCard as SuggestedCommunityCard).name, 'Flutter Dev');
        expect((firstCard).bio, 'Join the Flutter developers community!');
      },
    );

    testWidgets(
      'Shows error message when community data fails to load',
      (WidgetTester tester) async {
        // Mock failed community data fetching
        final mockDiscoveryCommunities = MockDiscoveryCommunities();
        when(mockDiscoveryCommunities.fetchCommunities())
            .thenThrow(Exception('Failed to load communities'));

        // Wrap with MaterialApp for widget testing context
        await tester.pumpWidget(MaterialApp(
          home: MoreLikeContainer(
            communityName: 'Popular',
            communityCards: mockDiscoveryCommunities.fetchCommunities(),
          ),
        ));

        // Find and check the error text
        expect(find.text('Error: Exception: Failed to load communities'),
            findsOneWidget);
      },
    );
  });
}
