import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/routes/Mock_routes.dart';

class Search extends StatefulWidget {
  const Search({Key? key}) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchController = TextEditingController();
  List<String> _recentlySearched = [];
  List<Map<String, dynamic>> _trendingToday = [];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _fetchData() async {
    await _fetchRecentlySearched();
    await _fetchTrendingToday();
  }

  Future<void> _fetchRecentlySearched() async {
    final response =
        await http.get(Uri.parse(ApiRoutesMockserver.getRecentSearch));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _recentlySearched = List<String>.from(
            data['recentlySearched'].map((term) => term['searchTerm']));
      });
    } else {
      throw Exception('Failed to load recently searched terms');
    }
  }

  Future<void> _fetchTrendingToday() async {
    final response = await http.get(Uri.parse(ApiRoutesMockserver.getTrending));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      setState(() {
        _trendingToday = List<Map<String, dynamic>>.from(data['trendingToday']);
      });
    } else {
      throw Exception('Failed to load trending topics');
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
        toolbarHeight: 80,
        title: Container(
          padding: const EdgeInsets.only(top: 20.0, right: 20.0, bottom: 20.0),
          child: Center(
            child: SizedBox(
              height: 50,
              child: TextField(
                controller: _searchController,
                textAlignVertical: TextAlignVertical.center,
                decoration: InputDecoration(
                  hintText: 'Search Reddit',
                  filled: true,
                  fillColor: const Color.fromARGB(255, 50, 50, 50),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0), // Adjust border radius
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
        ),
        titleSpacing: 0,
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Recently Searched',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8.0),
            Wrap(
              spacing: 8.0,
              runSpacing: 8.0,
              children: _recentlySearched.map((term) {
                return Text(
                  term,
                  style: TextStyle(color: Colors.white),
                );
              }).toList(),
            ),
            SizedBox(height: 16.0),
            Text(
              'Trending Today',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8.0),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: _trendingToday.map((trending) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      trending['searchTerm'],
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 4.0),
                    Text(
                      trending['description'],
                      style: TextStyle(color: Colors.white),
                    ),
                    SizedBox(height: 16.0),
                  ],
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
}
