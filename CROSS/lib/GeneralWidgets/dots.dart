import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/newMessage.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';

class WidgetButton extends StatelessWidget {
  const WidgetButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        showModalBottomSheet(
          context: context,
          builder: (BuildContext context) {
            return Container(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  ListTile(
                    leading: const Icon(Icons.new_label_outlined),
                    title: const Text('New Messages'),
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const NewMessage()));
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.done_all_rounded),
                    title: const Text('Mark all inbox as read'),
                    onTap: () {},
                  ),
                  ListTile(
                    leading: const Icon(Icons.settings),
                    title: const Text('Edit notification Settings'),
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  const NotificationSettting()));
                    },
                  ),
                ],
              ),
            );
          },
        );
      },
      child: const Icon(
        Icons.more_horiz_outlined,
        color: Colors.white,
      ),
    );
  }
}
