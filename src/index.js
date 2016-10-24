"use strict";

const request = require('superagent')

/**
 * 9kw Captcha object constructor
 * @param api_key
 * @constructor
 */
function Captha(api_key) {
    this.API_KEY = api_key
    this.URL = "https://www.9kw.eu/index.cgi"
    this.debug = 0

    /*
     |--------------------------------------------------------------------------
     | Submit the Catpcha (Captcha usually is solved in 30s)
     |--------------------------------------------------------------------------
     */
    /**
     * Submit the captcha (Image)
     * Callback will receive err, captchaID where the captchaID is an integer
     * @param imagePath Path to the image
     * @param callback (err, captchaID)
     */
    this.submitImage = function (imagePath, callback) {
        constructUploadRequest()
            .attach("file-upload-01", imagePath)
            .end((err, response) =>
                callbackSuperAgent(err, response, callback))
    }

    /**
     * Submit the captcha (Base64)
     * Callback will receive err, captchaID where the captchaID is an integer
     * @param data Base64 string
     * @param callback (err, captchaID)
     */
    this.submitBase64 = function (data, callback) {
        const split = data.split(',')
        if (split.length > 1)
            data = split[1] //remove data:image/png;base64, if exists

        constructUploadRequest()
            .field("file-upload-01", data)
            .field('base64', 1)
            .end((err, response) =>
                callbackSuperAgent(err, response, callback))
    }

    /**
     * Submit the captcha (URL)
     * Callback will receive err, captchaID where the captchaID is an integer
     * @param url Image Url
     * @param callback (err, captchaID)
     */
    this.submitUrl = function (url, callback) {
        constructUploadRequest()
            .field("file-upload-01", url)
            .end((err, response) =>
                callbackSuperAgent(err, response, callback))
    }

    /*
     |--------------------------------------------------------------------------
     | Check if captcha is solved (with the captcha Id submited)
     |--------------------------------------------------------------------------
     */
    /**
     * Get the solution of that captcha id
     * The callback is called with err, solution
     * where solution can be a string or empty string if no solution yet
     * this method sould be called until there is a solution
     * ex: every 3 seconds
     * @param captchaID
     * @param callback (err, solution)
     */
    this.getSolution = function (captchaID, callback) {
        generalGetRequest()
            .query('action=usercaptchacorrectdata')
            .query('id=' + captchaID)
            .end((err, res) => {
                if (err) {
                    callback(err)
                    return
                }

                callback(null, res.text)
            })
    }

    /**
     * Get the captcha solution
     * Tries to get the solution before the timeout every 3 seconds
     * If timeout, callback is called with error
     * If solution, callback is called with null, solution
     * @param captchaID
     * @param timeout seconds to giveup (30 is a good number)
     * @param callback (err, solution)
     */
    this.getSolutionLoop = function(captchaID, timeout, callback) {
        const endTime = Date.now() + timeout * 1000;
        const self = this;

        let func = function(captchaID, endTime, callback) {

            // get solution
            self.getSolution(captchaID, (err, solution) => {
                if(err || solution.length == 0) { //no solution yet

                    if(endTime - Date.now() <= 0) { //time is out!
                        callback("captcha timeout")
                        return
                    }

                    // no solution yet? lets try again in 3 seconds
                    setTimeout(func, 3000, captchaID, endTime, callback)
                    return
                }

                //WOW we got a solution!
                callback(null, solution)
            });
        }

        // call first time
        func(captchaID, endTime, callback)
    }




    /*
     |--------------------------------------------------------------------------
     | Private Things
     |--------------------------------------------------------------------------
     */
    const generalGetRequest = () => request
        .get(this.URL)
        .query('apikey='+ this.API_KEY)
        .query('debug=' + this.debug)

    const constructUploadRequest = () => request
        .post(this.URL)
        .field('apikey', this.API_KEY)
        .field('action', 'usercaptchaupload')
        .field('source', 'js')
        .field('debug', this.debug)

    /**
     * Call the user callback and send an error string or
     * int with the captcha id
     * @param err
     * @param response
     * @param callback
     */
    const callbackSuperAgent = (err, response, callback) => {
        const res = response.text.trim()
        if (err || !response.ok || res.indexOf(' ') != -1) {
            callback(err ? err : res)
        } else {
            callback(null, parseInt(res))
        }
    }

}

module.exports = Captha;
