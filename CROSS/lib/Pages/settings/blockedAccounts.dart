import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;

List<Map<String, String>> blockedAccounts = [
  {"id": "1", "name": "Blocked User 1"},
  {"id": "2", "name": "Blocked User 2"},
  {"id": "3", "name": "Blocked User 3"},
];

class BlockedAccounts extends StatefulWidget {
  const BlockedAccounts({super.key});

  @override
  State<BlockedAccounts> createState() => _BlockedAccountsState();
}

class _BlockedAccountsState extends State<BlockedAccounts>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  blockListAPI() async {
    const url = ApiRoutesBackend.blockedAccs;

    print(url);
    final res = await http.get(
      Uri.parse(url),
    );
    // // blockedAccounts=res.body;
    // // Map<String, dynamic> blocked = jsonDecode(res.body);
    // print(blockedAccounts["blocked_accounts"]);
    // print(blocked["followers"]);
    // print(res.body);
    // print(res.body[0]['blocked']);
  }

  List<Map<String, String>> filteredBlockedAccounts = [];

  @override 
  void initState() {
    super.initState();
    filteredBlockedAccounts = List.from(blockedAccounts);
    blockListAPI();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _filterBlockedAccounts(String query) {
    setState(() {
      filteredBlockedAccounts = blockedAccounts
          .where((account) =>
              account['name']!.toLowerCase().contains(query.toLowerCase()))
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
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Search",
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderSide:
                      BorderSide(color: Colors.blue), // Set border color
                  borderRadius: BorderRadius.all(Radius.circular(30.0)),
                ),
              ),
              onChanged: _filterBlockedAccounts,
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filteredBlockedAccounts.length,
              itemBuilder: (context, index) {
                return FollowersBlockedCard(
                  id: filteredBlockedAccounts[index]["id"]!,
                  name: filteredBlockedAccounts[index]["name"]!,
                  url: filteredBlockedAccounts[index]["url"],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// // class BlockedAccounts extends StatefulWidget {
// //   const BlockedAccounts({super.key});

// //   @override
// //   State<BlockedAccounts> createState() => const BlockedAccounts();
// // }

// // class _MyWidgetState extends State<MyWidget>
// //     with SingleTickerProviderStateMixin {
// //   late AnimationController _controller;

// //   @override
// //   void initState() {
// //     super.initState();
// //     _controller = AnimationController(vsync: this);
// //   }

// //   @override
// //   void dispose() {
// //     _controller.dispose();
// //     super.dispose();
// //   }

// //   @override
// //   Widget build(BuildContext context) {
// //     return const SingleChildScrollView();
// //   }
// // }

// class BlockedAccounts extends StatefulWidget {
//   const BlockedAccounts({super.key});

//   @override
//   State<BlockedAccounts> createState() => _BlockedAccountsState();
// }

// class _BlockedAccountsState extends State<BlockedAccounts>
//     with SingleTickerProviderStateMixin {
//   late AnimationController _controller;

//   @override
//   void initState() {
//     super.initState();
//     _controller = AnimationController(vsync: this);
//   }

//   @override
//   void dispose() {
//     _controller.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Blocked Accounts'),
//       ),
//       body: ListView.builder(
//         itemCount: blockedAccounts.length,
//         itemBuilder: (context, index) {
//           return FollowersBlockedCard(
//             id: blockedAccounts[index]["id"]!,
//             name: blockedAccounts[index]["name"]!,
//           );
//         },
//       ),
//     );
//   }
// }

// // class BlockedAccounts extends StatelessWidget {
// //   const BlockedAccounts({super.key});

// //   @override
// //   Widget build(BuildContext context) {
// //     return Scaffold(
// //       appBar: AppBar(
// //         title: const Text('Blocked Accounts'),
// //       ),
// //       body: ListView.builder(
// //         itemCount: blockedAccounts.length,
// //         itemBuilder: (context, index) {
// //           return FollowersBlockedCard(
// //             id: blockedAccounts[index]["id"]!,
// //             name: blockedAccounts[index]["name"]!,
// //           );
// //         },
// //       ),
// //     );
// //   }
// // }

class FollowersBlockedCard extends StatelessWidget {
  FollowersBlockedCard(
      {super.key, required this.name, required this.id, required, this.url});

  String name;
  String id;
  String? url;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(
        name,
        style: const TextStyle(fontSize: 18),
      ),
      leading: url != null
          ? CircleAvatar(
              radius: 25, // Adjust the radius according to your requirements
              backgroundImage: NetworkImage(url!),
            )
          : const CircleAvatar(
              radius: 25, // Adjust the radius according to your requirements
              backgroundImage: AssetImage('assets/images/defaultAvatar.png'),
            ),
      trailing: TextButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all<Color>(Colors.blue)),
        child: const Text(
          "Blocked",
          style: TextStyle(color: Colors.white),
        ),
        onPressed: () {},
      ),
    );
  }
}
