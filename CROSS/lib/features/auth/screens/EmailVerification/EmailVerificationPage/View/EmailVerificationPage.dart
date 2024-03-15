import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../Blocs/EmailVerificationCubit/email_verification_cubit.dart';
import 'Widget/EmailVerificationBody.dart';

class EmailVerificationPage extends StatelessWidget {
  const EmailVerificationPage({super.key, required this.email});
  final String email;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocProvider(
        create: (context) => EmailVerificationCubit(email),
        child: const EmailVerificationBody(),
      ),
    );
  }
}
