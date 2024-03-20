import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/failure.dart';

typedef FutureEither<T> = Future<Either<Failure, T>>;//any type FutrueEither<UserModel>
typedef FutureVoid = FutureEither<void>;