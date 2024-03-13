import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class nBar extends StatefulWidget {
  const nBar({super.key});

  @override
  State<nBar> createState() => _nBarState();
}

class _nBarState extends State<nBar> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        TextButton(
          onPressed: () {
            print('s');
          },
          child: const FaIcon(
            FontAwesomeIcons.house,
            size: 50.0,
          ),
        ),
        TextButton(
          onPressed: () {
            print('s');
          },
          child: const FaIcon(
            FontAwesomeIcons.peopleGroup,
            size: 50.0,
          ),
        ),
        TextButton(
          onPressed: () {
            print('s');
          },
          child: const FaIcon(
            FontAwesomeIcons.plus,
            size: 50.0,
          ),
        ),
        TextButton(
          onPressed: () {
            print('s');
          },
          child: const FaIcon(
            FontAwesomeIcons.message,
            size: 50.0,
          ),
        ),
        TextButton(
          onPressed: () {
            print('s');
          },
          child: const FaIcon(
            FontAwesomeIcons.bell,
            size: 50.0,
          ),
        ),
      ],
    );
  }
}
