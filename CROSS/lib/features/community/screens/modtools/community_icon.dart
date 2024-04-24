import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

/// A screen for selecting or uploading a community icon.
class CommunityIconScreen extends StatefulWidget {
  /// The subreddit associated with the community icon.
  final String subreddit;

  /// Constructor for the CommunityIconScreen.
  const CommunityIconScreen({super.key, required this.subreddit});

  @override
  _CommunityIconScreenState createState() => _CommunityIconScreenState();
}

class _CommunityIconScreenState extends State<CommunityIconScreen> {
  Color _selectedColor = Colors.blue;
  File? _selectedImage;

  /// Opens a dialog to select a color or upload an image for the community icon.
  void _openColorPicker() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Select a Color or Image'),
          content: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextButton(
                  onPressed: () async {
                    Navigator.of(context).pop();
                    final pickedColor = await showDialog<Color>(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: const Text('Select a Color'),
                          content: SingleChildScrollView(
                            child: ColorPicker(
                              pickerColor: _selectedColor,
                              onColorChanged: (color) {
                                setState(() => _selectedColor = color);
                              },
                              showLabel: true,
                              pickerAreaHeightPercent: 0.8,
                            ),
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.of(context).pop(_selectedColor),
                              child: const Text('OK'),
                            ),
                          ],
                        );
                      },
                    );
                    if (pickedColor != null) {
                      setState(() => _selectedColor = pickedColor);
                    }
                  },
                  child: const Text('Choose Color'),
                ),
                TextButton(
                  onPressed: () async {
                    Navigator.of(context).pop();
                    final pickedImage =
                        await ImagePicker().getImage(source: ImageSource.gallery);
                    if (pickedImage != null) {
                      setState(() => _selectedImage = File(pickedImage.path));
                    }
                  },
                  child: const Text('Upload Image'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  /// Uploads the selected community icon.
  Future<void> _uploadCommunityIcon() async {
    try {
      final url = Uri.parse('https://www.reddit.com/r/${widget.subreddit}/api/upload_sr_img');
      final headers = {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE',
      };

      if (_selectedImage != null) {
        var request = http.MultipartRequest('POST', url);
        request.headers.addAll(headers);
        request.fields['communityID'] = 'YOUR_COMMUNITY_ID_HERE';
        request.files.add(await http.MultipartFile.fromPath('file', _selectedImage!.path));

        final response = await request.send();
        if (response.statusCode == 200) {
          print('Community icon uploaded successfully');
        } else {
          print('Failed to upload community icon: ${response.statusCode}');
        }
      } else {
        final body = {
          'img_type': 'png',
          'img_data': _selectedColor.toString(),
          'img_name': 'community_icon.png',
        };

        final response = await http.post(
          url,
          headers: headers,
          body: body,
        );

        if (response.statusCode == 200) {
          print('Community icon uploaded successfully');
        } else {
          print('Failed to upload community icon: ${response.statusCode}');
        }
      }
    } catch (e) {
      print('Error uploading community icon: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Community Icon'),
        actions: [
          TextButton(
            onPressed: _uploadCommunityIcon,
            child: const Text(
              'Save',
              style: TextStyle(
                fontSize: 16,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Select a color or upload an image for your community icon:',
              style: TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 20),
            GestureDetector(
              onTap: _openColorPicker,
              child: Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: _selectedColor,
                  shape: BoxShape.circle,
                  image: _selectedImage != null
                      ? DecorationImage(
                          image: FileImage(_selectedImage!),
                          fit: BoxFit.cover,
                        )
                      : null,
                ),
                child: const Center(
                  child: Text(
                    'Tap to\nSelect',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16, color: Colors.white),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
