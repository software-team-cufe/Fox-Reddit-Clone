// class ApiRoutes {
//   static const String Popular = '$baseUrl/trendingSearches';
// }

class ApiRoutes {
  static const String baseUrl = 'https://json-server-k6zb.onrender.com';
  static const String getPosts2 = '$baseUrl/getPosts';
  static const String hotPosts = '$baseUrl/hotPosts';
  static const String topPosts = '$baseUrl/topPosts';
  static const String bestPosts = '$baseUrl/bestPosts';
  static const String getPosts = '$baseUrl/posts';
  static const String login = '$baseUrl/user';
  static String getUserById(int id) => '$baseUrl/user/$id';
  static String getPostsByCreatorId(int id) => '$baseUrl/posts?creatorId=$id';
  static String getUserByToken(String token) => '$baseUrl/user?token=$token';
  static const String getPopular =
      '$baseUrl/posts?_sort=votes,commentsNo&_order=desc,desc';
  static const String getTrending = '$baseUrl/trendingTodat';
  static const String getRecentSearch = '$baseUrl/recentlySearched';
  static const String message = '$baseUrl/users?_embed=messages';
}
