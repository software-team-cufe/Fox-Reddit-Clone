import 'package:shared_preferences/shared_preferences.dart';

class StorageServices {
  static final StorageServices instance = StorageServices();
  late final SharedPreferences _preferences;

  Future<void> initPrefs() async {
    _preferences = await SharedPreferences.getInstance();
  }

  Future<bool> saveUserToken(String token) async {
    return await _preferences.setString("token", token);
  }

  Future<bool> setTheme(String theme) async {
    return await _preferences.setString("theme", theme);
  }

  Future<bool> removeUserToken() async {
    return await _preferences.remove("token");
  }

  String? getUserToken() {
    return _preferences.getString('token');
  }

  String? getTheme() {
    return _preferences.getString('theme');
  }
}
