class Subreddit {
  final int id;
  final String name;
  final String description;
  // Add other properties as needed

  Subreddit({
    required this.id,
    required this.name,
    required this.description,
    // Add other properties as needed
  });

  factory Subreddit.fromJson(Map<String, dynamic> json) {
    return Subreddit(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      // Initialize other properties from JSON
    );
  }
}
