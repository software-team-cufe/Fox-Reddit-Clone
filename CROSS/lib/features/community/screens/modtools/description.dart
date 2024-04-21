import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

/// A screen for editing user description.
class DescriptionScreen extends StatefulWidget {
  /// Constructor for the DescriptionScreen.
  const DescriptionScreen({super.key});

  @override
  _DescriptionScreenState createState() => _DescriptionScreenState();
}

class _DescriptionScreenState extends State<DescriptionScreen> {
  TextEditingController _descriptionController = TextEditingController();
  String _description = '';

  /// Updates the user's bio with the provided [newBio].
  Future<void> updateBio(String newBio) async {
    try {
      final response = await http.put(
        Uri.parse('your_api_endpoint_here'), // Replace with your API endpoint
        body: {'Bio': newBio},
      );
      if (response.statusCode == 200) {
        // Handle success
        print('Bio updated successfully');
      } else {
        // Handle other status codes (e.g., error updating bio)
        print('Failed to update bio: ${response.statusCode}');
      }
    } catch (e) {
      // Handle network or other errors
      print('Error updating bio: $e');
    }
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Description'),
        actions: [
          IconButton(
            icon: const Icon(Icons.save),
            onPressed: () {
              _description = _descriptionController.text;
              updateBio(_description);
              Navigator.of(context).pop(_description);
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _descriptionController,
              decoration: const InputDecoration(
                hintText: 'Enter description',
                border: OutlineInputBorder(),
              ),
              maxLines: null,
              onChanged: (value) {
                setState(() {
                  _description = value;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}
