import 'package:flutter/material.dart';

class NotificationsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Notification>>(
      future: fetchNotifications(), // Function to fetch notifications
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator(); // Loading indicator
        } else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else if (snapshot.data.isEmpty) {
          return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.notifications_off, size: 100),
              SizedBox(height: 20),
              Text(
                'Wow, such empty',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ],
          );
        } else {
          return ListView.builder(
            itemCount: snapshot.data.length,
            itemBuilder: (context, index) {
              var notification = snapshot.data[index];
              return ListTile(
                leading: Icon(Icons.person), // Replace with user's profile picture
                title: Text('u/${notification.username} replied to your post in r/${notification.subreddit}'),
                subtitle: Text(notification.message),
                trailing: Text('${notification.timeElapsed} ago'),
              );
            },
          );
        }
      },
    );
  }
}
