// class ApiRoutes {
//   static const String Popular = '$baseUrl/trendingSearches';
// }

class ApiRoutes {
  static const String baseUrl = 'https://json-server-k6zb.onrender.com';
  // static const String baseUrl = 'http://localhost:3000';

  static const String getPopular = baseUrl;
  static const String getPosts = '$baseUrl/posts';
  static const String login = '$baseUrl/user';
  static const String getUserById = '$baseUrl/user/{id}';
}
