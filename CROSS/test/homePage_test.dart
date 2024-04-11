import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';

class MockNavigatorObserver extends Mock implements NavigatorObserver {}

void main() {
  testWidgets('HomePage Widget Test', (WidgetTester tester) async {
    final mockObserver = MockNavigatorObserver();

    await tester.pumpWidget(MaterialApp(
      home: HomePage(),
      navigatorObservers: [mockObserver],
    ));

    expect(find.byType(AppBar), findsOneWidget);
    expect(find.text('Home'), findsOneWidget);

    expect(find.byType(ListView), findsOneWidget);

    expect(find.byType(CustomDrawer), findsNothing);
    expect(find.byType(endDrawer), findsNothing);

    await tester.tap(find.byIcon(Icons.menu));
    await tester.pump();

    expect(find.byType(CustomDrawer), findsOneWidget);

    await tester.tap(find.byIcon(Icons.search));
    await tester.pumpAndSettle();

    //verify(mockObserver.didPush(any, any)).captured; // Verify navigation to Search page

    await tester.tap(find.byType(CircleAvatar));
    await tester.pump();

    expect(find.byType(endDrawer), findsOneWidget);

    await tester.tap(find.text('Watch'));
    await tester.pumpAndSettle();

    expect(find.text('Watch'), findsOneWidget);

    expect(find.byType(ListTile), findsNWidgets(3)); // Expect 3 posts to be displayed
  });
}
