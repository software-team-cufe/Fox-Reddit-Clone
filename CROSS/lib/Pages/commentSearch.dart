import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/notification_posts.dart';

class comentViewSerch extends StatelessWidget {
  final Map<String, dynamic> comment;
  const comentViewSerch({Key? key, required this.comment}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: Colors.transparent,
                backgroundImage: comment['communityIcon'] != null && comment['communityIcon'] is String
                    ? NetworkImage(comment['communityIcon'])
                    : AssetImage('assets/images/avatar.png') as ImageProvider<Object>?,
              ),
              SizedBox(width: 10),
              Text(
                'r/${comment['communityName']}',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                ),
              ),
            ],
          ),
          Text(
            comment['textHTML'],
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w400,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: GestureDetector(
              onTap: () {
                // Navigator.push(
                //   context,
                //   MaterialPageRoute(
                //   builder: (context) => PostDetails(post: ,)
                // ));
              },
            child: Container(
              color: Color.fromARGB(255, 54, 54, 54),
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // Add your content here
                  Text(
                    comment['textJSON'],
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  // Add more items to see the container expanding
                ],
              ),
            ),
          ),
          ),
        ],
      ),
    );
    
  }
}
