import 'package:flutter/material.dart';
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/features/auth/screens/login_screen_with_google.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/features/community/screens/community_screen.dart';
import 'package:reddit_fox/features/community/screens/create_community_screen.dart';
import 'package:reddit_fox/features/community/screens/edit_community_screen.dart';
import 'package:reddit_fox/features/community/screens/mod_tools_screen.dart';
import 'package:reddit_fox/features/home/screens/home_screen.dart';
import 'package:routemaster/routemaster.dart';

final loggedOutRoute = RouteMap(routes: {
  '/': (_) => const MaterialPage(child: StartingScreen()),
});

final loggedInRoute = RouteMap(routes: {
  '/': (_) => const MaterialPage(child: HomePage()),
  '/create-community': (_) =>
      const MaterialPage(child: CreateCommunityScreen()),
  '/r/:name': (route) => MaterialPage(
        child: CommunityScreen(
          name: route.pathParameters['name']!,
        ),
      ),
  '/mod-tools/:name': (routeData) => MaterialPage(
        child: ModToolsScreen(
          name: routeData.pathParameters['name']!,
        ),
      ),
  '/edit-community/:name': (routeData) => MaterialPage(
        child: EditCommunityScreen(
          name: routeData.pathParameters['name']!,
        ),
      )
});
