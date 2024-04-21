import 'package:flutter/material.dart';

/// A widget for displaying error text in a centered position.
class ErrorText extends StatelessWidget {
  /// Constructs an [ErrorText] widget.
  ///
  /// [error] is the error message to be displayed.
  const ErrorText({
    super.key,
    required this.error,
  });

  /// The error message to be displayed.
  final String error;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(error),
    );
  }
}
