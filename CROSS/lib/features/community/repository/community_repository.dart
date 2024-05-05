import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
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
FutureVoid createCommunity(Community community) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://localhost:3000/create_subreddit'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',
      },
      body: jsonEncode(<String, String>{
        'name': community.name,
        'type': 'Public',  // Replace with actual type.
        'over18': 'false',  // Replace with actual value.
      }),
    );

    // Handle the response.
    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, parse the JSON.
      var data = jsonDecode(response.body);
      // Use the data as needed.
      return right(data);
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to create community.');
    }
  } finally {
    client.close();
  }
}


  /// Join a community.
FutureVoid joinCommunity(String communityName, String userId) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://localhost:3000/join_community'),  // Replace with your actual endpoint.
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
      // Use the data as needed.
      return right(data);
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to join community.');
    }
  } finally {
    client.close();
  }
}


  /// Leave a community.
FutureVoid leaveCommunity(String communityName, String userId) async {
  // Get the access token from SharedPreferences.
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://localhost:3000/$communityName/api/unsubscribe'),  // Replace with your actual endpoint.
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
      // Use the data as needed.
      if (data['status'] == 'succeeded') {
        return right(data);
      } else {
        throw Exception('Failed to leave community.');
      }
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to leave community.');
    }
  } finally {
    client.close();
  }
}

  /// Stream of communities that a user is a member of.
Future<List<String>> getUserCommunities(String uid) async {
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
      // The 'communities' field in the response is a list of community names.
      List<String> communities = List<String>.from(data['communities']);
      return communities;
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to get user communities.');
    }
  } finally {
    client.close();
  }
}


  /// Stream of a community by its name.
  Stream<Community> getCommunityByName(String name) {
    return _communities.doc(name).snapshots().map((event) => Community.fromMap(event.data() as Map<String, dynamic>));
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
