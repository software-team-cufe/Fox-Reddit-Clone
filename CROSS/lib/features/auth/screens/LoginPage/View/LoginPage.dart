import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:reddit_fox/Shared/AppColors.dart';

import '../Blocs/LoginCubit/login_cubit.dart';
import 'Widgets/LoginBody.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: AppColors.instance.background,
        foregroundColor: AppColors.instance.text,
        elevation: 0,
      ),
      body: BlocProvider(
        create: (context) => LoginCubit(),
        child: const LoginBody(),
      ),
    );
  }
}
