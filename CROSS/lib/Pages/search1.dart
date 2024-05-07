import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';

class search1 extends StatefulWidget {
  final String searchItem;
  const search1({Key? key, required this.searchItem}) : super(key: key);

  @override
  State<search1> createState() => _search1State();
}

class _search1State extends State<search1> with SingleTickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
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

  // Future<Void> _searchUser(){

  // }

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
