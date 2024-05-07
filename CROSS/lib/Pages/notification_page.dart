import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';

class Notification {
  final String id;
  final String? text;
  final String title;
  final String type;
  final String? userIcon;
  final DateTime createdAt;

  Notification({
    required this.id,
    this.text,
    required this.title,
    required this.type,
    this.userIcon,
    required this.createdAt,
  });

  factory Notification.fromJson(Map<String, dynamic> json) {
    return Notification(
      id: json['_id'],
      text: json['text'],
      title: json['title'],
      type: json['type'],
      userIcon: json['userIcon'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  String timeElapsed() {
    Duration difference = DateTime.now().difference(createdAt);

    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} years ago';
    } else if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} months ago';
    } else if (difference.inDays > 0) {
      return '${difference.inDays} days ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} hours ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} minutes ago';
    } else {
      return 'Just now';
    }
  }
}

class NotificationPage extends StatefulWidget {
  const NotificationPage({Key? key}) : super(key: key);

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  late List<Notification> notifications = [];
  String? accessToken;

  @override
  void initState() {
    super.initState();

    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        accessToken = sharedPrefValue.getString('backtoken');
      });
      fetchNotifications();
    });
  }

  void fetchNotifications() async {
    final response = await http.get(
      Uri.parse(ApiRoutesBackend.notification),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $accessToken'
      },
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      final data = json.decode(response.body);
      final List<dynamic> notificationData = data['notifications'];
      setState(() {
        notifications = notificationData
            .map((notificationJson) => Notification.fromJson(notificationJson))
            .toList();
      });
      print(data);
    } else {
      throw Exception('Failed to fetch notifications');
    }
  }

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
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      );
    } else {
      return ListView.builder(
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          final notification = notifications[index];
          if (notification.type != "message") {
            return ListTile(
              leading: const Icon(Icons.notification_important),
              title: Text('${notification.title} To Your Post'),
              subtitle: Text(notification.timeElapsed()),
            );
          } 
        },
      );
    }
  }
}
