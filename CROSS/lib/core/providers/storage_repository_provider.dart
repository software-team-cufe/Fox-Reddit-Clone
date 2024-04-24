import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/failure.dart';
import 'package:reddit_fox/core/providers/firebase_providers.dart';
import 'package:reddit_fox/core/type_defs.dart';

/// Provider for accessing the [StorageRepository] instance.
final storageRepositoryProvider = Provider(
  (ref) => StorageRepository(
    firebaseStorage: ref.watch(storageProvider),
  ),
);

/// A repository for handling storage-related operations.
class StorageRepository {
  final FirebaseStorage _firebaseStorage;

  /// Constructs a [StorageRepository] instance.
  ///
  /// [firebaseStorage] is the FirebaseStorage instance to be used for storage operations.
  StorageRepository({required FirebaseStorage firebaseStorage})
      : _firebaseStorage = firebaseStorage;

  /// Stores a file in Firebase storage.
  ///
  /// [path] is the storage path where the file will be stored.
  /// [id] is the unique identifier for the file.
  /// [file] is the File object to be stored.
  ///
  /// Returns a [FutureEither] containing the download URL of the stored file on success,
  /// or a [Failure] object on failure.
  FutureEither<String> storeFile({
    required String path,
    required String id,
    required File? file,
  }) async {
    try {
      final ref = _firebaseStorage.ref().child(path).child(id);
      final uploadTask = ref.putFile(file!);
      final snapshot = await uploadTask;
      return right(await snapshot.ref.getDownloadURL());
    } catch (e) {
      return left(Failure(e.toString()));
    }
  }
}
