import 'dart:convert' show utf8, json, base64Encode;
import 'dart:async' show Future;
import 'dart:io' show HttpClient, HttpClientRequest, HttpClientResponse, HttpHeaders, ContentType, HttpStatus;

String getImageBase64(im) {
  // List<int> imageBytes = im.readAsBytesSync();
  String base64Image = base64Encode(im);
  return base64Image;
}

Future<Map<String, dynamic>> performApiRequest(
  HttpClient client,
  String url,
  Map<String, dynamic> jsonBody,
  [String accessToken]
) async {
  final String requestBody = json.encode(jsonBody);
  HttpClientRequest request = await client.postUrl(Uri.parse(url))
    // ..headers.add(HttpHeaders.ACCEPT, ContentType.JSON)
    ..headers.contentType = ContentType.JSON
    ..headers.contentLength = requestBody.length
    ..headers.chunkedTransferEncoding = false;
  if (accessToken != null) {
    request.headers.add(HttpHeaders.AUTHORIZATION, 'Bearer $accessToken');
  }
  request.write(requestBody);
  HttpClientResponse response = await request.close();
  if (response.headers.contentType.toString() != ContentType.JSON.toString()) {
    throw new UnsupportedError('Server returned an unsupported content type: '
        '${response.headers.contentType} from ${request.uri}');
  }
  if (response.statusCode != HttpStatus.OK) {
    throw new StateError(
        'Server responded with error: ${response.statusCode} ${response.reasonPhrase}');
  }
  return json.decode(await response.transform(utf8.decoder).join());
}

Future<Map<String, dynamic>> sendImage(im) async {
  var httpClient = new HttpClient();
  var requestBody = {
    "nickname": 'Me',
    "pngBase64": getImageBase64(im),
    "utcTime": 10,
  };

  var response = await performApiRequest(
    httpClient,
    'https://us-central1-squidtracks.cloudfunctions.net/sendBattleImage',
    requestBody
  );

  if (response.containsKey("err")) {
    print(response["err"]);
  }

  return response;
}
