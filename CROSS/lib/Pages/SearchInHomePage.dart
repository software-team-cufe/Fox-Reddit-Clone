import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/HomePage.dart';

class Search extends StatefulWidget {
  const Search({Key? key}) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
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
        leading: IconButton(
          padding: EdgeInsets.only(top: 20.0),
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HomePage()),
              );
          },
        ),
        title: Container(
          padding: EdgeInsets.only(top: 20.0, right: 20.0),
          child: Center(
            child: TextField(
              controller: _searchController,
              textAlignVertical: TextAlignVertical.center,
              decoration: InputDecoration(
                hintText: 'Search Reddit',
                filled: true,
                fillColor: Color.fromARGB(255, 50, 50, 50),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(5.0),
                  borderSide: BorderSide.none,
                ),
                prefixIcon: Icon(Icons.search, color: Colors.white),
                suffixIcon: IconButton(
                  icon: Icon(Icons.clear, color: Colors.white),
                  onPressed: _clearSearch,
                ),
              ),
              style: TextStyle(color: Colors.white),
              onChanged: (value) {
                // Handle text field changes
              },
            ),
          ),
        ),
        titleSpacing: 0,
      ),
    );
  }
}
