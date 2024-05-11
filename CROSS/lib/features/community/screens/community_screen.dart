import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/common/error_text.dart';
import 'package:reddit_fox/core/common/loader.dart';
import 'package:reddit_fox/core/failure.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class CommunityScreen extends ConsumerWidget {
  final String communityName;

  const CommunityScreen({super.key, required this.communityName});

    Future<Either<Failure, Map<String,dynamic>>> getCommunityByName(String name) async {
  final prefs = await SharedPreferences.getInstance();
  final accessToken = prefs.getString('backtoken') ?? '';

  try {
    final response = await http.get(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/$name'),
      headers: {
        'Authorization': 'Bearer $accessToken',
      },
    );
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final communityData = responseData['community'];
      

      return Right(responseData['community']);
    } else {

      return Left(Failure('7ara2: ${response.statusCode}'));
    }
  } catch (e) {

    return Left(Failure('me4 7ara2: $e'));
  }
}
Future<Either<Failure, List<Map<String, dynamic>>>> getCommunityPosts(String name, int t) async {
  final prefs = await SharedPreferences.getInstance();
  final accessToken = prefs.getString('backtoken') ?? '';
  print(communityName); 

  try {
    final response = await http.get(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/api/:subreddit/posts?page=1&count=2&limit=10&t=$t&sort=new'),
      headers: {
        'Authorization': 'Bearer $accessToken',
        'Accept': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      final List<Map<String, dynamic>> posts = responseData.cast<Map<String, dynamic>>();
      return Right(posts);
    } else {
      return Left(Failure('Failed to load posts 2: ${response.statusCode}'));
    }
  } catch (e) {
    return Left(Failure('Failed to load posts 3: $e'));
  }
}


@override
Widget build(BuildContext context, WidgetRef ref) {
  return Scaffold(
    body: FutureBuilder(
      future: getCommunityByName(communityName), 
      builder: (context, AsyncSnapshot<Either<Failure, Map<String, dynamic>>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Loader(); 
        } else if (snapshot.hasError) {
          return ErrorText(error: snapshot.error.toString()); 
        } else {
          final Either<Failure, Map<String, dynamic>>? communityEither = snapshot.data;
          if (communityEither == null) {
            return const ErrorText(error: 'No data available');
          } else {
            return communityEither.fold(
              (failure) => ErrorText(error: failure.message),
              (communityData) {
                return NestedScrollView(
                  headerSliverBuilder: (context, innerBoxIsScrolled) {
                    return [
                      SliverAppBar(
                        expandedHeight: 100,
                        floating: true,
                        snap: true,
                        flexibleSpace: Stack(
                          children: [
                            Positioned.fill(
                              child: Image.network(
                                communityData['banner'] ?? '', 
                                fit: BoxFit.cover,
                              ),
                            ),
                          ],
                        ),
                      ),
                      SliverPadding(
                        padding: const EdgeInsets.all(16),
                        sliver: SliverList(
                          delegate: SliverChildListDelegate(
                            [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  CircleAvatar(
                                    backgroundImage: NetworkImage(communityData['icon'] ?? ''), 
                                    radius: 30,
                                  ),
                                  const SizedBox(width: 10),
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'r/${communityData['name'] ?? ''}', 
                                        style: const TextStyle(
                                          fontSize: 19,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text('${communityData['membersCnt'] ?? 0} members'), 
                                    ],
                                  ),
                                  Expanded(
                                    child: Align(
                                      alignment: Alignment.topRight,
                                      child: OutlinedButton(
                                        onPressed: () {},
                                        style: ElevatedButton.styleFrom(
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(20),
                                          ),
                                          padding: const EdgeInsets.symmetric(horizontal: 25),
                                        ),
                                        child: Text(
                                          communityData['members'] != null ? 'Joined' : 'Join',
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              FutureBuilder(
                                future: getCommunityPosts(communityName, 12),
                                // Call the method with the community name and t=12
                                builder: (context, AsyncSnapshot<Either<Failure, List<Map<String, dynamic>>>> postSnapshot) {
                                  if (postSnapshot.hasError || (postSnapshot.data?.isLeft() ?? false)) {
                                    return const ErrorText(error: 'Failed to load posts 1');
                                    } else {
                                    final posts = postSnapshot.data?.getOrElse((_) => []) ?? [];
                                    return ListView.builder(
                                      shrinkWrap: true, 
                                      physics: const NeverScrollableScrollPhysics(), 
                                      itemCount: posts.length,
                                      itemBuilder: (context, index) {
                                        final post = posts[index];
                                        return ListTile(
                                          title: Text(post['title']),
                                          subtitle: Text(post['content']),
                                        );
                                      },
                                    );
                                  }
                                },
                              ),
                            ],
                          ),
                        ),
                      ),
                    ];
                  },
                  body: const Text('Displaying posts!'),
                );
              },
            );
          }
        }
      }
    )
  );
 }
}