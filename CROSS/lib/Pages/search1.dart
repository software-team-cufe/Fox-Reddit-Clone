import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class search1 extends StatefulWidget {
  final String searchItem;
  const search1({Key? key, required this.searchItem}) : super(key: key);

  @override
  State<search1> createState() => _search1State();
}

class _search1State extends State<search1> with SingleTickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  late TabController _tabController;
  String? access_token;
  String Type = "posts";

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        // Store the token in the access_token variable
        access_token = sharedPrefValue.getString('backtoken');
      });
    });
    _search(Type);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _tabController.dispose();
    super.dispose();
  }

  void _clearSearch() {
    _searchController.clear();
  }

  Future<void> _search(String type) async {
  try {
    Map<String, String> queryParams = {
      'q': widget.searchItem,
      'type': type,
      'page': "1",
      'limit': "10", // Adding limit parameter as per the cURL command
    };
    // Constructing URL with query parameters
    Uri uri = Uri.parse(ApiRoutesBackend.Search).replace(queryParameters: queryParams);

    // Sending GET request with headers
    http.Response response = await http.get(
      uri,
      headers: {'Authorization': 'Bearer ${access_token}'},
    );

    print("status code for search: ${response.statusCode}");

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      // Process the responseData as needed
      print(responseData);
    } else {
      throw Exception('Failed to load search results');
    }
  } catch (error) {
    throw Exception('Error searching users: $error');
  }
}

  Widget SerachUser(){
    return ListView.builder(
      itemCount: 1,
      itemBuilder: (BuildContext context, int index) {
        return ;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => HomePage()));
          },
        ),
        backgroundColor: Colors.black,
        toolbarHeight: 80,
        title: Container(
          padding: const EdgeInsets.only(top: 15.0, right: 20.0, bottom: 20.0),
          child: Center(
            child: SizedBox(
              height: 25,
              child: TextField(
                controller: _searchController,
                textAlignVertical: TextAlignVertical.center,
                decoration: InputDecoration(
                  hintText: widget.searchItem,
                  filled: true,
                  fillColor: const Color.fromARGB(255, 50, 50, 50),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(2.0), // Adjust border radius
                    borderSide: BorderSide.none,
                  ),
                  prefixIcon: const Icon(Icons.search, color: Colors.white, size: 18,),
                  contentPadding: EdgeInsets.zero, // Remove default padding
                  isDense: true, // Reduce the vertical size of the input field
                ),
                style: const TextStyle(color: Colors.white),
                onChanged: (value) {
                  // Handle text field changes
                },
              ),
            ),
          ),
        ),

        titleSpacing: 0,
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: TabBar(
              controller: _tabController,
              tabs: [
                Tab(text: 'Posts'),
                Tab(text:'Communities'),
                Tab(text: 'Comments'),
                Tab(text: 'People'),
              ],
            ),
          ),
          SliverFillRemaining(
            child: TabBarView(
              controller: _tabController,
              children: [
                Container(),
                Container(), 
                Container(),
                Container(), 
              ],
            ),
          ),
        ],
      ),
    );
  } 
}
