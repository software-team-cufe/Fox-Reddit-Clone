part of 'signup_cubit.dart';

@immutable
sealed class SignupState {}

class SignupInitial extends SignupState {}

class ChangePasswordVisabilityState extends SignupState {}

class ChangeGenderState extends SignupState {}

class ChangeConditionsState extends SignupState {}
class ChangeBirthdateState extends SignupState {}
class ChangeCountryState extends SignupState {}
