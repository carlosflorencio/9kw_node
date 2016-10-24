var assert = require('assert'),
    api_9kw = require('../src/index'),
    config = require('./config');

describe("Captcha", function () {
    this.timeout(0); // disable mocha timeout

    var captcha = null

    before(function () {
        captcha = new api_9kw(config.api)
        captcha.debug = 1
    })

    describe('Submit API', function() {

        describe('#submitImage()', function() {
            it('with valid image provided', function(done) {
                captcha.submitImage('./test/captcha.png', function (err, captchaID) {
                    assert(err === null, err)
                    assert(typeof captchaID === 'number')
                    done()
                })
            });
        });

        describe('#submitBase64()', function() {
            it('with valid base64 provided', function(done) {
                captcha.submitBase64(config.image_base64, function (err, captchaID) {
                    assert(err === null, err)
                    assert(typeof captchaID === 'number')
                    done()
                })
            });
        });

        describe('#submitUrl()', function() {
            it('with valid image url provided', function(done) {
                captcha.submitUrl(config.image_url, function (err, captchaID) {
                    assert(err === null, err)
                    assert(typeof captchaID === 'number')
                    done()
                })
            });
        });

        describe('#getSolution()', function () {
            it('valid debug captcha id should run without problems', function (done) {
                captcha.getSolution('11111111', function (err, solution) {
                    done(err)
                });
            })
        })

        describe('#getSolutionLoop()', function () {
            it('should run without problems with a valid debug captcha id', function (done) {
                captcha.getSolutionLoop('11111111', 40, function (err, solution) {
                    done(err)
                });
            })
        })

        describe('#isCorrect()', function () {
            it('should send the captcha feedback without problemas', function (done) {
                captcha.isCorrect('11111111',true, function (err, res) {
                    assert(err === null, err)
                    assert(res === 'OK', res)
                    done()
                });
            })
        })
    });

    describe('General API', function () {

        describe('#serverCheck()', function () {
            it('should get the server info without problems', function (done) {
                captcha.serverCheck(function (err, res) {
                    done(err)
                });
            })
        })

        describe('#getBalance()', function () {
            it('should get the account balance', function (done) {
                captcha.getBalance(function (err, res) {
                    done(err)
                });
            })
        })

    })

})

