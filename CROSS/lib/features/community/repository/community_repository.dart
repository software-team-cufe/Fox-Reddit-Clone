import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/core/constants/firebase_constants.dart';
import 'package:reddit_fox/core/failure.dart';
import 'package:reddit_fox/core/providers/firebase_providers.dart';
import 'package:reddit_fox/core/type_defs.dart';
import 'package:reddit_fox/models/community_model.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;


/// Provider for the community repository.
final communityRepositoryProvider = Provider((ref) {
  return CommunityRepository(firestore: ref.watch(firestoreProvider));
});

/// Repository for managing community-related operations.
class CommunityRepository {
  final FirebaseFirestore _firestore;

  /// Constructor for the CommunityRepository.
  CommunityRepository({required FirebaseFirestore firestore}) : _firestore = firestore;

  /// Create a new community.
Future<Either<Failure, String>> createCommunity(Community community) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/create_subreddit'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',
      },
      body: jsonEncode(<String, dynamic>{
        'name': community.name,
        'type': 'Public',  // Replace with actual type.
        'over18': false,  // Replace with actual value.
      }),
    );

    // Print the response body.
    print('Response body: ${response.body}');

    // Handle the response.
    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON.
      var data = jsonDecode(response.body);
      if (data.containsKey('error')) {
        // If the response contains an error key, the community name is already taken.
        return left(Failure(data['error']));
      } else {
        // Otherwise, the community was created successfully.
        return right('Community created successfully');
      }
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to create community.');
    }
  } catch (e) {
    // Handle any exceptions.
    print('Error creating community: $e');
    return left(Failure('Failed to create community: $e'));
  } finally {
    client.close();
  }
}




  /// Join a community.
Future<Either<Failure, String>> joinCommunity(String communityName, String userId) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/$communityName/api/subscribe'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',
      },
      body: jsonEncode(<String, String>{
        'communityName': communityName,
        'userId': userId,
      }),
    );

    // Handle the response.
    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON.
      var data = jsonDecode(response.body);
      // Check if the subscription was successful.
      if (data['status'] == 'succeeded') {
        return right('Joined community successfully');
      } else {
        // If the subscription failed, return an error message.
        return left(Failure('Failed to join community: ${data['error']}'));
      }
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to join community.');
    }
  } catch (e) {
    // Handle any exceptions.
    return left(Failure('Failed to join community: $e'));
  } finally {
    client.close();
  }
}



  /// Leave a community.
Future<Either<Failure, String>> leaveCommunity(String communityName, String userId) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/$communityName/api/unsubscribe'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',
      },
      body: jsonEncode(<String, String>{
        'action': 'unsub',  // Use 'unsub' to unsubscribe.
        'sr_name': communityName,
      }),
    );

    // Handle the response.
    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON.
      var data = jsonDecode(response.body);
      // Check if the unsubscription was successful.
      if (data['status'] == 'succeeded') {
        return right('Left community successfully');
      } else {
        // If the unsubscription failed, return an error message.
        return left(Failure('Failed to leave community: ${data['error']}'));
      }
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to leave community.');
    }
  } catch (e) {
    // Handle any exceptions.
    return left(Failure('Failed to leave community: $e'));
  } finally {
    client.close();
  }
}


  /// Stream of communities that a user is a member of.
Future<List<Community>> getUserCommunities(String userId) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the GET request.
    var response = await client.get(
      Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/subreddits/mine/member'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',
      },
    );

    // Handle the response.
    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON.
      var data = jsonDecode(response.body);
      // The 'communities' field in the response is a list of community objects.
      List<Community> communities = [];
      for (var communityData in data['communities']) {
        final name = communityData['name'];
        final memberCount = communityData['memberCount'] ?? 1; // Default to 1 if null
        final avatar = communityData['icon'] ?? Constants.avatarDefault; // Use default avatar if null or empty
        communities.add(Community(
          name: name,
          memberCount: memberCount,
          avatar: avatar,
        ));
      }
      return communities;
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to get user communities.');
    }
  } catch (e) {
    // Handle any exceptions.
    throw Exception('Failed to get user communities: $e');
  } finally {
    client.close();
  }
}



/// Fetch a community by its name.
Future<Either<Failure, Community>> getCommunityByName(String name) async {
  try {
    final response = await http.get(Uri.parse('http://foxnew.southafricanorth.cloudapp.azure.com/$name'));
  
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final communityData = responseData['community'];
      
      // Create a Community object from the fetched data
      final community = Community.fromJson(communityData);

      // Print the community data
      print('Community Data:');
      print('ID: ${communityData['_id']}');
      print('Name: ${communityData['name']}');
      print('Banner: ${communityData['banner']}');
      print('Avatar: ${communityData['icon']}');
      print('Member Count: ${communityData['membersCnt']}');

      // Return the community data as a Right
      return Right(community);
    } else {
      // Print the failure status code
      print('Failed to fetch community data: ${response.statusCode}');
      
      // Return a failure message as a Left
      return Left(Failure('Failed to fetch community data: ${response.statusCode}'));
    }
  } catch (e) {
    // Print the error message
    print('Failed to fetch community data: $e');

    // Return a failure message as a Left if an error occurs
    return Left(Failure('Failed to fetch community data: $e'));
  }
}


  /// Edit a community.
  FutureVoid editCommunity(Community community) async {
    try {
      return right(_communities.doc(community.name).update(community.toMap()));
    } on FirebaseException catch (e) {
      throw e.message!;
    } catch (e) {
      return left(Failure(e.toString()));
    }
  }

  /// Stream of communities based on a search query.
  Stream<List<Community>> searchCommunity(String query) {
    return _communities
        .where('name', 
            isGreaterThanOrEqualTo: query.isEmpty ? 0 : query, 
            isLessThan: query.isEmpty ? null 
              : query.substring(0, query.length-1) + 
                String.fromCharCode(
                  query.codeUnitAt(query.length-1) + 1,
                ),
        )
        .snapshots()
        .map((event) {
      List<Community> communities = [];
      for (var community in event.docs) {
        communities.add(Community.fromMap(community.data() as Map<String, dynamic>));
      }
      return communities;
    });
  }

  CollectionReference get _communities => _firestore.collection(FirebaseConstants.communitiesCollection);
}
