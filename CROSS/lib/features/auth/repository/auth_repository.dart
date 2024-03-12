import "dart:html";

import "package:cloud_firestore/cloud_firestore.dart";
import "package:firebase_auth/firebase_auth.dart";
import "package:google_sign_in/google_sign_in.dart";


class AuthRepository {
  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;
  final GoogleSignIn _googleSignIn;


  AuthRepository({
    required FirebaseFirestore firestore,
    required FirebaseAuth auth,
    required GoogleSignIn googelSignIn,

  }): _auth = auth,
      _firestore = firestore, 
      _googleSignIn = googelSignIn;

  void signInWithGoogle() async{
    try{
        final GoogleSignInAccount? googelUser = await _googleSignIn.signIn();

        final googleAuth = await googelUser?.authentication;

        final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth?.accessToken,
          idToken: googleAuth?.idToken,
        );


        UserCredential userCredential = await _auth.signInWithCredential(credential);

        print(userCredential.user?.email);
    } catch (e) {
      print(e);
    }
  }
}