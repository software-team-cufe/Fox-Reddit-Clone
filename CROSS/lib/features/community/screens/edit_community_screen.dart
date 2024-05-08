import "dart:io";
import "package:dotted_border/dotted_border.dart";
import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:fpdart/fpdart.dart";
import "package:reddit_fox/core/common/error_text.dart";
import "package:reddit_fox/core/common/loader.dart";
import "package:reddit_fox/core/constants/constants.dart";
import "package:reddit_fox/core/failure.dart";
import "package:reddit_fox/core/utils.dart";
import "package:reddit_fox/features/community/controller/community_controller.dart";
import "package:reddit_fox/models/community_model.dart";
import "package:reddit_fox/theme/pallete.dart";

class EditCommunityScreen extends ConsumerStatefulWidget {
  final String name;
  const EditCommunityScreen({super.key, 
  required this.name});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _EditCommunityScreen();
}

class _EditCommunityScreen extends ConsumerState<EditCommunityScreen> {
  File? bannerFile;
  File? profileFile;

  void selectBannerImage()async{
    final res = await pickImage();
    if(res!=null) {
      setState(() {
        bannerFile = File(res.files.first.path!);
      });
   
    }
  }

   void selectProfileImage()async{
    final res = await pickImage();
    if(res!=null) {
      setState(() {
        profileFile = File(res.files.first.path!);
      });
   
    }
  }

void save(Community community) async {
  Either<Failure, Community> communityResult = right(community); // Initialize to success by default
  try {
    // Call the editCommunity method from the controller
    await ref
        .read(communityControllerProvider.notifier)
        .editCommunity(
          profileFile: profileFile, 
          bannerFile: bannerFile, 
          context: context, 
          communityResult: communityResult,
        );

    // Set the communityResult to success if the editing process is successful
    communityResult = right(community);
  } catch (e) {
    // Set the communityResult to failure if an error occurs during the editing process
    communityResult = left(Failure(e.toString()));
  }
}




 @override
Widget build(BuildContext context) {
  final isLoading = ref.watch(communityControllerProvider);
  return ref.watch(getCommunityByNameProvider(widget.name)).when(
    data: (communityEither) {
      return communityEither.fold(
        (failure) => ErrorText(error: failure.message),
        (community) => Scaffold(
          backgroundColor: Pallete.darkModeAppTheme.colorScheme.background,
          appBar: AppBar(
            title: const Text('Edit Community'),
            centerTitle: false,
            actions: [
              TextButton(
                onPressed: () => save(community),
                child: const Text('Save'),
              ),
            ],
          ),
          body: isLoading ? const Loader() : Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                SizedBox(
                  height: 200,
                  child: Stack(
                    children: [
                      GestureDetector(
                        onTap: selectBannerImage,
                        child: DottedBorder(
                          borderType: BorderType.RRect,
                          radius: const Radius.circular(10),
                          dashPattern: const [10, 4],
                          strokeCap: StrokeCap.round,
                          color: Pallete.darkModeAppTheme.textTheme.bodyMedium!.color!,
                          child: Container(
                            width: double.infinity,
                            height: 150,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: bannerFile != null ? Image.file(bannerFile!) : Image.network(community.banner),
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 20,
                        left: 20,
                        child: GestureDetector(
                          onTap: selectProfileImage,
                          child: profileFile != null
                              ? CircleAvatar(
                            backgroundImage: FileImage(profileFile!),
                            radius: 34,
                          )
                              : CircleAvatar(
                            backgroundImage: NetworkImage(community.avatar),
                            radius: 34,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    },
    loading: () => const Loader(),
    error: (error, stackTrace) => ErrorText(error: error.toString()),
  );
}}