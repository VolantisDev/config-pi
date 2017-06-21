var config = require("./config.json"),
    path = require("path"),
    util = require("util"),
    iwlist = require("./iwlist"),
    wifi_manager = require("./wifi_manager")()
    express = require("express"),
    bodyParser = require('body-parser');

var app = express();

// Configure the app
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", true);

// Setup static routes to public assets
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Setup HTTP routes for rendering views
app.get("/", function (request, response) {
    response.render("index");
});

// Setup HTTP routes for various APIs we wish to implement
app.get("/api/scan_wifi", function (request, response) {
    wifi_manager.scan_networks(function (error, result) {
        if (error) {
            console.log("ERROR: " + error);
            response.send({ status: "ERROR", error: error });
        } else {
            success_obj = result[0] || {};
            success_obj["status"] = "SUCCESS";
            response.send(success_obj);
        }
    
        response.end();
    });
});

app.post("/api/enable_wifi", function(request, response) {
    var conn_info = {
        wifi_ssid:      request.body.wifi_ssid,
        wifi_passcode:  request.body.wifi_passcode,
    };

    wifi_manager.enable_wifi(conn_info, function(error) {
        if (error) {
            console.log("Enable Wifi ERROR: " + error);
            response.redirect("/");
        }
        // Success! - exit
        console.log("Wifi Enabled!");
    });
});

// Listen on our server
app.listen(config.server.port);
