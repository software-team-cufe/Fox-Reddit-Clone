import '../../GeneralWidgets/AppText.dart';
import 'CairoFont.dart';
import 'InterFont.dart';

class FontFamily {
  static String get black => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.black
      : InterFont.black;
  static String get bold => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.bold
      : InterFont.bold;
  static String get extraLight => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.extraLight
      : InterFont.extraLight;
  static String get extraBold => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.extraBold
      : InterFont.extraBold;
  static String get light => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.light
      : InterFont.light;
  static String get medium => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.medium
      : InterFont.medium;
  static String get regular => AppText.defaultLanguage == TextLanguage.arabic
      ? CairoFont.regular
      : InterFont.regular;
}
