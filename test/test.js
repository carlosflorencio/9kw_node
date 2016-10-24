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
    });

})

