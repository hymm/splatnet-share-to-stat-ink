package com.example.splatnetshareapp;

import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;

import java.nio.ByteBuffer;
import java.io.InputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;

import io.flutter.app.FlutterActivity;
import io.flutter.plugin.common.ActivityLifecycleListener;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {
  Uri imageUri;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GeneratedPluginRegistrant.registerWith(this);
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
      if (type.startsWith("image/")) {
        handleSendImage(intent);
      }
    }

    new MethodChannel(getFlutterView(), "app.channel.shared.data").setMethodCallHandler(
      new MethodChannel.MethodCallHandler() {
        @Override
        public void onMethodCall(MethodCall methodCall, MethodChannel.Result result) {
          if (methodCall.method.contentEquals("getSharedImage")) {
            if (imageUri == null) {
              result.success(null);
              return;
            }
            try {
              result.success(getBytesFromUri(imageUri));
              imageUri = null;
            } catch (IOException e) {
              result.error("IMAGEUNAVAILABLE", "Could not get splatnet image", null);
            }
          }
        }
      }
    );
  }

  byte[] getBytesFromUri(Uri uri) throws IOException {
    InputStream iStream = getContentResolver().openInputStream(uri);
    byte[] inputData = getBytes(iStream);
    return inputData;
  }

  byte[] getBytes(InputStream inputStream) throws IOException {
    ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();
    int bufferSize = 2000000;
    byte[] buffer = new byte[bufferSize];

    int len = 0;
    while ((len = inputStream.read(buffer)) != -1) {
      byteBuffer.write(buffer, 0, len);
    }
    return byteBuffer.toByteArray();
  }

  void handleSendImage(Intent intent) {
    imageUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
  }
}
