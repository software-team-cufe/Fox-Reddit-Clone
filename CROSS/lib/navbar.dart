// ignore_for_file: camel_case_types

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/Home/HomePage.dart';

class nBar extends StatefulWidget {
  const nBar({super.key});

  @override
  State<nBar> createState() => _nBarState();
}

class _nBarState extends State<nBar> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          TextButton(
            onPressed: () {
              Navigator.push(context, 
              MaterialPageRoute(builder: (context) => const HomePage()));
            },
            child:const Icon(Icons.home, size: 30.0, color: Colors.white,),
          ),
          
          TextButton(
            onPressed: () {
              print('s');
            },
            child: const Icon(Icons.people_outline_rounded, size: 30.0,
            color: Colors.white,),
          ),
          TextButton(
            onPressed: () {
              print('s');
            },
            child:const Icon(Icons.add, size: 30.0, color: Colors.white,),
          ),
          TextButton(
            onPressed: () {
              print('s');
            },
            child: const FaIcon(
              FontAwesomeIcons.message,
              size: 20.0,
              color: Colors.white,
            ),
          ),
          TextButton(
            onPressed: () {
              print('s');
            },
            child: const FaIcon(
              FontAwesomeIcons.bell,
              size: 20.0,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}