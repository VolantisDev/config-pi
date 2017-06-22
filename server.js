var path = require('path'),
    wifi_manager = require('wifi-manager')
    express = require('express'),
    bodyParser = require('body-parser'),
    flatconfig = require('flatconfig');

var config = flatconfig.load(
    path.resolve(__dirname, 'config.json'),
    path.resolve(process.cwd(), '/etc/rpi-web-config/config')
);

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", true);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/api/scan_wifi", function (request, response) {
    wifi_manager.get_wifi_interface(function (error, wifi_interface) {
        wifi_manager.scan_networks(wifi_interface, function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                response.send({ status: "ERROR", error: error });
            } else {
                result["status"] = "SUCCESS";
                response.send(result);
            }
        
            response.end();
        });
    });
});

app.post("/api/enable_wifi", function(request, response) {
    var connection_info = {
        wifi_ssid:      request.body.wifi_ssid,
        wifi_passcode:  request.body.wifi_passcode,
    };

    wifi_manager.enable_wifi(connection_info, function(error) {
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
