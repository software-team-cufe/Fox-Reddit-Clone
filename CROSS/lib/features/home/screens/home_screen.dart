import 'package:flutter/material.dart';
// ignore: unnecessary_import
import 'package:flutter/cupertino.dart';
// ignore: unnecessary_import
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/features/auth/controller/auth_controller.dart';
import 'package:reddit_fox/features/home/delegates/search_community_delegate.dart';
import 'package:reddit_fox/features/home/drawers/community_list_drawer.dart';



class HomeScreen extends ConsumerWidget{
  const HomeScreen({super.key});

void displayDrawer(BuildContext context) {
  Scaffold.of(context).openDrawer();

}

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider)!;
    
    return Scaffold(     
      appBar: AppBar(
        title: const Text('Home'),
        centerTitle: false,
        leading: Builder(
          builder: (context) {
            return IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () => displayDrawer(context),
              );
          }
        ),
          actions: [
            IconButton(onPressed: () {showSearch(context: context, delegate: SearchCommunityDelegate(ref));
            }, 
            icon: const Icon(Icons.search),
            ),
            IconButton(
              icon: CircleAvatar(
                backgroundImage: NetworkImage(user.profilePic),
              ),
              onPressed: () {},
            )
        ],
      ),
      drawer: const CommunityListDrawer(drawer_Width: 2,),
    );
  }
}