import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:reddit_fox/core/common/loader.dart';
import 'package:reddit_fox/core/common/sign_in_with_google_button.dart';
import 'package:reddit_fox/core/constants/constants.dart';
import 'package:reddit_fox/features/auth/controller/auth_controller.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';

class LoginScreenWithGoogle extends ConsumerWidget {
  const LoginScreenWithGoogle({super.key});

  // void signInAsGuest(WidgetRef ref, BuildContext context) {
  //   ref.read(authControllerProvider.notifier).signInAsGuest(context);
  // }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isLoading = ref.watch(authControllerProvider);
   

    return Scaffold(
      appBar: AppBar(
        title: Image.asset(
          Constants.foxPath,
          height: 40,
        ),
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text(
              'Skip',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: isLoading
      ? const Loader()
      : Column(
              children: [
                const SizedBox(height: 30),
                const Text(
                  'Dive into anything',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 30),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Image.asset(
                    Constants.loginEmotePath,
                    height: 400,
                  ),
                ),
                const SizedBox(height: 20),
                //const Responnsive(child: SignInWithGoogleButton()),
                // Button for email login
                ElevatedButton(
                  onPressed: () => const LoginScreen(),
                  child: const Text('Login with Email'),
                ),
                const SizedBox(height: 20),
                const SignInWithGoogleButton(),
              ],
            ),
    );
  }
}