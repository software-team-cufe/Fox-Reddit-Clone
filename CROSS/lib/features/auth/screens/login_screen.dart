import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  static Future<String?> login(String username, String password) async {
    final url = ApiRoutes.login;
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final List<dynamic> users = jsonDecode(response.body);

      for (final user in users) {
        if (user['userName'] == username && user['password'] == password) {
          // Login successful
          print('login successful');
          return null; // No error message
        } else {
          print('invalid login');
        }
      }
    }

    // If unable to fetch data or no matching user found
    return 'Invalid username or password';
  }

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String? errorMessage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const SizedBox(height: 50),
              const Center(
                child: Text(
                  "Enter your login information",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              CustomTextBox(
                hintText: "Email / UserName or Phone number",
                icon: Icons.email,
                controller: emailController,
                obscureText: false, // Not a password field
              ),
              const SizedBox(height: 10),
              CustomTextBox(
                hintText: "Password",
                icon: Icons.password,
                controller: passwordController,
                obscureText: true, // It's a password field
              ),
              const SizedBox(height: 20),
              if (errorMessage != null) Text(errorMessage!),
              CustomButton(
                text: "Login",
                onTap: () async {
                  setState(() {
                    errorMessage = null; // Clear previous error message
                  });
                  final String username = emailController.text;
                  final String password = passwordController.text;
                  final error = await LoginScreen.login(username, password);
                  setState(() {
                    errorMessage = error;
                  });
                  if (error == null) {
                    // Navigate to the home page upon successful login
                    Get.to(() => const HomePage());
                  }
                },
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () {
                  Get.to(() => const ForgetPasswordScreen());
                },
                child: const Text('Forgot password?'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
