import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/common/error_text.dart';
import 'package:reddit_fox/core/common/loader.dart';
import 'package:reddit_fox/core/failure.dart';
import 'package:reddit_fox/features/community/controller/community_controller.dart';
import 'package:reddit_fox/features/community/repository/community_repository.dart';
import 'package:reddit_fox/features/community/screens/community_screen.dart';
import 'package:reddit_fox/features/community/screens/mod_tools_screen.dart';
import 'package:reddit_fox/models/community_model.dart';
import 'package:reddit_fox/theme/pallete.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class CommunityListDrawer extends ConsumerWidget {
  final double drawer_Width;
  const CommunityListDrawer({super.key, required this.drawer_Width});

  void navigateToCreateCommunity(BuildContext context) {
    Navigator.pushNamed(context, '/create-community');
  }
  Future<Either<Failure, Community>> getCommunityByName(String name) async {
  // Get the access token from SharedPreferences.
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
      
      // Create a Community object from the fetched data
      print('Response Body: ${response.body}');
      //final community = responseData['community'];
      print('Type of communityData: ${communityData.runtimeType}');
      // Print the community data
      print('Community Data:');
      print('ID: ${communityData['_id']}');
      print('Name: ${communityData['name']}');
      print('Banner: ${communityData['banner']}');
      print('Avatar: ${communityData['icon']}');
      print('Member Count: ${communityData['membersCnt']}');

      // Return the community data as a Right
      return Right(Community.fromJson(communityData));
    } else {
      // Print the failure status code
      print('me4at4at: ${response.statusCode}');
      
      // Return a failure message as a Left
      return Left(Failure('7ara2: ${response.statusCode}'));
    }
  } catch (e) {
    // Print the error message
    print('mee4 me4at4at: $e');
    //print(e.stackTrace);
    print(StackTrace);
    print(StackTrace.current);

    print('s7a');

    // Return a failure message as a Left if an error occurs
    return Left(Failure('me4 7ara2: $e'));
  }
}

void navigateToCommunity(BuildContext context, Community community) {
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => CommunityScreen(community: community ),
    ),
  );
}

@override
Widget build(BuildContext context, WidgetRef ref) {
  return Stack(
    children: [
      Positioned(
        top: 0,
        bottom: 0,
        left: 0,
        width: drawer_Width,
        child: Drawer(
          width: drawer_Width,
          backgroundColor: Pallete.darkModeAppTheme.colorScheme.background,
          child: SafeArea(
            child: Column(
              children: [
                ListTile(
                  title: const Text('Create a community'),
                  leading: const Icon(Icons.add),
                  onTap: () => navigateToCreateCommunity(context),
                ),
                    ref.watch(userCommunitiesProvider).when(
                      data: (communities) => Expanded(
                        child: ListView.builder(
                          itemCount: communities.length,
                          itemBuilder: (BuildContext context, int index) {
                            final community = communities[index];
                            print('se7s $community');
                            return GestureDetector(                              
                              onTap: () async {
                                final communityEither = await getCommunityByName(community.name);
                                communityEither.fold(
                                  (failure) {
                                    // Handle failure
                                    print('Failed to get community: ${failure.message}');
                                  },
                                  (communityData) {
                                    // Successfully fetched community data, navigate to CommunityScreen
                                    navigateToCommunity(context, communityData);
                                  },
                                );
                              },// Pass the community name
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundImage: NetworkImage(community.avatar),
                                ),
                                title: Text('r/${community.name}'),
                              ),
                            );
                          },
                        ),
                      ),
                               
                   error: (error, stackTrace) => ErrorText(
                    error: error.toString(),
                  ),
                  loading: () => const Loader(),
                ),
                const SizedBox(height: 10), // Add some space between items
                const Divider(color: Colors.white), // Add a divider
                // Moderating section
                const Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Text(
                    'Moderating',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
                ListTile(
                  leading: const Icon(Icons.star, color: Colors.white),
                  title: const Text(
                    "Mod Feed",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    // Navigate to Mod Feed page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.list, color: Colors.white),
                  title: const Text(
                    "Queues",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    // Navigate to Queues page
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.circle, color: Colors.white),
                  title: const Text(
                    "r/Valorant",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    // Navigate to Mod Feed page
                  },
                ),
                const Divider(color: Colors.white), // Add a divider
                ListTile(
                  title: const Text(
                    "Mod Tools",
                    style: TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const ModToolsScreen(name: ''),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    ],
  );
}
}