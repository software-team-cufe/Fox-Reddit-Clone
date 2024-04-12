import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';

class Search extends StatefulWidget {
  const Search({Key? key}) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchController = TextEditingController();
  List<String> _recentlySearched = [];

  @override
  void initState() {
    super.initState();
    _fetchRecentlySearched();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _fetchRecentlySearched() async {
  final response = await http.get(Uri.parse(ApiRoutes.getRecentSearch));
  if (response.statusCode == 200) {
    final data = json.decode(response.body);
    print(data); // Print response body to see the structure
    final List<dynamic> terms = data['searchTerm'];
    setState(() {
     // _recentlySearched = terms.map((term) => term['searchTerm'].toString()).toList();
      print(terms);
    });
  } else {
    throw Exception('Failed to load recently searched terms');
  }
}



  void _clearSearch() {
    _searchController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Container(
          padding: const EdgeInsets.only(top: 20.0, right: 20.0),
          child: Center(
            child: TextField(
              controller: _searchController,
              textAlignVertical: TextAlignVertical.center,
              decoration: InputDecoration(
                hintText: 'Search Reddit',
                filled: true,
                fillColor: const Color.fromARGB(255, 50, 50, 50),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(5.0),
                  borderSide: BorderSide.none,
                ),
                prefixIcon: const Icon(Icons.search, color: Colors.white),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.clear, color: Colors.white),
                  onPressed: _clearSearch,
                ),
              ),
              style: const TextStyle(color: Colors.white),
              onChanged: (value) {
                // Handle text field changes
              },
            ),
          ),
        ),
        titleSpacing: 0,
      ),
      body: Container(
        child: ListView.builder(
          itemCount: _recentlySearched.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(_recentlySearched[index]),
              onTap: () {
                // Handle tap on recently searched term
              },
            );
          },
        ),
      ),
    );
  }
}
