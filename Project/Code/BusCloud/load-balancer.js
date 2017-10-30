'use strict';

var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

//var monkey = require('node-monkey')();
// console.log(monkey);
//monkey.attachConsole();

global.server1 = 0;
global.server2 = 0;
global.server3 = 0;
global.url = [];

http.createServer(function(req, res) {
  var hostname = req.headers.host.split(':')[0];
  var pathname = url.parse(req.url).pathname;

  // console.log(hostname);
  console.log(pathname);
  if (pathname.indexOf('/api') < 0) { //not API call
    console.log('Not API Path...');
    console.log('Listing to port 8003');
    proxy.web(req, res, { target: 'http://localhost:8003' });
  } else {
    console.log('String with API...');
    var rand = Math.floor(Math.random() * 2) + 1;
    switch(rand) {
      case 1:
        console.log('Listing to port 8001');
        global.server1 += 1;
        global.url.push(hostname + ':8001' + pathname);
        req.headers._server1 = global.server1;
        req.headers._server2 = global.server2;
        console.log(global.url);
        // console.log(global.url);
        req.headers._url = global.url;
        proxy.web(req, res, { target: 'http://localhost:8001' });
        break;
      default:
        console.log('Listing to port 8002');
        global.server2 += 1;
        global.url.push(hostname + ':8002' + pathname);
        req.headers._server1 = global.server1;
        req.headers._server2 = global.server2;
        console.log(global.url);
        req.headers._url = global.url;
        // console.log(global.url);
        proxy.web(req, res, { target: 'http://localhost:8002' });
        break;
    }
  }
}).listen(8080, function() {
  console.log('proxy listening on port 8080');
});
