import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';

/// Provider for accessing the Firestore instance.
final firestoreProvider = Provider((ref) => FirebaseFirestore.instance);

/// Provider for accessing the FirebaseAuth instance.
final authProvider = Provider((ref) => FirebaseAuth.instance);

/// Provider for accessing the FirebaseStorage instance.
final storageProvider = Provider((ref) => FirebaseStorage.instance);

/// Provider for accessing the GoogleSignIn instance.
final googleSignInProvider = Provider((ref) => GoogleSignIn());
