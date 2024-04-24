import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/core/utils.dart';
import 'package:reddit_fox/features/auth/repository/auth_repository.dart';
import 'package:reddit_fox/models/user_model.dart';

/// Provider for managing the current user's state.
final userProvider = StateProvider<UserModel?>((ref) => null);

/// Provider for authentication controller.
final authControllerProvider = StateNotifierProvider<AuthController, bool>(
  (ref) => AuthController(
    authRepository: ref.watch(authRepositoryProvider),
    ref: ref,
  ),
);

/// Provider for listening to authentication state changes.
final authStateChangeProvider = StreamProvider((ref) {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.authStateChange;
});

/// Provider for getting user data based on UID.
final getUserDataProvider = StreamProvider.family((ref, String uid) {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.getUserData(uid);
});

/// Controller for authentication-related operations.
class AuthController extends StateNotifier<bool> {
  final AuthRepository _authRepository;
  final Ref _ref;

  AuthController({
    required AuthRepository authRepository,
    required Ref ref,
  })  : _authRepository = authRepository,
        _ref = ref,
        super(false); // Initial state is loading.

  /// Stream for listening to authentication state changes.
  Stream<User?> get authStateChange => _authRepository.authStateChange;

  /// Signs in the user using Google authentication.
  ///
  /// Sets the controller state to true while processing the sign-in operation.
  /// After completion, updates the state with the result and updates the userProvider.
  void signInWithGoogle(BuildContext context) async {
    state = true;
    final user = await _authRepository.signInWithGoogle();
    state = false;
    user.fold(
      (l) => showSnackBar(context, l.message),
      (userModel) => _ref.read(userProvider.notifier).update((state) => userModel),
    );
  }

  /// Retrieves user data based on the provided UID.
  Stream<UserModel> getUserData(String uid) {
    return _authRepository.getUserData(uid);
  }
}
