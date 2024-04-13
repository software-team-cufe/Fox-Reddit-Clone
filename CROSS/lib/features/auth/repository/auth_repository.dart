import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/core/constants/firebase_constants.dart';
import 'package:reddit_fox/core/failure.dart';
import 'package:reddit_fox/core/providers/firebase_providers.dart';
import 'package:reddit_fox/core/type_defs.dart';
import 'package:reddit_fox/models/user_model.dart';
import 'package:fpdart/fpdart.dart';
//import 'package:flutter/foundation.dart';

final authRepositoryProvider = Provider(
  (ref) => AuthRepository(
    firestore: ref.read(firestoreProvider),
    auth: ref.read(authProvider),
    googleSignIn: ref.read(googleSignInProvider)
  )
);

class AuthRepository {
  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;

  AuthRepository({
    required FirebaseFirestore firestore,
    required FirebaseAuth auth, 
    required GoogleSignIn googleSignIn,
  }) : _auth = auth,
       _firestore = firestore, 
       _googleSignIn = googleSignIn;

CollectionReference get _users => _firestore.collection(FirebaseConstants.usersCollection);

Stream<User?> get authStateChange => _auth.authStateChanges();

FutureEither<UserModel>signInWithGoogle() async {
  try {
    // Sign out the user first to force them to select their Google account again.////////////////////////////////////////////////////////////////////////////////
    await _googleSignIn.signOut();

    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    final googleAuth = await googleUser?.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,  );
UserCredential userCredential = await _auth.signInWithCredential(credential);

UserModel userModel;

if(userCredential.additionalUserInfo!.isNewUser){
  userModel = UserModel(
        name: userCredential.user!.displayName??"No Name", 
        profilePic: userCredential.user!.photoURL??Constants.avatarDefault, 
        banner: Constants.bannerDefault, 
        uid: userCredential.user!.uid, 
        isAuthenticated: true, 
        karma: 0,
        email: userCredential.user!.email ?? ""
        );
      await _users.doc(userCredential.user!.uid).set(userModel.toMap());
} else{
  userModel = await getUserData(userCredential.user!.uid).first;
}

  return right(userModel);
      //print(userCredential.user?.email);

      //_users.doc(userCredential.user!.uid).set({userModel.toMap()});
    }
    on FirebaseException catch (e) {
      throw e.message!;
    } catch (e) {
      return left(Failure(e.toString()));
    }
  }
  Stream<UserModel> getUserData(String uid) {
    return _users.doc(uid).snapshots().map((event) => UserModel.fromMap(event.data() as Map<String, dynamic>));
  }
}
