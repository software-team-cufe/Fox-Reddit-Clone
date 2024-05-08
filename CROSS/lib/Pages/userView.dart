import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/Profile.dart';

class UserView extends StatelessWidget {
  final Map<String, dynamic> users;
  String? accessToken;

  UserView({required this.users, required this.accessToken});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: users.entries.map((MapEntry<String, dynamic> userEntry) {
          final avatar = users['avatar'];
          final username = users['username'];
          final karma = '${users['karma']}';

          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: GestureDetector(
              onTap: () {
                Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ProfilePage(
                                      userName: username,
                                      access_token: accessToken!,
                                    )),
                          );
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
                        "u/$username",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                          color: Color.fromARGB(255, 219, 216, 216),
                        ),
                      ),
                      Text(
                        "$karma Karma",
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
