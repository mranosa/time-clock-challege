'use strict';

var oauth = require('oauth'),
  OAuth2 = oauth.OAuth2,
  http = require('http');

var oauth2 = new OAuth2('kfxy64p25tziyjhoaghpvi3h4rgf82a',
  'nhh5gjr2fslp10lmzgcrs7flzxcck5r',
  'https://auth.payrollhero.com/',
  null,
  'oauth/token',
  null);

var Client = require('node-rest-client').Client;

var client = new Client();

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([{
    name: 'HTML5 Boilerplate',
    info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name: 'AngularJS',
    info: 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name: 'Karma',
    info: 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name: 'Express',
    info: 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }]);
};

exports.generateNewToken = function(req, res) {
  oauth2.getOAuthAccessToken(
    '', {
      'grant_type': 'password',
      'username': 'dianna',
      'password': '123test',
      'scope': 'api time'
    },
    function(e, access_token, refresh_token, results) {
      res.json({
        'access_token': access_token
      });
    });
};

exports.getEmployees = function(req, res) {
  oauth2.getOAuthAccessToken(
    '', {
      'grant_type': 'password',
      'username': 'dianna',
      'password': '123test',
      'scope': 'api time'
    },
    function(e, access_token, refresh_token, results) {
      console.log(e, access_token, refresh_token, results);

      client.get('https://api.payrollhero.com/api/v2/employees?token=' + access_token, function(data, response) {
        var resultData = JSON.parse(data);
        resultData.token = access_token;
        res.json(resultData);
      });
    });
};

exports.getEmployee = function(req, res) {
  console.log(req.query.id);
  client.get('https://api.payrollhero.com/api/v2/employees/' + req.query.id + '?token=' + req.query.token, function(data, response) {
    console.log(data);
    res.json(JSON.parse(data));
  });
};

exports.clockIn = function(req, res) {
  console.log(req.query.id);

  var token = req.query.token;
  var id = req.query.id;
  var kindVal = req.query.kindVal;
  var time = Math.round(new Date().getTime() / 1000);

  var args = {
    data: {
      'token': token,
      'clocking': {
        'employee_id': id,
        'kind': kindVal,
        'client_time': time
      }
    },
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log(args);

  client.post('https://time.payrollhero.com/api/v2/clockings', args, function(data, response) {
    // parsed response body as js object
    console.log(data);
    res.json(JSON.parse(data));
    // raw response
    // console.log(response);
  });

};