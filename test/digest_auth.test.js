/**!
 * urllib - test/digest_auth.test.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var should = require('should');
var urllib = require('../');

describe('digest_auth.test.js', function () {
  it('should request with digest auth success in webdav', function (done) {
    var url = 'http://test.webdav.org/auth-digest/user3';
    urllib.request(url, {
      digestAuth: 'user3:user3',
    }, function (err, data, res) {
      should.not.exist(err);
      res.should.status(404);
      data = data.toString();
      data.should.containEql('<p>The requested URL /auth-digest/user3 was not found on this server.</p>');
      done();
    });
  });

  it('should request with digest auth fail in webdav', function (done) {
    var url = 'http://test.webdav.org/auth-digest/user3';
    urllib.request(url, {
      digestAuth: 'user3:fail',
    }, function (err, data, res) {
      should.not.exist(err);
      res.should.status(401);
      res.should.have.header('www-authenticate');
      data = data.toString();
      data.should.containEql('401 Authorization Required');
      done();
    });
  });

  it('should request with digest auth success in httpbin', function (done) {
    var url = 'http://httpbin.org/digest-auth/auth/user/passwd';
    urllib.request(url, {
      digestAuth: 'user:passwd',
      dataType: 'json',
    }, function (err, data, res) {
      should.not.exist(err);
      res.should.status(200);
      data.should.eql({
        user: "user",
        authenticated: true
      });
      done();
    });
  });
});
