///blockedaccs
library;

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';


class BlockedAccounts extends StatefulWidget {
  const BlockedAccounts({super.key});
  @override
  State<BlockedAccounts> createState() => _BlockedAccountsState();
}

class _BlockedAccountsState extends State<BlockedAccounts>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  String? accessToken;

  // blockListAPI(String accessToken) async {
  //   const url = ApiRoutesBackend.blockedAccs;
  //   // NetworkService.initDio();

  //   // NetworkService.accessToken = accessToken;

  //   print(accessToken);
  //   print(url);
  //   // final res = await NetworkService.instance.get(url);
  //   print({'Authorization': 'Bearer $accessToken'});
  //   try {
  //     // final res = await NetworkService.instance.get(url);

  //     final res = await http.get(
  //       Uri.parse(url),
  //       headers: {'Authorization': 'Bearer $accessToken'},
  //     );
  //     // print()

  //     // headers: {
  //     filteredBlockedAccounts = json.decode(res.body);
  //     // HttpHeaders.authorizationHeader: 'Basic your_api_token_here',
  //     print(res.body);

  //     print("a3aaaaaaaaa:${res.statusCode}");

  //     // Your code to handle the response
  //   } catch (e) {
  //     // Handle any errors that occur during the network request
  //     print('Error occurred: $e');
  //   }
  // }
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
        filteredBlockedAccounts = List<Map<String, dynamic>>.from(jsonDecode(res.body)["blockedsData"]);
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
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        accessToken = sharedPrefValue.getString('backtoken');
        blockListAPI(accessToken!);

        // print(  blockListAPI(accessToken!)["blocked_accounts"]);
      });
    });
    // filteredBlockedAccounts = List.from(blockedAccounts);
    // filteredBlockedAccounts = List.from(blockedAccounts);
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

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
                  // id: filteredBlockedAccounts[index]["id"]!,
                  
                  name: filteredBlockedAccounts[index]["username"]!,
                  url: filteredBlockedAccounts[index]["avatar"],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class FollowersBlockedCard extends StatelessWidget {
  FollowersBlockedCard(
      {super.key, required this.name, this.id, required, this.url});

  String name;
  String? id;
  String? url;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(
        name,
        style: const TextStyle(fontSize: 18),
      ),
      leading:
      //  url != null
      //     ? CircleAvatar(
      //         radius: 25, // Adjust the radius according to your requirements
      //         backgroundImage: NetworkImage(url!),
      //       )
      //     : 
          const CircleAvatar(
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
