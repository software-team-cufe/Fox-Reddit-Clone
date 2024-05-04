import 'package:flutter/material.dart';

class PollWidget extends StatefulWidget {
  final List<String> pollOptions;
  final Function(String) onOptionSelected;

  const PollWidget({
    super.key,
    required this.pollOptions,
    required this.onOptionSelected,
  });

  @override
  _PollWidgetState createState() => _PollWidgetState();
}

class _PollWidgetState extends State<PollWidget> {
  String _selectedOption = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.grey, // Border color
          width: 1, // Border width
        ),
        borderRadius: BorderRadius.circular(8), // Border radius
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12), // Updated padding
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: widget.pollOptions.map((option) {
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  children: [
                    Radio(
                      value: option,
                      groupValue: _selectedOption,
                      onChanged: (value) {
                        setState(() {
                          _selectedOption = value.toString();
                          widget.onOptionSelected(_selectedOption);
                        });
                      },
                    ),
                    Text(
                      option,
                      style: const TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
          Center(
            child: ElevatedButton(
              onPressed: () {
                // Handle submitting the poll
                // You can implement the logic to submit the selected option here
                widget.onOptionSelected(_selectedOption);
              },
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(
                    double.infinity, 40), // Full width with height of 40
              ),
              child: const Text('Vote'),
            ),
          ),
          const SizedBox(
              height:
                  8),
        ],
      ),
    );
  }
}
