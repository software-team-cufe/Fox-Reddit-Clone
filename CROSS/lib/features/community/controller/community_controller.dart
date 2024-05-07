import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/core/failure.dart';
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
final getCommunityByNameProvider = FutureProvider.family((ref, String name) {
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
  Future<Either<Failure, String>> createCommunity(String name, BuildContext context) async {
    state = true;
    final uid = _ref.read(userProvider)?.uid ?? '';
    Community community = Community(
      name: name,
      avatar: Constants.avatarDefault,
      memberCount: 1, // Default member count
      // Other properties remain unchanged
    );

    try {
      // Use the community repository to create the community
      final result = await _communityRepository.createCommunity(community);
      result.fold(
        (failure) {
          // Handle failure
          showSnackBar(context, failure.message);
        },
        (message) {
          // Handle success
          showSnackBar(context, message);
          Navigator.pop(context);
        },
      );
      return result;
    } finally {
      state = false;
    }
  }


  /// Stream of the user's communities.
Future<List<Community>> getUserCommunities() async {
  // Get the user ID from the user provider
  final uid = _ref.read(userProvider)?.uid ?? '';
  
  try {
    // Call the repository method to fetch user communities
    return await _communityRepository.getUserCommunities(uid);
  } catch (e) {
    // Handle any exceptions.
    throw Exception('Failed to get user communities: $e');
  }
}

  /// Fetch a community by its name.
  Future<Either<Failure, Community>> getCommunityByName(String name) async {
  try {
    final community = await _communityRepository.getCommunityByName(name);
    return Right(community as Community);
  } catch (e) {
    return Left(Failure('Failed to get community by name: $e'));
  }
  }

/// Edit a community.
Future<void> editCommunity({
  required File? profileFile,
  required File? bannerFile,
  required BuildContext context,
  required Either<Failure, Community> communityResult,
}) async {
  state = true;
  
  communityResult.fold(
    (failure) {
      // Handle failure case
      showSnackBar(context, failure.message);
      state = false; // Reset state
    },
    (community) async {
      // Handle success case
      Community updatedCommunity = community; // Initialize with the original community

      try {
        if (profileFile != null) {
          final profileRes = await _storageRepository.storeFile(
            path: 'communities/profile',
            id: community.name,
            file: profileFile,
          );
          profileRes.fold(
            (l) => showSnackBar(context, l.message),
            (r) => updatedCommunity = updatedCommunity.copyWith(avatar: r),
          );
        }

        if (bannerFile != null) {
          final bannerRes = await _storageRepository.storeFile(
            path: 'communities/banner',
            id: community.name,
            file: bannerFile,
          );
          bannerRes.fold(
            (l) => showSnackBar(context, l.message),
            (r) => updatedCommunity = updatedCommunity.copyWith(banner: r),
          );
        }

        // Perform the edit operation using the updated community
        final res = await _communityRepository.editCommunity(updatedCommunity);
        res.fold(
          (l) => showSnackBar(context, l.message),
          (r) => Navigator.pop(context),
        );
      } finally {
        state = false;
      }
    },
  );
}




  /// Search for communities based on a query.
  Stream<List<Community>> searchCommunity(String query) {
    return _communityRepository.searchCommunity(query);
  }
}
