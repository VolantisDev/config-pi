var config              = require("./config.json"),
    api                 = require('./app/api');

api(config, function (error) {
    if (error) {
        console.log("ERROR: " + error);
    }
})
