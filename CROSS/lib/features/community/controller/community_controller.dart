import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/core/providers/storage_repository_provider.dart';
import 'package:reddit_fox/core/utils.dart';
import 'package:reddit_fox/features/auth/controller/auth_controller.dart';
import 'package:reddit_fox/features/community/repository/community_repository.dart';
import 'package:reddit_fox/models/community_model.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';


/// Provider that streams the list of user communities.
final userCommunitiesProvider = FutureProvider((ref) {
  final communityController = ref.watch(communityControllerProvider.notifier);
  return communityController.getUserCommunities();
});

/// Provider for the community controller.
final communityControllerProvider =
    StateNotifierProvider<CommunityController, bool>((ref) {
  final communityRepository = ref.watch(communityRepositoryProvider);
  final storageRepository = ref.watch(storageRepositoryProvider);
  return CommunityController(
    communityRepository: communityRepository,
    storageRepository: storageRepository,
    ref: ref,
  );
});

/// Provider that fetches a community by its name.
final getCommunityByNameProvider = StreamProvider.family((ref, String name) {
  return ref.watch(communityControllerProvider.notifier).getCommunityByName(name);
});

/// Provider that searches for communities based on a query.
final searchCommunityProvider = StreamProvider.family((ref, String query) {
  return ref.watch(communityControllerProvider.notifier).searchCommunity(query);
});

/// Controller for managing community-related operations.
class CommunityController extends StateNotifier<bool> {
  final CommunityRepository _communityRepository;
  final Ref _ref;
  final StorageRepository _storageRepository;

  /// Constructor for the CommunityController.
  CommunityController({
    required CommunityRepository communityRepository,
    required Ref ref,
    required StorageRepository storageRepository,
  })  : _communityRepository = communityRepository,
        _ref = ref,
        _storageRepository = storageRepository,
        super(false);

  /// Create a new community.
void createCommunity(String name, BuildContext context) async {
  state = true;
  final prefs = await SharedPreferences.getInstance();
  final access_token = prefs.getString('backtoken') ?? '';
  final uid = _ref.read(userProvider)?.uid ?? '';
  Community community = Community(
    id: name,
    name: name,
    banner: Constants.bannerDefault,
    avatar: Constants.avatarDefault,
    members: [uid],
    mods: [uid],
  );

  // Create the HTTP client.
  var client = http.Client();

  try {
    // Send the POST request.
    var response = await client.post(
      Uri.parse('http://localhost:3000/create_subreddit'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer $access_token',  // Replace with your token.
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
      showSnackBar(context, 'Community created successfully!');
      Navigator.pop(context);
    } else {
      // If the server did not return a 200 OK response, throw an exception.
      throw Exception('Failed to create community.');
    }
  } finally {
    client.close();
  }

  state = false;
}


  /// Stream of the user's communities.
  Future<List<String>> getUserCommunities() async {
    final uid = _ref.read(userProvider)!.uid;
    List<String> communityNames = await
     _communityRepository.getUserCommunities(uid);
     return communityNames;
  }

  /// Fetch a community by its name.
  Stream<Community> getCommunityByName(String name) {
    return _communityRepository.getCommunityByName(name);
  }

  /// Edit a community.
  void editCommunity({
    required File? profileFile,
    required File? bannerFile,
    required BuildContext context,
    required Community community,
  }) async {
    state = true;
    if (profileFile != null) {
      final res = await _storageRepository.storeFile(
        path: 'communities/profile',
        id: community.name,
        file: profileFile,
      );
      res.fold(
        (l) => showSnackBar(context, l.message),
        (r) => community = community.copyWith(avatar: r),
      );
    }

    if (bannerFile != null) {
      final res = await _storageRepository.storeFile(
        path: 'communities/banner',
        id: community.name,
        file: bannerFile,
      );
      res.fold(
        (l) => showSnackBar(context, l.message),
        (r) => community = community.copyWith(banner: r),
      );
    }
    final res = await _communityRepository.editCommunity(community);
    state = false;
    res.fold(
      (l) => showSnackBar(context, l.message),
      (r) => Navigator.pop(context),
    );
  }

  /// Search for communities based on a query.
  Stream<List<Community>> searchCommunity(String query) {
    return _communityRepository.searchCommunity(query);
  }
}
