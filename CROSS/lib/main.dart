import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:reddit_fox/core/common/error_text.dart';
import 'package:reddit_fox/core/common/loader.dart';
import 'package:reddit_fox/features/auth/controller/auth_controller.dart';
import 'package:reddit_fox/features/auth/screens/starting_screen.dart';
import 'package:reddit_fox/firebase_options.dart';
import 'package:reddit_fox/models/user_model.dart';
import 'package:reddit_fox/theme/pallete.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
    // DevicePreview(builder: (context) => const ProviderScope( child: MyApp(),),
  );
  runApp(
    // DevicePreview(
    //   builder: (context) => const MyApp(),
    // ),
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _MyAppState();

}
class _MyAppState extends ConsumerState<MyApp> {
  UserModel? userModel; 

  void getData(WidgetRef ref, User data) async {
      userModel = await ref.watch(authControllerProvider.notifier).getUserData(data.uid).first;
      ref.read(userProvider.notifier).update((state) => userModel);
      //setState(() { });
  }
  @override
  Widget build(BuildContext context) {
    return ref.watch(authStateChangeProvider).when(data: (data) => GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Fox App',
      theme: Pallete.darkModeAppTheme,
      home: const StartingScreen(),
//      locale: DevicePreview.locale(context),
      //    builder: DevicePreview.appBuilder,
  ), error: (error,  stackTrace) => ErrorText(error: error.toString()), loading: () => const Loader(),
  );
  }
}

