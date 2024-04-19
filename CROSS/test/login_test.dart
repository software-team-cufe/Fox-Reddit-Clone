import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';

void main() {
  testWidgets('LoginScreen UI Test', (WidgetTester tester) async {
    // Build our widget and trigger a frame.
    await tester.pumpWidget(const MaterialApp(
      home: LoginScreen(),
    ));

    // Verify that LoginScreen title is displayed.
    expect(find.text('Login'), findsOneWidget);

    // Verify that email and password input fields are present.
    expect(find.byType(TextField), findsNWidgets(2));

    // Verify that the "Forgot password?" text button is present.
    expect(find.text('Forgot password?'), findsOneWidget);
  });
}
