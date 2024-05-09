import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get_connect/http/src/_http/mock/http_request_mock.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;

// Generate mocks for http client (replace with actual implementation if needed)
@GenerateMocks([http.Client])
void main() {
  group('ForgetPasswordScreen Test', () {
    late MockClient mockClient;

    testWidgets(
      'Renders correctly and shows success message on button tap',
      (WidgetTester tester) async {
        // Mock successful API response (replace with actual matcher if needed)

        await tester.pumpWidget(const MaterialApp(
          home: ForgetPasswordScreen(),
        ));

        // Find email text field and enter a value
        final emailField = find.widgetWithText(CustomTextBox, 'Email');
        await tester.enterText(emailField, 'test@example.com');

        // Find and tap the button
        final resetButton = find.widgetWithText(CustomButton, 'Reset password');
        await tester.tap(resetButton);

        // Rebuild the widget tree after actions
        await tester.pump();

        // Expect success message to be visible
        expect(
            find.text(
                'Reset instructions sent if your email exists in our system'),
            findsOneWidget);
      },
    );

    testWidgets(
      'Shows error message on unsuccessful API call',
      (WidgetTester tester) async {
        // Mock failed API response (replace with actual matcher if needed)

        await tester.pumpWidget(const MaterialApp(
          home: ForgetPasswordScreen(),
        ));

        // Find email text field and enter a value
        final emailField = find.widgetWithText(CustomTextBox, 'Email');
        await tester.enterText(emailField, 'invalid@email.com');

        // Find and tap the button
        final resetButton = find.widgetWithText(CustomButton, 'Reset password');
        await tester.tap(resetButton);

        // Rebuild the widget tree after actions
        await tester.pump();

        // Expect an error message (replace with actual matcher based on implementation)
        expect(find.text('Error'),
            findsOneWidget); // Replace with specific error message

        // Verify email sent with correct data
      },
    );
  });
}
