class ImageModel {
  String id = "";
  String userId = "";
  String url = "";
  ImageModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    userId = json['userId'];
    url = json['url'];
  }
}
