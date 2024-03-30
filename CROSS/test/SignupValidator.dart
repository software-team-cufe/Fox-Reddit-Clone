import 'LoginValidator.dart';

class SignupValidator {
  static String? nameValidator(final String value) {
    if (value.trim().isEmpty) {
      return 'Please enter your name';
    }
    return null; // No error if name is not empty
  }

  static String? emailValidator(final String value) {
    // Reuse the email validation logic from LoginValidator
    final emailError = LoginValidator.emailValidator(value);
    return emailError;
  }

  static String? passwordValidator(final String value) {
    // Reuse the password validation logic from LoginValidator
    final passwordError = LoginValidator.passwordValidator(value);
    return passwordError;
  }

  static String? birthDateValidator(final DateTime? date) {
    if (date == null) {
      return 'Please select your birthdate';
    }
    // You can add further validation rules for birthdate here (e.g., minimum age)
    return null;
  }

  static String? termsValidator(final bool accepted) {
    if (!accepted) {
      return 'Please accept the terms and conditions';
    }
    return null;
  }

  // You can add validation for other fields if needed
}
