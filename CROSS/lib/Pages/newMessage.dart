import 'package:flutter/material.dart';
import 'package:reddit_fox/GeneralWidgets/textInput.dart';

class NewMessage extends StatefulWidget {
  const NewMessage({super.key});

  @override
  State<NewMessage> createState() => _NewMessageState();
}

class _NewMessageState extends State<NewMessage> {
  List<Widget> inputWidgets = [
    const MyTextInputWidget(inputTitle: 'u/username', sheight: 50),
    const MyTextInputWidget(inputTitle: 'Subject', sheight: 50),
    const MyTextInputWidget(inputTitle: 'Message', sheight: 50),
  ];

  bool showURLInput = false;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          actions: [
            IconButton(icon: const Icon(Icons.send), onPressed: () {}),
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: inputWidgets,
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              if (showURLInput) {
                // Remove URL input widget
                inputWidgets.removeLast();
              } else {
                // Add URL input widget
                inputWidgets
                    .add(const MyTextInputWidget(inputTitle: 'URL', sheight: 50));
              }
              // Toggle the flag
              showURLInput = !showURLInput;
            });
          },
          backgroundColor: Colors.transparent,
          child: Icon(
            showURLInput ? Icons.delete : Icons.link,
            color: Colors.white,
            size: 50,
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      ),
    );
  }
}
