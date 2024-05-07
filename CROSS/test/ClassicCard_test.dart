import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/Pages/home/Post%20widgets/PostCardClassic.dart';

void main() {
  testWidgets('ClassicCard widget renders correctly',
      (WidgetTester tester) async {
    // Build our widget and trigger a frame.
    await tester.pumpWidget(const ClassicCard(
      post: {
        'communityName': 'Flutter',
        'title': 'Test Post',
        'text': 'This is a test post',
        'picture': null,
        'attachments': [],
        'nsfw': false,
        'spoiler': false,
      },
    ));

    // Verify that the title and text are displayed.
    expect(find.text('Test Post'), findsOneWidget);
    expect(find.text('This is a test post'), findsOneWidget);

    // Verify that the NSFW and Spoiler indicators are not displayed.
    expect(find.text('NSFW'), findsNothing);
    expect(find.text('Spoiler'), findsNothing);
  });

  testWidgets('ClassicCard widget displays NSFW and Spoiler indicators',
      (WidgetTester tester) async {
    // Build our widget and trigger a frame.
    await tester.pumpWidget(const ClassicCard(
      post: {
        'communityName': 'Flutter',
        'title': 'Test Post',
        'text': 'This is a test post',
        'picture': null,
        'attachments': [],
        'nsfw': true,
        'spoiler': true,
      },
    ));

    // Verify that the NSFW and Spoiler indicators are displayed.
    expect(find.text('NSFW'), findsOneWidget);
    expect(find.text('Spoiler'), findsOneWidget);
  });
}
