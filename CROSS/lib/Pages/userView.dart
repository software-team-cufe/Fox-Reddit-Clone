// import 'dart:html';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

int getDaysDifference(String dateString) {
  // Parse the date string into a DateTime object
  DateTime dateTime = DateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(dateString);
  
  // Get the current DateTime
  DateTime currentDate = DateTime.now();

  // Calculate the difference between the two DateTime objects in days
  int differenceInDays = currentDate.difference(dateTime).inDays;
  
  return differenceInDays;
}

class userView extends StatefulWidget {
  final List<Map<String, dynamic>> comments;

  userView({required this.comments});

  @override
  State<userView> createState() => _userView();
}

class _userView extends State<userView> {
  @override
  void initState() {
    super.initState();
    // print("data is: $Comment");
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: widget.comments.length,
      itemBuilder: (BuildContext context, int index) {
        final comment = widget.comments[index];
        return ListTile(
          title: Row(
            children: [
              CircleAvatar(
                backgroundImage: comment['avatar'] != null && comment['avatar'] is String
                    ? NetworkImage(comment['avatar'] as String)
                    : AssetImage('assets/placeholder_image.png') as ImageProvider<Object>?, // Cast to ImageProvider<Object>?
              ),
              SizedBox(width: 10),
              Column(
                children: [
                  Text(
                    "u/${comment['username']}",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                      color: Color.fromARGB(255, 219, 216, 216),
                    ),
                  ),
                  Text(
                    "${comment['karma']} Karma",
                    style: TextStyle(
                      fontSize: 14,
                      color: Color(0xFF989898),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
