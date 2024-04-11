import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/newMessage.dart';
import 'package:reddit_fox/Pages/settings/notificationSettings.dart';

class WidgetButton extends StatelessWidget {
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
                    leading: Icon(Icons.new_label_outlined),
                    title: Text('New Messages'),
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const NewMessage()));
                    },
                  ),
                  ListTile(
                    leading: Icon(Icons.done_all_rounded),
                    title: Text('Mark all inbox as read'),
                    onTap: () {},
                  ),
                  ListTile(
                    leading: Icon(Icons.settings),
                    title: Text('Edit notification Settings'),
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
      child: Icon(
        Icons.more_horiz_outlined,
        color: Colors.white,
      ),
    );
  }
}
