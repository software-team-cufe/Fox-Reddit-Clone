import 'package:flutter/material.dart';
import 'package:get/get.dart';
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

class CommentListView extends StatefulWidget {
  final List<Map<String, dynamic>> comments;
  final String userName;

  CommentListView({required this.comments, required this.userName});

  @override
  State<CommentListView> createState() => _CommentListViewState();
}

class _CommentListViewState extends State<CommentListView> {
  String user_name = '';

  @override
  void initState() {
    super.initState();
    user_name = widget.userName;
  }
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: widget.comments.length,
      itemBuilder: (BuildContext context, int index) {
        final comment = widget.comments[index];
        return ListTile(
          title: Text(
            "${comment['textHTML']}", // Displaying comment text
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 14,
              color: Color.fromARGB(255, 219, 216, 216),
            ),
          ),
          subtitle: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    "u/${user_name}. ${getDaysDifference(comment["createdAt"])} . ${comment['votesCount']}",
                    style: TextStyle(
                      fontSize: 14,
                       color: Color(0xFF989898),
                    ),
                  ),
                  SizedBox(width: 3,),
                  Image.asset(
                    'assets/Icons/down-arrow.png', // Replace 'image_name.png' with the actual image path
                    width: 14, // Adjust width as needed
                    height: 14, // Adjust height as needed
                  ),
                ],
              ),
              Text(
                '${comment['textJSON']}', // Displaying author ID
                style: TextStyle(
                  fontSize: 14,
                   color: Color(0xFF989898),
                ),
              ),
              const Divider(
                height: 1,
                color: Color.fromARGB(255, 44, 43, 43),
                thickness: 1,
                indent: 1,
                endIndent: 1),
            ],
          ),
        );
      },
    );
  }
}
