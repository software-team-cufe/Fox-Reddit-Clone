import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/features/auth/repository/auth_repository.dart';
import 'package:google_sign_in/google_sign_in.dart';

import '../../../core/utils.dart';

// AuthController authController = AuthController ();
// authController.singInWithGoogle();

// Provider
final authControllerProvider = Provider(
  (ref) => AuthController(
    authRepository: ref.read(authRepositoryProvider),
    ),
  );

class AuthController {
  final AuthRepository _authRepository;
  AuthController({required AuthRepository authRepository}) :_authRepository = authRepository;

  void signInWithGoogle(BuildContext context) async {
    
  final googleSignIn = GoogleSignIn(); // Create an instance of GoogleSignIn
  await googleSignIn.signOut(); // Clear cached account
  final user = await _authRepository.signInWithGoogle(); // Call the repository method
  user.fold((l) => showSnackBar(context, l.messge), (r) => null); //l -> faliur,r-> success left & right
}

  }
