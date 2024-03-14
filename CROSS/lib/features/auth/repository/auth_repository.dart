//import "dart:html";
import "package:cloud_firestore/cloud_firestore.dart";
import "package:firebase_auth/firebase_auth.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:google_sign_in/google_sign_in.dart";
import "package:reddit_fox/core/constants/constants.dart";
import "package:reddit_fox/core/constants/firebase_constants.dart";
import "package:reddit_fox/core/providers/firebase_providers.dart";
import "package:reddit_fox/pages/user_model.dart";

//FirebaseFirestore.instance

final authRepositoryProvider = Provider((ref) => AuthRepository(firestore: ref.read(firestoreProvider), auth: ref.read(authProvider), googelSignIn:ref.read(googleSignInProvider),),);

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

      CollectionReference get _users =>_firestore.collection(FirebaseConstants.usersCollection);
  void signInWithGoogle() async{
    try{
        final GoogleSignInAccount? googelUser = await _googleSignIn.signIn();

        final googleAuth = await googelUser?.authentication;

        final credential = GoogleAuthProvider.credential(
          accessToken: googleAuth?.accessToken,
          idToken: googleAuth?.idToken,
        );


        UserCredential userCredential = await _auth.signInWithCredential(credential);

        //print(userCredential.user?.email);
        //_firestore.collection('users').doc(userCredential.user!.uid).set({
      UserModel userModel;    
      if(userCredential.additionalUserInfo!.isNewUser) {

        userModel = UserModel(
          name: userCredential.user!.displayName??'No Name',
          profilePic: userCredential.user!.photoURL??Constants.avatarDefault, 
          banner: Constants.bannerDefault, 
          uid: userCredential.user!.uid, 
          isAuthenticated: true, 
          karma: 0,
           );
           await _users.doc(userCredential.user!.uid).set(userModel.toMap());
      }
        
          // await _users.doc(userModel.uid).set(userModel.toMap());
           
        // print(userCredential.user?.email);
     }    
     catch (e) {
      print(e);
    }
  }
}