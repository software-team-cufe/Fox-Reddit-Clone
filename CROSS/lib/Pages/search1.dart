import 'package:flutter/material.dart';

class search1 extends StatefulWidget {
  final String searchItem;
  const search1({Key? key, required this.searchItem}) : super(key: key);

  @override
  State<search1> createState() => _search1State();
}

class _search1State extends State<search1> {
  final TextEditingController _searchController = TextEditingController();


  void _clearSearch() {
    _searchController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
      body: Center(
        child: Text(widget.searchItem),
      ),
    );
  }
}