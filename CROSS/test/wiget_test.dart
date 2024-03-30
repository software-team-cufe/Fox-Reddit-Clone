import 'package:flutter_test/flutter_test.dart';

import 'LoginValidator.dart';
import 'SignupValidator.dart';

void main() {
  group('LoginValidator tests', () {
    test('emailValidator - empty email', () {
      const emptyEmail = "";
      final error = LoginValidator.emailValidator(emptyEmail);
      expect(error, 'Please enter email');
    });

    test('emailValidator - invalid email', () {
      const invalidEmail = "invalid_email";
      final error = LoginValidator.emailValidator(invalidEmail);
      expect(error, 'Please enter a valid email');
    });

    test('emailValidator - valid email', () {
      const validEmail = "johndoe@example.com";
      final error = LoginValidator.emailValidator(validEmail);
      expect(error, 'email is valid'); // No error message
    });

    // Password validator tests
    test('passwordValidator - empty password', () {
      const emptyPassword = "";
      final error = LoginValidator.passwordValidator(emptyPassword);
      expect(error, 'Please enter password');
    });

    test('passwordValidator - less than 7 characters', () {
      const shortPassword = "short";
      final error = LoginValidator.passwordValidator(shortPassword);
      expect(error, 'Please enter more than 7 characters');
    });

    test('passwordValidator - valid password', () {
      const validPassword = "StrongPassword123";
      final error = LoginValidator.passwordValidator(validPassword);
      expect(error, 'password is valid');
    });
  });

  group('SignupValidator tests', () {
    test('nameValidator - empty name', () {
      const emptyName = "";
      final error = SignupValidator.nameValidator(emptyName);
      expect(error, 'Please enter your name');
    });

    test('nameValidator - valid name', () {
      const validName = "John Doe";
      final error = SignupValidator.nameValidator(validName);
      expect(error, null); // No error for valid name
    });

    // Email and password validation already tested in LoginValidator

    test('birthDateValidator - null date', () {
      const nullDate = null;
      final error = SignupValidator.birthDateValidator(nullDate);
      expect(error, 'Please select your birthdate');
    });

    test('birthDateValidator - valid date', () {
      final validDate = DateTime.now();
      final error = SignupValidator.birthDateValidator(validDate);
      expect(error, null); // No error for valid date
    });

    test('termsValidator - not accepted', () {
      final error = SignupValidator.termsValidator(false);
      expect(error, 'Please accept the terms and conditions');
    });

    test('termsValidator - accepted', () {
      final error = SignupValidator.termsValidator(true);
      expect(error, null); // No error for accepted terms
    });
  });
}
