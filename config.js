var path = require('path');
var rootPath = path.normalize(__dirname);
var http_port = 3000;
var ws_port = 3333;

module.exports = {
  google: {
    "sheet_id":"",
    "type": "service_account",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
  },
  dev: {
      db: 'mongodb://localhost/wsn',
      root: rootPath,
      app: {
        hport: http_port,
        wsport: ws_port,
        host:'http://localhost:'+http_port+'/',
        ws:'ws://localhost:'+ws_port,
        name: 'WSN',
        secret: ''
      }
  },
  prod: {
      hport: http_port,
      wsport: ws_port,
      db: 'mongodb://localhost/wsn',
      root: rootPath,
      app: {
        host:'http://138.197.115.126:'+http_port+'/',
        ws:'ws://138.197.115.126:'+ws_port,
        name: 'WSN',
        secret: ''
      }
  }
}
