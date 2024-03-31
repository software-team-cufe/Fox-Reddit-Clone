import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';

/// Widget representing the search page.
///
/// The [Search] widget allows users to search for content within the app.
/// It contains a text field for entering search queries and a clear button to clear the search field.
///
/// Requires:
///   - 'package:flutter/material.dart'
///   - 'package:reddit_fox/Pages/home/HomePage.dart'
///
/// Example:
/// ```dart
/// Navigator.push(context, MaterialPageRoute(builder: (context) => const Search()));
/// ```
class Search extends StatefulWidget {
  /// Creates a [Search] Widget.
  const Search({Key? key}) : super(key: key);

  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  /// Clears the search query.
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
          padding: const EdgeInsets.only(top: 20.0),
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const HomePage()),
            );
          },
        ),
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
    );
  }
}
