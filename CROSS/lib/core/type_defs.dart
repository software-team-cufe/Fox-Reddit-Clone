import 'package:fpdart/fpdart.dart';
import 'package:reddit_fox/core/failure.dart';

/// A type definition representing a future that returns either a value of type [T] or a [Failure].
///
/// This type definition is often used to represent asynchronous operations that may succeed with a value of type [T],
/// or fail with a [Failure] indicating the reason for failure.
///
/// For example, `FutureEither<UserModel>` represents a future that returns either a UserModel or a Failure.
typedef FutureEither<T> = Future<Either<Failure, T>>;

/// A type definition representing a future that returns no value, but may fail with a [Failure].
///
/// This type definition is often used for asynchronous operations that perform side effects without returning a value,
/// but may still fail with a [Failure] indicating the reason for failure.
///
/// For example, `FutureVoid` represents a future that performs a side effect and may fail with a Failure.
typedef FutureVoid = FutureEither<void>;
