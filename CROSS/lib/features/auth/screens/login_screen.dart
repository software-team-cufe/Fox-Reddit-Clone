import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:reddit_fox/Pages/home/HomePage.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/features/auth/screens/ForgetPasswordScreen.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String? errorMessage;

  static Future<String?> login(String username, String password) async {
    const url = ApiRoutesBackend.login;
    Map<String, dynamic> logindata = {
      "password": password,
      "username": username,
    };
    final response = await http.post(
      Uri.parse(url),
      body: jsonEncode(logindata),
      headers: {'Content-Type': 'application/json'},
    );
    print(response.statusCode);

    if (response.statusCode == 200) {
      final Map<String, dynamic> user = jsonDecode(response.body);
      print(response.body);
      saveToken(user["accessToken"], 'backtoken');
      saveToken('jessicatoken', 'mocktoken');

      Get.to(const HomePage());
    } else {
      return 'Invalid username or password';
    }
    return null;
  }

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
              TextField(
                decoration: const InputDecoration(
                  hintText: "Email",
                  prefixIcon: Icon(Icons.email),
                ),
                controller: emailController,
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 10),
              TextField(
                decoration: const InputDecoration(
                  hintText: "Password",
                  prefixIcon: Icon(Icons.password),
                ),
                controller: passwordController,
                obscureText: true,
                keyboardType: TextInputType.text,
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
                  final error = await login(username, password);
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

Future<void> saveToken(String token, String mockBackend) //mocktoken,backtoken
async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  await prefs.setString(mockBackend, token);
}

Future<String?> getToken(String mockBackend) async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? token = prefs.getString(mockBackend);
  print(token);
  return token;
}
