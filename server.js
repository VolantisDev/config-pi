var path = require('path'),
    wifi_manager = require('wifi-manager')
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    flatconfig = require('flatconfig'),
    hostnamectl = require('hostnamectl');

var configFilePath = '/etc/rpi-web-config/config';
var config = flatconfig.load(
    path.resolve(__dirname, 'config.json')
);
if (fs.existsSync(configFilePath)) {
    flatconfig.join.ini(config, configFilePath);
}

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", true);

app.use('/static', express.static(path.join(__dirname, "public")));
app.use('/static/angular', express.static(require.resolve('angular')));
app.use('/static/font-awesome', express.static(require.resolve('components-font-awesome')));
app.use(bodyParser.json());

app.get("/", function (request, response) {
    response.render("index");
});

app.post("/api/set_hostname", function (request, respoonse) {
    hostnamectl.set_hostname(request.body.hostname, function (error) {
        if (error) {
            console.log("ERROR setting hostname: " + error);
            response.redirect("/");
        }

        console.log("Hostname set successfully.");
    })
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

app.post("/api/enable_wifi", function (request, response) {
    var connection_info = {
        wifi_ssid: request.body.wifi_ssid,
        wifi_passcode: request.body.wifi_passcode,
    };

    wifi_manager.enable_wifi(connection_info, function(error) {
        if (error) {
            console.log("Enable Wifi ERROR: " + error);
            response.redirect("/");
        }
        
        console.log("Wifi enabled successfully.");
    });
});

// Listen on our server
app.listen(config.server.port, config.server.ip);
