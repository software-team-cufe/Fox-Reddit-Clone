import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

/// Displays a snackbar with the given [text].
///
/// This function is used to display a snackbar message within the context of a scaffold.
///
/// [context] is the BuildContext in which the snackbar should be displayed.
/// [text] is the text content of the snackbar.
void showSnackBar(BuildContext context, String text) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(
      SnackBar(
        content: Text(text),
      ),
    );
}

/// Prompts the user to pick an image file.
///
/// This function uses the file_picker package to prompt the user to pick an image file.
///
/// Returns a [FilePickerResult] object representing the picked image file, or null if no file was picked.
Future<FilePickerResult?> pickImage() async {
  final image = await FilePicker.platform.pickFiles(type: FileType.image);
  return image;
}
