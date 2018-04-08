import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:typed_data';
import 'share.dart' show sendImage;

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Splat Stats',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Send to Splat Stats'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  static const platform = const MethodChannel('app.channel.shared.data');
  Uint8List imageShared;

  @override
  void initState() {
    super.initState();
    getSharedImage();
  }

  getSharedImage() async {
    Uint8List sharedImage = await platform.invokeMethod("getSharedImage");
    if (sharedImage != null) {
      debugPrint('flutter got an image');
      setState(() {
        imageShared = sharedImage;
      });
    }
  }

  handlePress() {
    sendImage(imageShared);
    imageShared = null;
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Align(
        alignment: AlignmentDirectional.topStart,
        child: new Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            new Container(
              margin: const EdgeInsets.only(top: 5.0),
              child: imageShared != null ?
                new Image.memory(imageShared) :
                new Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    new Text('1. Go to Official Nintendo Switch App and click Share on the battle you wish to send'),
                    new Text('2. Click "Share" on the battle you wish to send'),
                    new Text('3. Select Splat Stats App'),
                  ],
                )
              ,
            ),
            new RaisedButton(
              color: Colors.blueAccent,
              textColor: Colors.white,
              child: new Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  new Container(
                    margin: new EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 4.0, 0.0),
                    child: new Text('Send'),
                  ),
                  new Icon(Icons.send),
                ],
              ),
              onPressed: imageShared != null ? handlePress : null,
            ),
          ],
        ),
      ),
    );
  }
}
