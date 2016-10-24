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

**NOTE: All methods are asynchronous. Use the callbacks correctly.** 

## Methods

```js
const api_9kw = require('9kw')
const captcha = new api_9kw("API_KEY")

// Submit the captcha, you can also submit using an url or base64 string
// .submitUrl(url, cb) or .submitBase64(data, cb) methods
captcha.submitImage("./captcha.png", (err, newID) => {
    if(err) {
        console.log(err);
        return
    }
	
    console.log("Captcha uploaded!: " + captchaID);
    // Next step is to get the solution of the uploaded captcha using the new captchaID
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

// Tell 9kw the solution was correct or not
captcha.isCorrect(captchaID, true)

// Get the 9kw server check info
captcha.serverCheck((err, serverInfo) => {
	console.log(serverInfo)
});

// Get your account balance (credits)
captcha.getBalance((err, balance) => {
	console.log(balance)
});
```

## Changelog
- 0.1.3 (24/10/2016) - Added isCorrect, serverCheck and getBalance methods
- 0.1.2 (24/10/2016) - Started tests
- 0.1.0 (17/10/2016) - First version with only submit and get captcha solution

## License

MIT