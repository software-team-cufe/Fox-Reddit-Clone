// class ApiRoutes {
//   static const String Popular = '$baseUrl/trendingSearches';
// }

class ApiRoutes {
  static const String baseUrl = 'https://json-server-k6zb.onrender.com';
  static const String getPosts = '$baseUrl/getPosts';
  static const String hotPosts = '$baseUrl/hotPosts';
  static const String topPosts = '$baseUrl/topPosts';
  static const String bestPosts = '$baseUrl/bestPosts';
  static const String login = '$baseUrl/user';
  static String getUserById(int id) => '$baseUrl/user/$id';
  static String getPostsByCreatorId(int id) => '$baseUrl/posts/$id';
  static const String getPopular = '$baseUrl/posts?_sort=votes,commentsNo&_order=desc,desc';
  static const String getRecentSearch = '$baseUrl/recentlySearched';
}
