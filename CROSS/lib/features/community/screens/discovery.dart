import 'package:flutter/material.dart';

class DiscoveryScreen extends StatefulWidget {
  const DiscoveryScreen({super.key});

  @override
  _DiscoveryScreenState createState() => _DiscoveryScreenState();
}

class _DiscoveryScreenState extends State<DiscoveryScreen> {
  bool showInHighTrafficFeeds = false;
  bool getRecommendedToIndividuals = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Discovery'),
      ),
      body: Column(
        children: [
          SwitchListTile(
            title: const Text('Show up in high traffic feeds'),
            value: showInHighTrafficFeeds,
            onChanged: (value) {
              setState(() {
                showInHighTrafficFeeds = value;
              });
            },
          ),
          SwitchListTile(
            title: const Text('Get recommended to individual redditors'),
            value: getRecommendedToIndividuals,
            onChanged: (value) {
              setState(() {
                getRecommendedToIndividuals = value;
              });
            },
          ),
        ],
      ),
    );
  }
}
