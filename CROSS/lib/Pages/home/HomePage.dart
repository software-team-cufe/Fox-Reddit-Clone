import 'package:flutter/material.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/Pages/searchinhomepage.dart';
import 'package:reddit_fox/Pages/home/Drawer.dart';
import 'package:reddit_fox/Pages/home/endDrawer.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import 'package:reddit_fox/Pages/post_details.dart'; // Import the PostDetails page

// Dummy post class
class Post {
  final String title;
  final String content;
  final String imageUrl;

  Post({required this.title, required this.content, required this.imageUrl});
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _selectedItem = "Home"; // Default selected item

  void desplayEndDrawer(BuildContext context) {
    Scaffold.of(context).openEndDrawer();
  }

  void desplayDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }

  // Dummy post data
  final List<Post> dummyPosts = [
    Post(
        title: "Post 1",
        content: "Content of post 1",
        imageUrl: "https://via.placeholder.com/520"),
    Post(
        title: "Post 2",
        content: "Content of post 2",
        imageUrl: "https://via.placeholder.com/520"),
    Post(
        title: "Post 3",
        content: "Content of post 3",
        imageUrl: "https://via.placeholder.com/520"),
  ];

  // Dummy video post data
  final List<Post> videoPosts = [
    Post(
        title: "Video Post 1",
        content: "Video content 1",
        imageUrl: "https://www.youtube.com/watch?v=ALDt7jOZUw0"),
    Post(
        title: "Video Post 2",
        content: "Video content 2",
        imageUrl: "https://youtube.com/shorts/3MvYrndVM3M?si=QoaiYKKEH0TLQ37f"),
    Post(
        title: "Video Post 3",
        content: "Video content 3",
        imageUrl: "https://youtube.com/shorts/CaW9OmZwAG0?si=JKLdyke4R0eofXTa"),
  ];

  late YoutubePlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = YoutubePlayerController(
      initialVideoId: 'ALDt7jOZUw0',
      flags: const YoutubePlayerFlags(
        autoPlay: false,
        mute: false,
      ),
    );
  }

  List<Post> getSelectedPosts() {
    if (_selectedItem == "Home") {
      return dummyPosts;
    } else if (_selectedItem == "Watch") {
      return videoPosts;
    } else {
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    double drawerWidth = MediaQuery.of(context).size.width * 0.8;
    double userWidth = MediaQuery.of(context).size.width * 0.7;
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        iconTheme: const IconThemeData(color: Colors.white),
        leading: Builder(builder: (context) {
          return IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              desplayDrawer(context);
            },
          );
        }),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Search()),
              );
            },
            icon: const Icon(Icons.search),
          ),
          Builder(builder: (context) {
            return IconButton(
              icon: const CircleAvatar(),
              onPressed: () => desplayEndDrawer(context),
            );
          }),
        ],
        title: PopupMenuButton<String>(
          icon: Text(_selectedItem),
          initialValue: _selectedItem,
          itemBuilder: (context) => [
            const PopupMenuItem(
              value: "Home",
              child: Text("Home"),
            ),
            const PopupMenuItem(
              value: "Watch",
              child: Text("Watch"),
            ),
          ],
          onSelected: (value) {
            setState(() {
              _selectedItem = value;
            });
          },
        ),
      ),
      drawer: CustomDrawer(
        drawer_Width: drawerWidth,
      ),
      endDrawer: endDrawer(user_width: userWidth),
      bottomNavigationBar: const nBar(),
      endDrawerEnableOpenDragGesture: true,
      drawerEnableOpenDragGesture: true,
      body: ListView.builder(
        itemCount: getSelectedPosts().length,
        itemBuilder: (context, index) {
          if (getSelectedPosts()[index].imageUrl.contains('youtube.com')) {
            return ListTile(
              title: Text(getSelectedPosts()[index].title),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(getSelectedPosts()[index].content),
                  const SizedBox(height: 8),
                  YoutubePlayer(
                    controller: YoutubePlayerController(
                      initialVideoId: YoutubePlayer.convertUrlToId(
                        getSelectedPosts()[index].imageUrl,
                      )!,
                      flags: const YoutubePlayerFlags(
                        autoPlay: false,
                        mute: false,
                      ),
                    ),
                    showVideoProgressIndicator: true,
                    onEnded: (metadata) {
                      // print('Video ended');
                    },
                  ),
                ],
              ),
            );
          } else {
            return GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => PostDetails(key: UniqueKey()),
                  ),
                );
              },
              child: ListTile(
                title: Text(getSelectedPosts()[index].title),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(getSelectedPosts()[index].content),
                    const SizedBox(height: 8),
                    Image.network(getSelectedPosts()[index].imageUrl),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
