class LoginValidator {
  static emailValidator(final String value) {
    if (value.trim().isEmpty) return "Please enter email";
    RegExp emailpaatern = RegExp(
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    if (!emailpaatern.hasMatch(value)) return "Please enter a valid email";

    return null;
  }

  static passwordValidator(final String value) {
    if (value.trim().isEmpty) return "Please enter password";
    if (value.length < 7) return "Please enter more than 7 characters";
    return null;


  }
}
