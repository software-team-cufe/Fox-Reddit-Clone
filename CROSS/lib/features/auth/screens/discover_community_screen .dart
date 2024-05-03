import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';

class DiscoverCommunityScreen extends StatelessWidget {
  const DiscoverCommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: SizedBox(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: Column(
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
                const MoreLikeContainer(
                  communityName: "valorant",
                  communityCards: [
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                  ],
                ),
                const MoreLikeContainer(
                  communityName: "valorant",
                  communityCards: [
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                    SuggestedCommunityCard(),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class MoreLikeContainer extends StatelessWidget {
  const MoreLikeContainer({
    super.key,
    required this.communityName,
    required this.communityCards,
  });

  final String communityName;
  final List<SuggestedCommunityCard> communityCards;

  @override
  Widget build(BuildContext context) {
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
                    communityCard1, // Display only if available
                  if (communityCard2 != null)
                    const SizedBox(height: 10), // Add spacing (optional)
                  if (communityCard2 != null)
                    communityCard2, // Display only if available
                ],
              );
            },
          ),
        ),
      ],
    );
  }
}

class SuggestedCommunityCard extends StatelessWidget {
  const SuggestedCommunityCard({super.key});

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
                      const Text(
                        'Valorant',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 20),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.5,
                        height: 40,
                        child: const Text(
                          'lablablablablablablablalablablablablablablablblablablablablablablablablablablablablablablabllablablablablablablablalablablablablablablablblablablablablablablablablablablablablablablabl',
                          // style: TextStyle( fontSize: 20),
                          maxLines: 3,
                          softWrap: true, // Enables text wrapping
                          overflow: TextOverflow.visible, //
                        ),
                      ),
                    ],
                  ),
                  Textbuttoncontainer(
                    text: "Join",
                    onPressed: () => const Placeholder(),
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
