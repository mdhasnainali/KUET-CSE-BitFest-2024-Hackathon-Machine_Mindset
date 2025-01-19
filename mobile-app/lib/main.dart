import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WebViewApp(),
    );
  }
}

class WebViewApp extends StatefulWidget {
  @override
  _WebViewAppState createState() => _WebViewAppState();
}

class _WebViewAppState extends State<WebViewApp> {
  late WebViewController _webViewController;

  @override
  void initState() {
    super.initState();
    _webViewController = WebViewController()
      ..loadRequest(Uri.parse("http://192.168.15.78:3000/")) // Set the URL dynamically
      ..setJavaScriptMode(JavaScriptMode.unrestricted) // Allow JavaScript
      ..setUserAgent(
          'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36'); // Set the user agent
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(      
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(" ", style: TextStyle(
          color: Colors.grey,
          fontSize: 20,
          fontWeight: FontWeight.bold
        ),),
      ),
      body: WebViewWidget(
        controller: _webViewController,
      ),
    );
  }
}
