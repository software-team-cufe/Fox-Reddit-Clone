//import "dart:typed_data";

import "package:cloud_firestore/cloud_firestore.dart";
import "package:firebase_auth/firebase_auth.dart";
//import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:fpdart/fpdart.dart";
import "package:google_sign_in/google_sign_in.dart";
import "package:reddit_fox/core/failure.dart";
import "package:reddit_fox/models/user_model.dart";
//import "package:reddit_fox/lib/Models/user_model.dart";
import "package:reddit_fox/core/constants/constants.dart";
import "package:reddit_fox/core/constants/firebase_constants.dart";
import "package:reddit_fox/core/providers/firebase_providers.dart";
import "package:reddit_fox/core/type_defs.dart";
//FirebaseFirestore.instance /home/atem/Documents/GitHub/Fox-Reddit-Clone/CROSS/lib/Models/user_model.dart

final authRepositoryProvider = Provider(
  (ref) => AuthRepository(
    firestore: ref.read(firestoreProvider),
    auth: ref.read(authProvider),
    googelSignIn: ref.read(googleSignInProvider),
  ),
);

class AuthRepository {
  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;

  AuthRepository({
    required FirebaseFirestore firestore,
    required FirebaseAuth auth,
    required GoogleSignIn googelSignIn,
  })
      : _auth = auth,
        _firestore = firestore,
        _googleSignIn = googelSignIn;

  CollectionReference get _users => _firestore.collection(FirebaseConstants.usersCollection);

  //UserModel? userModel; // Initialize to null

FutureEither<UserModel> signInWithGoogle() async {
  try {
    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    final googleAuth = await googleUser?.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    UserCredential userCredential = await _auth.signInWithCredential(credential);
    //print(userCredential.user?.email);
    late UserModel userModel;

    if (userCredential.additionalUserInfo!.isNewUser) {
      userModel = UserModel(
        name: userCredential.user!.displayName ?? 'No Name',
        profilePic: userCredential.user!.photoURL ?? Constants.avatarDefault, 
        banner: Constants.bannerDefault, 
        uid: userCredential.user!.uid, 
        isAuthenticated: true, 
        karma: 0,
      );
      await _users.doc(userCredential.user!.uid).set(userModel.toMap());
    }
    else{
      // -> -> -> ->
      userModel = await getUserData(userCredential.user!.uid).first;
    }
    return right(userModel);
  } on FirebaseException catch (e) {
    throw e.message!;
  } catch (e){
    return left(Failure(e.toString()));
  }
}
Stream<UserModel> getUserData(String uid){
  return _users.doc(uid).snapshots().map((event) => UserModel.fromMap(event.data() as Map<String,dynamic>));
}
}