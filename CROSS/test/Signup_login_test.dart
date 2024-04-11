import 'package:flutter_test/flutter_test.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:reddit_fox/core/common/CustomDatePicker.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/signup_screen.dart';

void main() {
  group('LoginScreen Widget Tests', () {
    testWidgets('UI Test', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: LoginScreen(),
        ),
      );

      // Verify that the title is displayed.
      expect(find.text('login'), findsOneWidget);

      // Verify that the email field is displayed.
      expect(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox &&
              widget.hintText == 'Email or Phone number'),
          findsOneWidget);

      // Verify that the password field is displayed.
      expect(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox && widget.hintText == 'Password'),
          findsOneWidget);

      // Verify that the login button is displayed.
      expect(find.text('Login'), findsOneWidget);

      // Verify that the forget password button is displayed.
      expect(find.text('Forget password'), findsOneWidget);
    });

    testWidgets('Validation Test', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: LoginScreen(),
        ),
      );

      // Enter invalid email and password.
      await tester.enterText(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox &&
              widget.hintText == 'Email or Phone number'),
          'invalidemail');
      await tester.enterText(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox && widget.hintText == 'Password'),
          'short');

      // Tap on the login button.
      await tester.tap(find.text('Login'));
      // Wait for the UI to update.
      await tester.pump();

      // Verify that error message is displayed.
      expect(find.text('Please enter Valid Data'), findsOneWidget);

      // Enter valid email and password.
      await tester.enterText(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox &&
              widget.hintText == 'Email or Phone number'),
          'validemail@example.com');
      await tester.enterText(
          find.byWidgetPredicate((widget) =>
              widget is CustomTextBox && widget.hintText == 'Password'),
          'longpassword');

      // Tap on the login button.
      await tester.tap(find.text('Login'));
      // Wait for the UI to update.
      await tester.pump();

      // Verify that error message is not displayed.
      expect(find.text('Please enter Valid Data'), findsNothing);
    });
  });

  group('SignupScreen Widget Tests', () {
    testWidgets('UI Test', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: SignupScreen(),
        ),
      );

      expect(find.text('Signup'), findsOneWidget);

      expect(
        find.byWidgetPredicate(
            (widget) => widget is CustomTextBox && widget.hintText == 'Name'),
        findsOneWidget,
      );

      // Verify that the email field is displayed.
      expect(
        find.byWidgetPredicate(
            (widget) => widget is CustomTextBox && widget.hintText == 'Email'),
        findsOneWidget,
      );

      // Verify that the password field is displayed.
      expect(
        find.byWidgetPredicate((widget) =>
            widget is CustomTextBox && widget.hintText == 'Password'),
        findsOneWidget,
      );

      // Verify that the birthdate picker is displayed.
      expect(
        find.byWidgetPredicate((widget) =>
            widget is CustomDatePicker && widget.subTitle == 'Birthdate'),
        findsOneWidget,
      );

      // Verify that the accept terms checkbox is displayed.
      expect(find.text('Accept terms and conditions'), findsOneWidget);

      // Verify that the create account button is displayed.
      expect(find.text('Create account'), findsOneWidget);
    });

    testWidgets('Validation Test - Empty Fields', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: SignupScreen(),
        ),
      );

      // Tap on the create account button without entering any data.
      await tester.tap(find.text('Create account'));
      await tester.pump();

      // Expect error message for empty fields.
      expect(find.text('Please enter Valid Data and accept termsandconditions'),
          findsOneWidget);
    });

    testWidgets('Validation Test - Invalid Email', (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: SignupScreen(),
        ),
      );

      // Enter invalid email.
      await tester.enterText(
        find.byWidgetPredicate(
            (widget) => widget is CustomTextBox && widget.hintText == 'Email'),
        'invalidemail',
      );

      // Tap on the create account button.
      await tester.tap(find.text('Create account'));
      await tester.pump();

      // Expect error message for invalid email.
      expect(find.text('Please enter Valid Data and accept termsandconditions'),
          findsOneWidget);
    });

    testWidgets('Validation Test - Short Password',
        (WidgetTester tester) async {
      // Build our app and trigger a frame.
      await tester.pumpWidget(
        const GetMaterialApp(
          home: SignupScreen(),
        ),
      );

      // Enter valid email but short password.
      await tester.enterText(
        find.byWidgetPredicate(
            (widget) => widget is CustomTextBox && widget.hintText == 'Email'),
        'validemail@example.com',
      );

      await tester.enterText(
        find.byWidgetPredicate((widget) =>
            widget is CustomTextBox && widget.hintText == 'Password'),
        'short',
      );

      // Tap on the create account button.
      await tester.tap(find.text('Create account'));
      await tester.pump();

      // Expect error message for short password.
      expect(find.text('Please enter Valid Data and accept termsandconditions'),
          findsOneWidget);
    });
  });
}
