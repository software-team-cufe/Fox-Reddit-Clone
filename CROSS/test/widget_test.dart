import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/GeneralWidgets/textinput.dart';
import 'package:reddit_fox/GeneralWidgets/browse_row.dart';
import 'package:reddit_fox/GeneralWidgets/image_display.dart';
import 'package:reddit_fox/Pages/blanck.dart';
import 'package:reddit_fox/Pages/create_post.dart';
import 'package:reddit_fox/GeneralWidgets/Poll.dart';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/messages.dart';

class MockAddWidgetFunction extends Mock {
  void call(Widget widget);
}

void main() {
  group('MyTextInputWidget Test', () {
    late TextEditingController controller;

    setUp(() {
      controller = TextEditingController();
    });

    tearDown(() {
      controller.dispose();
    });

    testWidgets('Initial state test', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: MyTextInputWidget(
            inputTitle: 'Test',
          ),
        ),
      ));

      expect(find.text('Test'), findsOneWidget);
      expect(find.byType(TextField), findsOneWidget);

      // Text field should be initially empty
      expect(find.text(''), findsOneWidget);
    });

    testWidgets('Text field onChanged callback test',
        (WidgetTester tester) async {
      String? changedValue;
      await tester.pumpWidget(MaterialApp(
        home: Scaffold(
          body: MyTextInputWidget(
            inputTitle: 'Test',
            onChanged: (value) {
              changedValue = value;
            },
          ),
        ),
      ));
      await tester.enterText(find.byType(TextField), 'Hello');
      expect(changedValue, 'Hello');
    });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  testWidgets('MyApp Widget Test', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: Message(title: 'Inbox'),
    ));

    expect(find.text('Activity'), findsOneWidget);
    expect(find.text('Messages'), findsOneWidget);
    expect(find.byIcon(FontAwesomeIcons.wolfPackBattalion), findsOneWidget);
    expect(find.byType(BottomNavigationBar), findsOneWidget);
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  group('CreatePost Widget Test', () {
    late TextEditingController textEditingController;

    setUp(() {
      textEditingController = TextEditingController();
    });

    tearDown(() {
      textEditingController.dispose();
    });

    testWidgets('Initial UI Test', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: CreatePost()));

      // Check if initial UI contains necessary widgets
      expect(find.text('Next'), findsOneWidget);
      expect(find.text('Title'), findsOneWidget);
      expect(find.text('body text(optional)'), findsOneWidget);
      expect(find.byType(MyTextInputWidget), findsNWidgets(2));
    });

    testWidgets('Next Button Test', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: CreatePost()));

      // Tap on the Next button
      await tester.tap(find.text('Next'));
      await tester.pump();

      // Verify navigation to BlankPage
      expect(find.byType(BlankPage), findsOneWidget);
    });

    testWidgets('Toggle Poll Visibility Test', (WidgetTester tester) async {
      await tester.pumpWidget(MaterialApp(home: CreatePost()));

      expect(find.byType(PollPage), findsNothing);

      await tester.tap(find.byType(GestureDetector).first);
      await tester.pump();

      expect(find.byType(PollPage), findsOneWidget);
    });
  });
}
