import 'package:flutter/material.dart';

class PollPage extends StatefulWidget {
  final List<String> options; // Options list
  const PollPage({Key? key, required this.options}) : super(key: key);

  @override
  _PollPageState createState() => _PollPageState();
}

class _PollPageState extends State<PollPage> {
  int? _selectedOption; // Updated to allow null values
  late List<String> _options; // Initial options

  final TextEditingController _textEditingController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _options = List.from(widget.options); // Initialize options list
  }

  void _submitResponse() {
    if (_selectedOption != null) {
      print('User selected option: ${_options[_selectedOption!]}');
      // Handle submission of response
    }
  }

  void _addOption(String option) {
    setState(() {
      _options.add(option);
      _textEditingController.clear(); // Clear text field after adding option
    });
  }

  @override
  void dispose() {
    // Dispose the TextEditingController when the widget is disposed
    _textEditingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Column(
            children: List.generate(
              _options.length, // number of options
              (index) => RadioListTile(
                title: Text(_options[index]),
                value: index,
                groupValue: _selectedOption,
                onChanged: (value) {
                  setState(() {
                    _selectedOption = value;
                  });
                },
              ),
            ),
          ),
          const SizedBox(height: 20.0),
          TextField(
            controller: _textEditingController,
            decoration: const InputDecoration(labelText: 'Enter option'),
            onSubmitted: (option) {
              _addOption(option);
            },
          ),
        ],
      ),
    );
  }
}
