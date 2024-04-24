// import 'dart:ffi';

// import 'package:flutter/material.dart';
// import 'package:flutter/widgets.dart';
// import 'package:gap/gap.dart';
// import 'package:reddit_fox/core/common/CustomButton.dart';
// import 'package:reddit_fox/core/common/CustomTextBox.dart';

// class ForgetPasswordScreen extends StatelessWidget {
//   ForgetPasswordScreen({super.key});
//   bool _usermessage = false;
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text("Reset Password"),
//       ),
//       body: Center(
//         child: SingleChildScrollView(
//           padding: const EdgeInsets.symmetric(horizontal: 20),
//           child: Column(
//             children: [
//               const Gap(50),
//               const Center(
//                 child: Text(
//                   "Reset your password",
//                   textAlign: TextAlign.center,
//                   style: TextStyle(
//                     fontSize: 20,
//                     fontWeight: FontWeight.bold,
//                   ),
//                 ),
//               ),
//               Center(
//                 child: Text(
//                   "Enter your email address  and we'll send you a link to reset your password",
//                   textAlign: TextAlign.center,
//                   style: TextStyle(
//                     color: Colors.grey.shade500,
//                   ),
//                 ),
//               ),
//               const Gap(20),
//               const CustomTextBox(
//                 hintText: "Email",
//               ),
//               const Gap(20),
//               Visibility(
//                   visible: _usermessage,
//                   child: Text(
//                       "Reset instructions sent if your email exists in our system")),
//               const Gap(20),
//               CustomButton(
//                 text: "Reset password",
//                 onTap: () {
//                   set() {
//                     _usermessage = true;
//                   }
//                 },
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:reddit_fox/core/common/CustomButton.dart';
import 'package:reddit_fox/core/common/CustomTextBox.dart';
import 'package:reddit_fox/features/auth/screens/login_screen.dart';
import 'package:reddit_fox/routes/Mock_routes.dart';
import 'package:http/http.dart' as http;

/// A screen widget for resetting the user's password.
///
/// This widget allows the user to enter their email address and sends a link to reset their password.
/// If the email exists in the system, reset instructions are sent.
class ForgetPasswordScreen extends StatefulWidget {
  const ForgetPasswordScreen({super.key});

  @override
  _ForgetPasswordScreenState createState() => _ForgetPasswordScreenState();
}

class _ForgetPasswordScreenState extends State<ForgetPasswordScreen> {
  bool _usermessage = false;

  /// Sends a request to the backend to reset the password for the provided email.
  ///
  /// The [email] parameter is the email address of the user.
  Future<void> forgetEmail(String email) async {
    final Uri url = Uri.parse(ApiRoutesBackend.forgetPassword);

    final Map<String, dynamic> body = {
      "email": email,
    };
    final response = await http.post(
      url,
      body: jsonEncode(body),
      headers: {'Content-Type': 'application/json'},
    );
    print(response.body);
    print(response.statusCode);
  }

  final TextEditingController emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Reset Password"),
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const Gap(50),
              const Center(
                child: Text(
                  "Reset your password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Center(
                child: Text(
                  "Enter your email address and we'll send you a link to reset your password",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey.shade500,
                  ),
                ),
              ),
              const Gap(20),
              CustomTextBox(
                controller: emailController,
                hintText: "Email",
              ),
              const Gap(20),
              Visibility(
                visible: _usermessage,
                child: const Text(
                  "Reset instructions sent if your email exists in our system",
                ),
              ),
              const Gap(20),
              CustomButton(
                text: "Reset password",
                onTap: () {
                  setState(() {
                    _usermessage = true;
                    forgetEmail(emailController.text);
                    Timer(const Duration(seconds: 6), () {
                      Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (_) => const LoginScreen()),
                      );
                    });
                  });
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
