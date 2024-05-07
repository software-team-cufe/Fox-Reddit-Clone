class ApiRoutesBackend {
  static const String baseUrl =
      'http://foxnew.southafricanorth.cloudapp.azure.com';
  static const String signup = '$baseUrl/api/users/signup';
  static const String login = '$baseUrl/api/auth/login';
  static const String forgetPassword = '$baseUrl/api/users/forgotpassword';
  static String getPosts(String category, int page, int count, int limit) =>
      '$baseUrl/api/get_specific_category?category=$category&page=$page&count=$count&limit=$limit';
  static String getProfilePosts(String username) =>
      '$baseUrl/user/$username/submitted';
  static String homePostssorted(
          {String category = 'new', int page = 1, int limit = 15}) =>
      '$baseUrl/user-home?page=$page&$limit=15&sort=$category';

  static const String viewedPost = '$baseUrl/api/view_post';
  static const String getHistroyPosts = '$baseUrl/user/h/history_post';

  static String getUserAbout(String username) =>
      '$baseUrl/user/$username/about';
  static const String delPost = "$baseUrl/api/del";
  static const String postVote = "$baseUrl/api/postvote";
  static String myComment(String userName) =>
      "$baseUrl/user/$userName/comments";
  static const String follow = "$baseUrl/api/follow";
  static const String unFollow = "$baseUrl/api/unfollow";
  static const String followersAccs = '$baseUrl/api/v1/me/followings';
  static const String unFolow = '$baseUrl/api/unfollow';
  static const String blockedAccs = '$baseUrl/api/v1/me/blocked';
  static const String block_unblock = '$baseUrl/api/block_user';
  static const String changeEmail = '$baseUrl/user/changeemail';
  static const String changePassword = '$baseUrl/user/changepassword';
  static String getUserByToken(String token) => '$baseUrl/api/v1/me';
  static String getUserById(String id) => '$baseUrl/user/$id';
  static String getPostsByCreatorId(String id) =>
      '$baseUrl/posts?creatorId=$id';
  static const String submitPost = '$baseUrl/api/submit';
  static const String delelteUser = '$baseUrl/api/users/delete_user';
  static const String getCommunities = '$baseUrl/subreddits/mine/member';
  static const String sendinbox = '$baseUrl/message/compose/';
  static const String getinbox =
      '$baseUrl/message/getAllMessagesUsernamesAndSubjects/';
  static const String seen = '$baseUrl/message/markReadMessage/';
  static String getChat(String userName, String subject) =>
      '$baseUrl/message/chatMessages/?senderUsername=$userName&subject=$subject';
  static String getSaved(String userName) =>
      '$baseUrl/api/user/$userName/savedPosts';
  static const String emailPref = '$baseUrl/api/v1/me/prefs';
  static const String notificationPref =
      '$baseUrl/api/v1/me/notification/settings';
  static const String notification = '$baseUrl/api/v1/me/notification';
  static String getUserFollowings(String username) =>
      '$baseUrl/api/v1/me/followings/$username';
  static const String Search = '$baseUrl/r/search';

  static String getUserForChat(String userName) =>
      '$baseUrl/r/search/?q=$userName&type=user';
}

class ApiRoutesMockserver {
  static const String baseUrl = 'https://json-server-k6zb.onrender.com';
  static const String getPosts2 = '$baseUrl/getPosts';
  static const String hotPosts = '$baseUrl/hotPosts';
  static const String topPosts = '$baseUrl/topPosts';
  static const String bestPosts = '$baseUrl/bestPosts';
  static const String getPosts = '$baseUrl/posts';
  static const String login = '$baseUrl/user';
  static String getUserById(int id) => '$baseUrl/user/$id';
  static String getPostsByCreatorId(String id) =>
      '$baseUrl/posts?creatorId=$id';
  static String getUserByToken(String token) => '$baseUrl/user?token=$token';
  static const String getPopular =
      '$baseUrl/posts?_sort=votes,commentsNo&_order=desc,desc';
  static const String getTrending = '$baseUrl/trendingTodat';
  static const String getRecentSearch = '$baseUrl/recentlySearched';
  static const String message = '$baseUrl/messages';
}
