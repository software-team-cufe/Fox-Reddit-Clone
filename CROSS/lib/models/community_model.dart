import 'dart:convert';
import 'package:collection/collection.dart';

class Community {
  final String? id;
  final String name;
  final String banner;
  final String avatar;
  final int memberCount;
  final List<Member> members;
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
    List<Member>? members,
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
    return {
      'id': id,
      'name': name,
      'banner': banner,
      'avatar': avatar,
      'memberCount': memberCount,
      'members': members.map((member) => member.toMap()).toList(),
      'mods': mods,
      'imageWidget': imageWidget,
      'buttonWidget': buttonWidget,
      'textWidget': textWidget,
      'moderators': moderators,
      'pendingMembers': pendingMembers,
      'spamPosts': spamPosts,
      'spamComments': spamComments,
      'communityPosts': communityPosts,
      'pageViewsPerDay': pageViewsPerDay,
      'pageViewsPerMonth': pageViewsPerMonth,
      'joinedPerDay': joinedPerDay,
      'joinedPerMonth': joinedPerMonth,
      'leftPerDay': leftPerDay,
      'leftPerMonth': leftPerMonth,
      'createdAt': createdAt,
      'isDeleted': isDeleted,
      'rank': rank,
      'trendPoints': trendPoints,
      'privacyType': privacyType,
      'categories': categories,
      'communityRules': communityRules,
      'removalReasons': removalReasons,
    };
  }

  factory Community.fromMap(Map<String, dynamic> map) {
    return Community(
      id: map['id'],
      name: map['name'] ?? '',
      banner: map['banner'] ?? '',
      avatar: map['avatar'] ?? '',
      memberCount: map['memberCount'] ?? 0,
      members: List<Member>.from(map['members']?.map((x) => Member.fromMap(x))),//
//      members: [],
      mods: map['mods'],
      imageWidget: map['imageWidget'],
      buttonWidget: map['buttonWidget'],
      textWidget: map['textWidget'],
      moderators: map['moderators'],
      pendingMembers: map['pendingMembers'],
      spamPosts: map['spamPosts'],
      spamComments: map['spamComments'],
      communityPosts: map['communityPosts'],
      pageViewsPerDay: map['pageViewsPerDay'],
      pageViewsPerMonth: map['pageViewsPerMonth'],
      joinedPerDay: map['joinedPerDay'],
      joinedPerMonth: map['joinedPerMonth'],
      leftPerDay: map['leftPerDay'],
      leftPerMonth: map['leftPerMonth'],
      createdAt: map['createdAt'] ?? '',
      isDeleted: map['isDeleted'] ?? false,
      rank: map['rank'] ?? 0,
      trendPoints: map['trendPoints'] ?? 0,
      privacyType: map['privacyType'] ?? '',
      categories: List<String>.from(map['categories']),
      communityRules: map['communityRules'],
      removalReasons: map['removalReasons'],
    );
  }

  String toJson() => json.encode(toMap());

  factory Community.fromJson(String source) =>
      Community.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Community(id: $id, name: $name, banner: $banner, avatar: $avatar, memberCount: $memberCount, members: $members, mods: $mods, imageWidget: $imageWidget, buttonWidget: $buttonWidget, textWidget: $textWidget, moderators: $moderators, pendingMembers: $pendingMembers, spamPosts: $spamPosts, spamComments: $spamComments, communityPosts: $communityPosts, pageViewsPerDay: $pageViewsPerDay, pageViewsPerMonth: $pageViewsPerMonth, joinedPerDay: $joinedPerDay, joinedPerMonth: $joinedPerMonth, leftPerDay: $leftPerDay, leftPerMonth: $leftPerMonth, createdAt: $createdAt, isDeleted: $isDeleted, rank: $rank, trendPoints: $trendPoints, privacyType: $privacyType, categories: $categories, communityRules: $communityRules, removalReasons: $removalReasons)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Community &&
        other.id == id &&
        other.name == name &&
        other.banner == banner &&
        other.avatar == avatar &&
        other.memberCount == memberCount &&
        const DeepCollectionEquality().equals(other.members, members) &&
        other.mods == mods &&
        other.imageWidget == imageWidget &&
        other.buttonWidget == buttonWidget &&
        other.textWidget == textWidget &&
        other.moderators == moderators &&
        other.pendingMembers == pendingMembers &&
        other.spamPosts == spamPosts &&
        other.spamComments == spamComments &&
        other.communityPosts == communityPosts &&
        other.pageViewsPerDay == pageViewsPerDay &&
        other.pageViewsPerMonth == pageViewsPerMonth &&
        other.joinedPerDay == joinedPerDay &&
        other.joinedPerMonth == joinedPerMonth &&
        other.leftPerDay == leftPerDay &&
        other.leftPerMonth == leftPerMonth &&
        other.createdAt == createdAt &&
        other.isDeleted == isDeleted &&
        other.rank == rank &&
        other.trendPoints == trendPoints &&
        other.privacyType == privacyType &&
        const DeepCollectionEquality().equals(other.categories, categories) &&
        other.communityRules == communityRules &&
        other.removalReasons == removalReasons;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        banner.hashCode ^
        avatar.hashCode ^
        memberCount.hashCode ^
        const DeepCollectionEquality().hash(members) ^
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
        const DeepCollectionEquality().hash(categories) ^
        communityRules.hashCode ^
        removalReasons.hashCode;
  }
}

class Member {
  final String userID;
  final IsMuted isMuted;
  final IsBanned isBanned;

  Member({
    required this.userID,
    required this.isMuted,
    required this.isBanned,
  });

  Map<String, dynamic> toMap() {
    return {
      'userID': userID,
      'isMuted': isMuted.toMap(),
      'isBanned': isBanned.toMap(),
    };
  }

  factory Member.fromMap(Map<String, dynamic> map) {
    return Member(
      userID: map['userID'],
      isMuted: IsMuted.fromMap(map['isMuted']),
      isBanned: IsBanned.fromMap(map['isBanned']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Member.fromJson(String source) => Member.fromMap(json.decode(source));

  @override
  String toString() =>
      'Member(userID: $userID, isMuted: $isMuted, isBanned: $isBanned)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Member &&
        other.userID == userID &&
        other.isMuted == isMuted &&
        other.isBanned == isBanned;
  }

  @override
  int get hashCode => userID.hashCode ^ isMuted.hashCode ^ isBanned.hashCode;
}

class IsMuted {
  final bool value;
  final String date;
  final String reason;

  IsMuted({
    required this.value,
    required this.date,
    required this.reason,
  });

  Map<String, dynamic> toMap() {
    return {
      'value': value,
      'date': date,
      'reason': reason,
    };
  }

  factory IsMuted.fromMap(Map<String, dynamic> map) {
    return IsMuted(
      value: map['value'],
      date: map['date'],
      reason: map['reason'],
    );
  }

  String toJson() => json.encode(toMap());

  factory IsMuted.fromJson(String source) => IsMuted.fromMap(json.decode(source));

  @override
  String toString() =>
      'IsMuted(value: $value, date: $date, reason: $reason)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is IsMuted &&
        other.value == value &&
        other.date == date &&
        other.reason == reason;
  }

  @override
  int get hashCode => value.hashCode ^ date.hashCode ^ reason.hashCode;
}

class IsBanned {
  final bool value;
  final String date;
  final String reason;
  final String note;
  final String period;

  IsBanned({
    required this.value,
    required this.date,
    required this.reason,
    required this.note,
    required this.period,
  });

  Map<String, dynamic> toMap() {
    return {
      'value': value,
      'date': date,
      'reason': reason,
      'note': note,
      'period': period,
    };
  }

  factory IsBanned.fromMap(Map<String, dynamic> map) {
    return IsBanned(
      value: map['value'],
      date: map['date'],
      reason: map['reason'],
      note: map['note'],
      period: map['period'],
    );
  }

  String toJson() => json.encode(toMap());

  factory IsBanned.fromJson(String source) => IsBanned.fromMap(json.decode(source));

  @override
  String toString() =>
      'IsBanned(value: $value, date: $date, reason: $reason, note: $note, period: $period)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is IsBanned &&
        other.value == value &&
        other.date == date &&
        other.reason == reason &&
        other.note == note &&
        other.period == period;
  }

  @override
  int get hashCode => value.hashCode ^ date.hashCode ^ reason.hashCode ^ note.hashCode ^ period.hashCode;
}
