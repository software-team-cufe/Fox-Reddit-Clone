// ignore_for_file: public_member_api_docs, sort_constructors_first, must_be_immutable
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/home/Post%20widgets/PostCardClassic.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SavedPage extends StatefulWidget {
  String userName;

  SavedPage({
    super.key,
    required this.userName,
  });
  @override
  _SavedPageState createState() => _SavedPageState();
}

class _SavedPageState extends State<SavedPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<dynamic> posts = [];
  String? accessToken;

  @override
  void initState() {
    super.initState();
    _tabController =
        TabController(length: 2, vsync: this); // 2 tabs: Posts and Comments
    SharedPreferences.getInstance().then((sharedPrefValue) {
      setState(() {
        accessToken = sharedPrefValue.getString('backtoken');
      });
      fetchDataBack();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> fetchDataBack() async {
    try {
      
      final response = await http.get(
        Uri.parse(ApiRoutesBackend.getSaved(widget.userName)),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $accessToken'
        },
      );
      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);
        setState(() {
          posts = responseData['posts'];
        });
        print("status code : ${response.statusCode}");
        
      } else {
        print('Request failed with status: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching data: $e');
    }
  }

  void _showBottomSheetMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Wrap(
          children: <Widget>[
            ListTile(
              leading: const Icon(Icons.flag_outlined),
              title: const Text('Report'),
              onTap: () {
                // Handle edit action
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.person_off_outlined),
              title: const Text('Block account'),
              onTap: () {
                // Handle delete action
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    );
  }

  Widget buildPostsContainer() {
    if (posts.isEmpty) {
      // Show loading indicator while fetching posts
      return Center(child: CircularProgressIndicator());
    } else {
      // Show posts once fetched
      return CustomScrollView(
        slivers: [
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                return ClassicCard(post: posts[index]);
              },
              childCount: posts.length,
            ),
          ),
        ],
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Saved'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Posts'),
            Tab(text: 'Comments'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          buildPostsContainer(),
          ListView.builder(
            itemCount: 10, // Number of comments
            itemBuilder: (context, index) {
              return Card(
                child: ListTile(
                  leading: const Icon(Icons.comment_outlined),
                  title: Text('Comment ${index + 1}'),
                  subtitle: Text('This is comment number ${index + 1}'),
                  trailing: IconButton(
                    icon: const Icon(Icons.more_horiz),
                    onPressed: () {
                      // Handle button press to show menu
                      _showBottomSheetMenu(context);
                    },
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
