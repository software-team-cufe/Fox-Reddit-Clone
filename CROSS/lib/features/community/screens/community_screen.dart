import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/core/common/error_text.dart';
import 'package:reddit_fox/core/common/loader.dart';
import 'package:reddit_fox/features/auth/controller/auth_controller.dart';
import 'package:reddit_fox/features/community/controller/community_controller.dart';
import 'package:reddit_fox/models/community_model.dart';


class CommunityScreen extends ConsumerWidget {
  final Community community;

  const CommunityScreen({Key? key, required this.community}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final name = community.name; // Extract community name

    return Scaffold(
      body: ref.watch(getCommunityByNameProvider(name)).when(
        data: (communityEither) => communityEither.fold(
          // Handle failure case
          (failure) => ErrorText(error: failure.message),
          // Handle success case
          (communityData) {
            return NestedScrollView(
              headerSliverBuilder: (context, innerBoxIsScrolled) {
                return [
                  SliverAppBar(
                    expandedHeight: 150,
                    floating: true,
                    snap: true,
                    flexibleSpace: Stack(
                      children: [
                        Positioned.fill(
                          child: Image.network(
                            communityData.banner ?? '', // Handle null banner
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
                          Align(
                            alignment: Alignment.topLeft,
                            child: CircleAvatar(
                              backgroundImage: NetworkImage(communityData.avatar ?? ''), // Handle null avatar
                              radius: 36,
                            ),
                          ),
                          const SizedBox(height: 5),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'r/${communityData.name ?? ''}', // Handle null name
                                style: const TextStyle(
                                  fontSize: 19,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              OutlinedButton(
                                onPressed: () {},
                                style: ElevatedButton.styleFrom(
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  padding: const EdgeInsets.symmetric(horizontal: 25),
                                ),
                                child: Text(
                                  communityData.members != null ? 'Joined' : 'Join',
                                ),
                              ),
                            ],
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 10),
                            child: Text('${communityData.memberCount ?? 0} members'), // Handle null memberCount
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
        ),
        error: (error, stackTrace) => ErrorText(error: error.toString()),
        loading: () => const Loader(),
      ),
    );
  }
}
