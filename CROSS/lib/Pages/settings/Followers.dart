import 'package:flutter/material.dart';

// Import necessary libraries and packages
// library;

import 'dart:convert'; // For encoding/decoding JSON
import 'package:flutter/material.dart'; // Flutter UI framework
import 'package:http/http.dart' as http; // For making HTTP requests
import 'package:shared_preferences/shared_preferences.dart'; // For storing/retrieving user preferences

// Import other relevant files
import 'package:reddit_fox/features/auth/screens/login_screen.dart'; // Login screen
import 'package:reddit_fox/routes/Mock_routes.dart'; // Mock routes for testing

// Define a stateful widget for the followed Accounts screen
class FollowersPage extends StatefulWidget {
  const FollowersPage({super.key});
  @override
  State<FollowersPage> createState() => _FollowersPage();
}

// State class for the followed Accounts screen
class _FollowersPage extends State<FollowersPage>
    with SingleTickerProviderStateMixin {
  late AnimationController
      _controller; // Animation controller for UI animations
  String? accessToken; // Access token for API authorization

  // Fetches the list of followed accounts from the backend API
  // [accessToken] - The access token used for API authorization
  FollowListAPI(String accessToken) async {
    const url = ApiRoutesBackend.followersAccs;
    try {
      final res = await http.get(
        Uri.parse(url),
        headers: {'Authorization': 'Bearer $accessToken'},
      );
      print("asdasd das");
      print(res.statusCode);
      print(res.body);
      if (res.statusCode == 200) {
        setState(() {
          // Update filteredfollowedAccounts with the response data
          filteredfollowedAccounts = List<Map<String, dynamic>>.from(
              jsonDecode(res.body)["followingsData"]);
        });
      } else {
        print('Failed to load followed accounts');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  List<Map<String, dynamic>> filteredfollowedAccounts = [];

  @override
  void initState() {
    super.initState();
    // Fetch the access token from shared preferences
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the accessToken variable
        accessToken = sharedPrefValue.getString('backtoken');
        // Fetch followed accounts using the accessToken
        FollowListAPI(accessToken!);
      });
    });
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  // Filters the list of followed accounts based on the provided query
  // [query] - The search query
  void _filterfollowedAccounts(String query) {
    setState(() {
      filteredfollowedAccounts = filteredfollowedAccounts
          .where((account) =>
              account['username']!.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('followed Accounts'),
      ),
      body: Column(
        children: [
          // Search bar for filtering followed accounts
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Search",
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.blue),
                  borderRadius: BorderRadius.all(Radius.circular(30.0)),
                ),
              ),
              onChanged:
                  _filterfollowedAccounts, // Call filter function on text change
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filteredfollowedAccounts.length,
              itemBuilder: (context, index) {
                // Build list item for each followed account
                return FollowersfollowedCard(
                  name: filteredfollowedAccounts[index]["username"]!,
                  url: filteredfollowedAccounts[index]["avatar"],
                  accessToken: accessToken!,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class FollowersfollowedCard extends StatefulWidget {
  const FollowersfollowedCard({
    super.key,
    required this.name,
    this.id,
    required this.accessToken,
    this.url,
  });

  final String accessToken;
  final String name;
  final String? id;
  final String? url;
  final String _initialState = "UnFollow"; // Initial state of Follow button

  @override
  _FollowersfollowedCardState createState() => _FollowersfollowedCardState();
}

class _FollowersfollowedCardState extends State<FollowersfollowedCard> {
  late String _followed;

  @override
  void initState() {
    super.initState();
    _followed = widget._initialState;
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(
        widget.name,
        style: const TextStyle(fontSize: 18),
      ),
      leading: const CircleAvatar(
        radius: 25,
        backgroundImage: AssetImage('assets/images/defaultAvatar.png'),
      ),
      trailing: TextButton(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all<Color>(
              _followed == "Follow"
                  ? const Color.fromARGB(255, 255, 96, 96)
                  : const Color.fromARGB(255, 255, 0, 0)),
        ),
        child: Text(
          _followed,
          style: const TextStyle(color: Colors.white),
        ),
        onPressed: () async {
          // Handle Follow/UnFollow button press
          if (_followed == "Follow") {
            return; // Do nothing if already followed
          }
          const url = ApiRoutesBackend.unFolow;
          try {
            final res = await http.post(
              Uri.parse(url),
              body: jsonEncode({"username": widget.name}),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${widget.accessToken}'
              },
            );
            if (res.statusCode == 200 || res.statusCode == 201) {
              // If successful, update button text and state
              setState(() {
                _followed = "Follow";
              });
            }
          } catch (e) {
            print(e);
          }
        },
      ),
    );
  }
}
