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
      'password': '123test'
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
      'password': '123test'
    },
    function(e, access_token, refresh_token, results) {
      var options = {
        host: 'https://api.payrollhero.com',
        path: '/api/v2/employees',
        method: 'GET'
      };

      console.log(access_token);

      var request = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          console.log('BODY: ' + chunk);
        });

        //   res.json({
        //   'access_token': access_token
        // });
      });
      request.write("token=" + access_token);
      request.end();
    });
};