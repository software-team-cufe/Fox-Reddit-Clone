import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/navbar.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:typed_data';

import 'package:shared_preferences/shared_preferences.dart';

class DiscoverCommunityScreen extends StatefulWidget {
  const DiscoverCommunityScreen({super.key});

  @override
  State<DiscoverCommunityScreen> createState() =>
      _DiscoverCommunityScreenState();
}

class _DiscoverCommunityScreenState extends State<DiscoverCommunityScreen> {
  Future<Map<dynamic, dynamic>> discoveryCommunities() async {
    const url = ApiRoutesMockserver.getCommunities;
    final res = await http.get(
      Uri.parse(url),
    );
    print(res.statusCode);
    print(res.body);
    if (res.statusCode == 200) {
      return json.decode(res.body).asMap();
    } else {
      print('Failed to load followed accounts');
      throw Exception("failed to ");
    }
  }

  @override
  void initState() {
    super.initState();
    // discoveryCommunities();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        bottomNavigationBar: const nBar(),
        body: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.menu),
                    onPressed: () {},
                  ),
                  RegularText(
                    text: "Comunities",
                    fontsize: 20,
                  ),
                  const Gap(150),
                  const Icon(Icons.search),
                  const Spacer(),
                  const CircleAvatar()
                ],
              ),
              const Gap(30),
              MoreLikeContainer(
                  communityName: "valorant",
                  communityCards: discoveryCommunities()),
              const Gap(30),
              MoreLikeContainer(
                  communityName: "AI", communityCards: discoveryCommunities()),
              const Gap(30),
              MoreLikeContainer(
                  communityName: "Cars",
                  communityCards: discoveryCommunities()),
            ],
          ),
        ),
      ),
    );
  }
}

class MoreLikeContainer extends StatelessWidget {
  MoreLikeContainer({
    super.key,
    required this.communityName,
    required this.communityCards,
  });

  final String communityName;
  Future<Map<dynamic, dynamic>> communityCards;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<dynamic, dynamic>>(
      future: communityCards,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else if (snapshot.hasError) {
          return Center(
            child: Text('Error: ${snapshot.error}'),
          );
        } else {
          Map<dynamic, dynamic> communityCards = snapshot.data ?? {};

          return Column(
            children: [
              ListTile(
                leading: Text(
                  'More Like $communityName',
                  style: const TextStyle(fontSize: 20),
                ),
                trailing: const Icon(Icons.arrow_forward_ios),
              ),
              SizedBox(
                height: 280,
                width: 400,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: (communityCards.length / 2)
                      .ceil(), // Adjust itemCount for pairs
                  itemBuilder: (context, index) {
                    final firstIndex =
                        index * 2; // Calculate starting index for the pair
                    final communityCard1 = firstIndex < communityCards.length
                        ? communityCards[firstIndex]
                        : null; // Handle cases with odd number of cards

                    final secondIndex = firstIndex + 1;
                    final communityCard2 = secondIndex < communityCards.length
                        ? communityCards[secondIndex]
                        : null; // Handle cases with odd number of cards

                    return Column(
                      // Use Column for vertical layout within pairs
                      children: [
                        if (communityCard1 != null)
                          SuggestedCommunityCard(
                              bio: communityCards[firstIndex]['Bio'],
                              name: communityCards[firstIndex][
                                  'communityName']), // Display only if available
                        if (communityCard2 != null)
                          const SizedBox(height: 10), // Add spacing (optional)
                        if (communityCard2 != null)
                          SuggestedCommunityCard(
                              bio: communityCards[secondIndex]['Bio'],
                              name: communityCards[secondIndex][
                                  'communityName']), // Display only if available
                      ],
                    );
                  },
                ),
              ),
            ],
          );
        }
      },
    );
  }
}

class SuggestedCommunityCard extends StatelessWidget {
  const SuggestedCommunityCard(
      {super.key, required this.bio, required this.name});
  final String bio;
  final String name;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 118,
      width: MediaQuery.of(context).size.width * 0.9,
      child: Card(
        color: Colors.black,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0), // Set border radius
          side: const BorderSide(
              color: Colors.blueGrey, width: 1.0), // Set border color and width
        ),
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const CircleAvatar(
                    backgroundImage: AssetImage('assets/images/avatar.png'),
                  ),
                  const Gap(13),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.5,
                        height: 40,
                        child: Text(
                          bio, // style: TextStyle( fontSize: 20),
                          maxLines: 3,
                          softWrap: true, // Enables text wrapping
                          overflow: TextOverflow.visible, //
                        ),
                      ),
                    ],
                  ),
                  Textbuttoncontainer(
                    text: "Join",
                    onPressed: () => {},
                    color: Colors.blue,
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
