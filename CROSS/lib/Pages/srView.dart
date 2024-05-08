import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';

// ignore: must_be_immutable
class SRView extends StatelessWidget {
  final Map<String, dynamic> users;
  String? accessToken;

  SRView({super.key, required this.users, required this.accessToken});

  @override
  Widget build(BuildContext context) {
    print("srUser : $users");
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: users.entries.map((MapEntry<String, dynamic> userEntry) {
          final avatar = users['icon'];
          final username = users['name'];
          final karma = '${users['membersCnt']}';

          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: GestureDetector(
              onTap: () {
                
              },
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.transparent,
                    backgroundImage: avatar != null && avatar is String
                        ? NetworkImage(avatar)
                        : AssetImage('assets/images/avatar.png') as ImageProvider<Object>?,
                  ),
                  SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "r/$username",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Color.fromARGB(255, 219, 216, 216),
                        ),
                      ),
                      Text(
                        "$karma member",
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF989898),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
