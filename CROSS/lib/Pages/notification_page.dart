// import 'package:flutter/material.dart';

// class NotificationsPage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return FutureBuilder<List<Notification>>(
//       future: fetchNotifications(), // Function to fetch notifications
//       builder: (context, snapshot) {
//         if (snapshot.connectionState == ConnectionState.waiting) {
//           return CircularProgressIndicator(); // Loading indicator
//         } else if (snapshot.hasError) {
//           return Text('Error: ${snapshot.error}');
//         } else if (snapshot.data.isEmpty) {
//           return Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               Icon(Icons.notifications_off, size: 100),
//               SizedBox(height: 20),
//               Text(
//                 'Wow, such empty',
//                 style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
//               ),
//             ],
//           );
//         } else {
//           return ListView.builder(
//             itemCount: snapshot.data.length,
//             itemBuilder: (context, index) {
//               var notification = snapshot.data[index];
//               return ListTile(
//                 leading: Icon(Icons.person), // Replace with user's profile picture
//                 title: Text('u/${notification.username} replied to your post in r/${notification.subreddit}'),
//                 subtitle: Text(notification.message),
//                 trailing: Text('${notification.timeElapsed} ago'),
//               );
//             },
//           );
//         }
//       },
//     );
//   }
// }
// notification_page.dart

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class NotificationPage extends StatelessWidget {
  final List<Notification> notifications = [
    Notification(
      username: 'u/zsoltjuhos',
      subreddit: 'r/DBZDokkanBattle',
      content: 'Wish it could be said about her EZA as well',
      time: '3h ago',
    ),
    Notification(
      username: 'u/Fun-Detective-6089',
      subreddit: 'r/DBZDokkanBattle',
      content: 'I do kinda like the Sticker effect for her Untransformed state...',
      time: '3h ago',
    ),
    // Add more notifications here...
  ];

  @override
  Widget build(BuildContext context) {
    if (notifications.isEmpty) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FaIcon(FontAwesomeIcons.wolfPackBattalion,
                size: 100, color: Colors.white),
            SizedBox(height: 20),
            Text(
              'Wow Such empty',
              style: TextStyle(
                  fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      );
    } else {
      return ListView.builder(
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          return ListTile(
            leading: const Icon(Icons.notification_important),
            title: Text('${notifications[index].username} replied to your post in ${notifications[index].subreddit}'),
            subtitle: Text(notifications[index].content),
            trailing: Text(notifications[index].time),
          );
        },
      );
    }
  }
}



class Notification {
  final String username;
  final String subreddit;
  final String content;
  final String time;

  Notification({required this.username, required this.subreddit, required this.content, required this.time});
}
