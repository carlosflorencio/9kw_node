# 9kw
This is an api wrapper for the 9kw captcha solver service. An Api Key is needed, generate using the 9kw website.

## Installation
node:

```
$ npm install 9kw
```

```
$ yarn add 9kw
```
Only tested on node cli, but could also work in the browser with browserify. Please give feedback.

## Usage

```js
const api_9kw = require('9kw')
const captcha = new api_9kw("API_KEY")

// Submit the captcha, you can also submit using an url or base64 string
// .submitUrl(url, cb) or .submitBase64(data, cb) methods
captcha.submitImage("./captcha.png", (err, captchaID) => {
    if(err) {
        console.log(err);
        return
    }

    console.log("Captcha uploaded!: " + captchaID);
})

// Get the solution of the captcha with a timeout of 40 seconds
// this means that the callback will be called when the captcha is solved
// usually is solved under 30s
captcha.getSolutionLoop(captchaID, 40, (err, solution) => {
     if(err) {
          console.log(err);
          return
      }

      console.log("Solution: " + solution);
})
```

## TODO
- Add function to check account balance
- Add function to mark the solution correct or not
- Tests

## Changelog
- 0.1.0 (17/10/2016) - First version with only submit and get captcha solution

## License

MIT