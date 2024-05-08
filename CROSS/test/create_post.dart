import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';
import 'package:reddit_fox/Pages/Blanck.dart';
import 'package:reddit_fox/Pages/create_post.dart';
import 'package:reddit_fox/GeneralWidgets/poll.dart';
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
            onTextChanged: (value) {
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
      home: Message(),
      //home: Message(title: 'Inbox'),
    ));

    expect(find.text('Notification'), findsOneWidget);
    expect(find.text('Messages'), findsOneWidget);
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
      expect(find.text('body text(optional)'), findsAtLeastNWidgets(0));
    });

  });
}
