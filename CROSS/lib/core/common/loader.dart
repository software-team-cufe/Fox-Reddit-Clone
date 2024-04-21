import 'package:flutter/material.dart';

/// A widget displaying a loader with a circular progress indicator in the center.
class Loader extends StatelessWidget {
  /// Constructs a [Loader] widget.
  const Loader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}
