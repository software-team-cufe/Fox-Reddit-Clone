import 'package:flutter/material.dart';

class ModNotificationsScreen extends StatefulWidget {
  const ModNotificationsScreen({super.key});

  @override
  _ModNotificationsScreenState createState() => _ModNotificationsScreenState();
}

class _ModNotificationsScreenState extends State<ModNotificationsScreen> {
  bool allowNotifications = false;
  bool milestonesNotifications = false;
  bool tipsAndTricksNotifications = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mod Notifications'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            title: const Text('Allow Notifications'),
            trailing: Switch(
              value: allowNotifications,
              onChanged: (value) {
                setState(() {
                  allowNotifications = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Milestones Notifications'),
            trailing: Switch(
              value: milestonesNotifications,
              onChanged: (value) {
                setState(() {
                  milestonesNotifications = value;
                });
              },
            ),
          ),
          ListTile(
            title: const Text('Tips and Tricks Notifications'),
            trailing: Switch(
              value: tipsAndTricksNotifications,
              onChanged: (value) {
                setState(() {
                  tipsAndTricksNotifications = value;
                });
              },
            ),
          ),
        ],
      ),
    );
  }
}
