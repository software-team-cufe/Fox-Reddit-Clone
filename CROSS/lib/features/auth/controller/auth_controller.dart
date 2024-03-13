//import 'dart:html';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/features/auth/repository/auth_repository.dart';

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

  void signInWithGoogle(){
    _authRepository.signInWithGoogle();
  }
}