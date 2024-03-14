import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:reddit_fox/Pages/HomePage.dart';

class nBar extends StatefulWidget {
  const nBar({super.key});

  @override
  State<nBar> createState() => _nBarState();
}

class _nBarState extends State<nBar> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(bottom: 20.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          TextButton(
            onPressed: () {
              Navigator.push(context, 
              MaterialPageRoute(builder: (context) => HomePage()));
            },
            child:Icon(Icons.home, size: 30.0, color: Colors.white,),
          ),
          TextButton(
            onPressed: () {
              print('s');
            },
            child: Icon(Icons.people_outline_rounded, size: 30.0,
            color: Colors.white,),
          ),
          TextButton(
            onPressed: () {
              print('s');
            },
            child:Icon(Icons.add, size: 30.0, color: Colors.white,),
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