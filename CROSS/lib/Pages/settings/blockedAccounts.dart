// Import necessary libraries and packages
library;

import 'dart:convert'; // For encoding/decoding JSON
import 'package:flutter/material.dart'; // Flutter UI framework
import 'package:http/http.dart' as http; // For making HTTP requests
import 'package:shared_preferences/shared_preferences.dart'; // For storing/retrieving user preferences

// Import other relevant files
import 'package:reddit_fox/features/auth/screens/login_screen.dart'; // Login screen
import 'package:reddit_fox/routes/Mock_routes.dart'; // Mock routes for testing

// Define a stateful widget for the Blocked Accounts screen
class BlockedAccounts extends StatefulWidget {
  const BlockedAccounts({super.key});
  @override
  State<BlockedAccounts> createState() => _BlockedAccountsState();
}

// State class for the Blocked Accounts screen
class _BlockedAccountsState extends State<BlockedAccounts>
    with SingleTickerProviderStateMixin {
  late AnimationController
      _controller; // Animation controller for UI animations
  String? accessToken; // Access token for API authorization

  // Fetches the list of blocked accounts from the backend API
  // [accessToken] - The access token used for API authorization
  blockListAPI(String accessToken) async {
    const url = ApiRoutesBackend.blockedAccs;
    try {
      final res = await http.get(
        Uri.parse(url),
        headers: {'Authorization': 'Bearer $accessToken'},
      );
      if (res.statusCode == 200) {
        setState(() {
          // Update filteredBlockedAccounts with the response data
          filteredBlockedAccounts = List<Map<String, dynamic>>.from(
              jsonDecode(res.body)["blockedsData"]);
        });
      } else {
        print('Failed to load blocked accounts');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  List<Map<String, dynamic>> filteredBlockedAccounts = [];

  @override
  void initState() {
    super.initState();
    // Fetch the access token from shared preferences
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the accessToken variable
        accessToken = sharedPrefValue.getString('backtoken');
        // Fetch blocked accounts using the accessToken
        blockListAPI(accessToken!);
      });
    });
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  // Filters the list of blocked accounts based on the provided query
  // [query] - The search query
  void _filterBlockedAccounts(String query) {
    setState(() {
      filteredBlockedAccounts = filteredBlockedAccounts
          .where((account) =>
              account['username']!.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Blocked Accounts'),
      ),
      body: Column(
        children: [
          // Search bar for filtering blocked accounts
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
                  _filterBlockedAccounts, // Call filter function on text change
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filteredBlockedAccounts.length,
              itemBuilder: (context, index) {
                // Build list item for each blocked account
                return FollowersBlockedCard(
                  name: filteredBlockedAccounts[index]["username"]!,
                  url: filteredBlockedAccounts[index]["avatar"],
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

// Widget for displaying a blocked account card
// class FollowersBlockedCard extends StatelessWidget {
//   FollowersBlockedCard({
//     super.key,
//     required this.name,
//     this.id,
//     required this.accessToken,
//     this.url,
//   });
//   String accessToken;
//   String name;
//   String? id;
//   String? url;
//   String _blocked = "Unblock"; // Initial state of block button

//   @override
//   Widget build(BuildContext context) {
//     return ListTile(
//       title: Text(
//         name,
//         style: const TextStyle(fontSize: 18),
//       ),
//       leading: const CircleAvatar(
//         radius: 25,
//         backgroundImage: AssetImage('assets/images/defaultAvatar.png'),
//       ),
//       trailing: TextButton(
//         style: ButtonStyle(
//           backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
//         ),
//         child: Text(
//           _blocked,
//           style: const TextStyle(color: Colors.white),
//         ),
//         onPressed: () async {
//           // Handle block/unblock button press
//           if (_blocked == "Block") {
//             return; // Do nothing if already blocked
//           }
//           const url = ApiRoutesBackend.block_unblock;
//           try {
//             final res = await http.post(
//               Uri.parse(url),
//               body: jsonEncode({"username": name, "type": "unblock"}),
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer $accessToken'
//               },
//             );
//             if (res.statusCode == 200 || res.statusCode == 201) {
//               // If successful, update button text and state
//               print(_blocked);
//               setState() {
//                 _blocked = "Block";
//               }
//             }
//           } catch (e) {
//             print(e);
//           }
//         },
//       ),
//     );
//   }
// }
class FollowersBlockedCard extends StatefulWidget {
  const FollowersBlockedCard({
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
  final String _initialState = "Unblock"; // Initial state of block button

  @override
  _FollowersBlockedCardState createState() => _FollowersBlockedCardState();
}

class _FollowersBlockedCardState extends State<FollowersBlockedCard> {
  late String _blocked;

  @override
  void initState() {
    super.initState();
    _blocked = widget._initialState;
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
          backgroundColor: MaterialStateProperty.all<Color>(_blocked == "Block"
              ? const Color.fromARGB(255, 255, 96, 96)
              : const Color.fromARGB(255, 255, 0, 0)),
        ),
        child: Text(
          _blocked,
          style: const TextStyle(color: Colors.white),
        ),
        onPressed: () async {
          // Handle block/unblock button press
          if (_blocked == "Block") {
            return; // Do nothing if already blocked
          }
          const url = ApiRoutesBackend.block_unblock;
          try {
            final res = await http.post(
              Uri.parse(url),
              body: jsonEncode({"username": widget.name, "type": "unblock"}),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ${widget.accessToken}'
              },
            );
            if (res.statusCode == 200 || res.statusCode == 201) {
              // If successful, update button text and state
              setState(() {
                _blocked = "Block";
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
