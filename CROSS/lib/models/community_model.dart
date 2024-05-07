import 'dart:convert';

import 'package:collection/collection.dart';

class Community {
  final String? id;
  final String name;
  final String banner;
  final String avatar;
  final int memberCount;
  final List<dynamic> members;
  final List<dynamic> mods;
  final List<dynamic> imageWidget;
  final List<dynamic> buttonWidget;
  final List<dynamic> textWidget;
  final List<dynamic> moderators;
  final List<dynamic> pendingMembers;
  final List<dynamic> spamPosts;
  final List<dynamic> spamComments;
  final List<dynamic> communityPosts;
  final List<int> pageViewsPerDay;
  final List<int> pageViewsPerMonth;
  final List<int> joinedPerDay;
  final List<int> joinedPerMonth;
  final List<int> leftPerDay;
  final List<int> leftPerMonth;
  final String createdAt;
  final bool isDeleted;
  final int rank;
  final int trendPoints;
  final String privacyType;
  final List<String> categories;
  final List<dynamic> communityRules;
  final List<dynamic> removalReasons;
Community({
    this.id,
    required this.name,
    required this.avatar,
    this.banner = '',
    this.memberCount = 1,
    this.members = const [],
    this.mods = const [],
    this.imageWidget = const [],
    this.buttonWidget = const [],
    this.textWidget = const [],
    this.moderators = const [],
    this.pendingMembers = const [],
    this.spamPosts = const [],
    this.spamComments = const [],
    this.communityPosts = const [],
    this.pageViewsPerDay = const [],
    this.pageViewsPerMonth = const [],
    this.joinedPerDay = const [],
    this.joinedPerMonth = const [],
    this.leftPerDay = const [],
    this.leftPerMonth = const [],
    this.createdAt = '',
    this.isDeleted = false,
    this.rank = 0,
    this.trendPoints = 0,
    this.privacyType = '',
    this.categories = const [],
    this.communityRules = const [],
    this.removalReasons = const [],
});

  Community copyWith({
    String? id,
    String? name,
    String? banner,
    String? avatar,
    int? memberCount,
    List<dynamic>? members,
    List<dynamic>? mods,
    List<dynamic>? imageWidget,
    List<dynamic>? buttonWidget,
    List<dynamic>? textWidget,
    List<dynamic>? moderators,
    List<dynamic>? pendingMembers,
    List<dynamic>? spamPosts,
    List<dynamic>? spamComments,
    List<dynamic>? communityPosts,
    List<int>? pageViewsPerDay,
    List<int>? pageViewsPerMonth,
    List<int>? joinedPerDay,
    List<int>? joinedPerMonth,
    List<int>? leftPerDay,
    List<int>? leftPerMonth,
    String? createdAt,
    bool? isDeleted,
    int? rank,
    int? trendPoints,
    String? privacyType,
    List<String>? categories,
    List<dynamic>? communityRules,
    List<dynamic>? removalReasons,
  }) {
    return Community(
      id: id ?? this.id,
      name: name ?? this.name,
      banner: banner ?? this.banner,
      avatar: avatar ?? this.avatar,
      memberCount: memberCount ?? this.memberCount,
      members: members ?? this.members,
      mods: mods ?? this.mods,
      imageWidget: imageWidget ?? this.imageWidget,
      buttonWidget: buttonWidget ?? this.buttonWidget,
      textWidget: textWidget ?? this.textWidget,
      moderators: moderators ?? this.moderators,
      pendingMembers: pendingMembers ?? this.pendingMembers,
      spamPosts: spamPosts ?? this.spamPosts,
      spamComments: spamComments ?? this.spamComments,
      communityPosts: communityPosts ?? this.communityPosts,
      pageViewsPerDay: pageViewsPerDay ?? this.pageViewsPerDay,
      pageViewsPerMonth: pageViewsPerMonth ?? this.pageViewsPerMonth,
      joinedPerDay: joinedPerDay ?? this.joinedPerDay,
      joinedPerMonth: joinedPerMonth ?? this.joinedPerMonth,
      leftPerDay: leftPerDay ?? this.leftPerDay,
      leftPerMonth: leftPerMonth ?? this.leftPerMonth,
      createdAt: createdAt ?? this.createdAt,
      isDeleted: isDeleted ?? this.isDeleted,
      rank: rank ?? this.rank,
      trendPoints: trendPoints ?? this.trendPoints,
      privacyType: privacyType ?? this.privacyType,
      categories: categories ?? this.categories,
      communityRules: communityRules ?? this.communityRules,
      removalReasons: removalReasons ?? this.removalReasons,
    );
  }

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};
  
    if(id != null){
      result.addAll({'id': id});
    }
    result.addAll({'name': name});
    result.addAll({'banner': banner});
    result.addAll({'avatar': avatar});
    result.addAll({'memberCount': memberCount});
    result.addAll({'members': members});
    result.addAll({'mods': mods});
    result.addAll({'imageWidget': imageWidget});
    result.addAll({'buttonWidget': buttonWidget});
    result.addAll({'textWidget': textWidget});
    result.addAll({'moderators': moderators});
    result.addAll({'pendingMembers': pendingMembers});
    result.addAll({'spamPosts': spamPosts});
    result.addAll({'spamComments': spamComments});
    result.addAll({'communityPosts': communityPosts});
    result.addAll({'pageViewsPerDay': pageViewsPerDay});
    result.addAll({'pageViewsPerMonth': pageViewsPerMonth});
    result.addAll({'joinedPerDay': joinedPerDay});
    result.addAll({'joinedPerMonth': joinedPerMonth});
    result.addAll({'leftPerDay': leftPerDay});
    result.addAll({'leftPerMonth': leftPerMonth});
    result.addAll({'createdAt': createdAt});
    result.addAll({'isDeleted': isDeleted});
    result.addAll({'rank': rank});
    result.addAll({'trendPoints': trendPoints});
    result.addAll({'privacyType': privacyType});
    result.addAll({'categories': categories});
    result.addAll({'communityRules': communityRules});
    result.addAll({'removalReasons': removalReasons});
  
    return result;
  }

  factory Community.fromMap(Map<String, dynamic> map) {
    return Community(
      id: map['id'],
      name: map['name'] ?? '',
      banner: map['banner'] ?? '',
      avatar: map['avatar'] ?? '',
      memberCount: map['memberCount']?.toInt() ?? 0,
      members: List<dynamic>.from(map['members']),
      mods: List<dynamic>.from(map['mods']),
      imageWidget: List<dynamic>.from(map['imageWidget']),
      buttonWidget: List<dynamic>.from(map['buttonWidget']),
      textWidget: List<dynamic>.from(map['textWidget']),
      moderators: List<dynamic>.from(map['moderators']),
      pendingMembers: List<dynamic>.from(map['pendingMembers']),
      spamPosts: List<dynamic>.from(map['spamPosts']),
      spamComments: List<dynamic>.from(map['spamComments']),
      communityPosts: List<dynamic>.from(map['communityPosts']),
      pageViewsPerDay: List<int>.from(map['pageViewsPerDay']),
      pageViewsPerMonth: List<int>.from(map['pageViewsPerMonth']),
      joinedPerDay: List<int>.from(map['joinedPerDay']),
      joinedPerMonth: List<int>.from(map['joinedPerMonth']),
      leftPerDay: List<int>.from(map['leftPerDay']),
      leftPerMonth: List<int>.from(map['leftPerMonth']),
      createdAt: map['createdAt'] ?? '',
      isDeleted: map['isDeleted'] ?? false,
      rank: map['rank']?.toInt() ?? 0,
      trendPoints: map['trendPoints']?.toInt() ?? 0,
      privacyType: map['privacyType'] ?? '',
      categories: List<String>.from(map['categories']),
      communityRules: List<dynamic>.from(map['communityRules']),
      removalReasons: List<dynamic>.from(map['removalReasons']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Community.fromJson(String source) => Community.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Community(id: $id, name: $name, banner: $banner, avatar: $avatar, memberCount: $memberCount, members: $members, mods: $mods, imageWidget: $imageWidget, buttonWidget: $buttonWidget, textWidget: $textWidget, moderators: $moderators, pendingMembers: $pendingMembers, spamPosts: $spamPosts, spamComments: $spamComments, communityPosts: $communityPosts, pageViewsPerDay: $pageViewsPerDay, pageViewsPerMonth: $pageViewsPerMonth, joinedPerDay: $joinedPerDay, joinedPerMonth: $joinedPerMonth, leftPerDay: $leftPerDay, leftPerMonth: $leftPerMonth, createdAt: $createdAt, isDeleted: $isDeleted, rank: $rank, trendPoints: $trendPoints, privacyType: $privacyType, categories: $categories, communityRules: $communityRules, removalReasons: $removalReasons)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    final listEquals = const DeepCollectionEquality().equals;
  
    return other is Community &&
      other.id == id &&
      other.name == name &&
      other.banner == banner &&
      other.avatar == avatar &&
      other.memberCount == memberCount &&
      listEquals(other.members, members) &&
      listEquals(other.mods, mods) &&
      listEquals(other.imageWidget, imageWidget) &&
      listEquals(other.buttonWidget, buttonWidget) &&
      listEquals(other.textWidget, textWidget) &&
      listEquals(other.moderators, moderators) &&
      listEquals(other.pendingMembers, pendingMembers) &&
      listEquals(other.spamPosts, spamPosts) &&
      listEquals(other.spamComments, spamComments) &&
      listEquals(other.communityPosts, communityPosts) &&
      listEquals(other.pageViewsPerDay, pageViewsPerDay) &&
      listEquals(other.pageViewsPerMonth, pageViewsPerMonth) &&
      listEquals(other.joinedPerDay, joinedPerDay) &&
      listEquals(other.joinedPerMonth, joinedPerMonth) &&
      listEquals(other.leftPerDay, leftPerDay) &&
      listEquals(other.leftPerMonth, leftPerMonth) &&
      other.createdAt == createdAt &&
      other.isDeleted == isDeleted &&
      other.rank == rank &&
      other.trendPoints == trendPoints &&
      other.privacyType == privacyType &&
      listEquals(other.categories, categories) &&
      listEquals(other.communityRules, communityRules) &&
      listEquals(other.removalReasons, removalReasons);
  }

  @override
  int get hashCode {
    return id.hashCode ^
      name.hashCode ^
      banner.hashCode ^
      avatar.hashCode ^
      memberCount.hashCode ^
      members.hashCode ^
      mods.hashCode ^
      imageWidget.hashCode ^
      buttonWidget.hashCode ^
      textWidget.hashCode ^
      moderators.hashCode ^
      pendingMembers.hashCode ^
      spamPosts.hashCode ^
      spamComments.hashCode ^
      communityPosts.hashCode ^
      pageViewsPerDay.hashCode ^
      pageViewsPerMonth.hashCode ^
      joinedPerDay.hashCode ^
      joinedPerMonth.hashCode ^
      leftPerDay.hashCode ^
      leftPerMonth.hashCode ^
      createdAt.hashCode ^
      isDeleted.hashCode ^
      rank.hashCode ^
      trendPoints.hashCode ^
      privacyType.hashCode ^
      categories.hashCode ^
      communityRules.hashCode ^
      removalReasons.hashCode;
  }
}
