"use strict";

var app = angular.module("RpiWebConfig", []);

app.controller("AppController", ["ConfigServer", "$scope", "$location", "$timeout",
    function(ConfigServer, $scope, $location, $timeout) {
        $scope.scan_results = [];
        $scope.selected_cell = null;
        $scope.scan_running = false;
        $scope.network_passcode = "";
        $scope.show_passcode_entry_field = false;

        $scope.scan = function() {
            $scope.scan_results = [];
            $scope.selected_cell = null;
            $scope.scan_running = true;

            ConfigServer.scan_wifi().then(function(response) {
                console.log(response);

                if (response.data.status == "SUCCESS") {
                    $scope.scan_results = response.data.scan_results;
                }

                $scope.scan_running = false;
            });
        }

        $scope.change_selection = function(cell) {
            $scope.network_passcode = "";
            $scope.selected_cell = cell;
            $scope.show_passcode_entry_field = (cell != null) ? true : false;
        }

        $scope.submit_selection = function() {
            if (!$scope.selected_cell) return;

            var wifi_info = {
                wifi_ssid:      $scope.selected_cell["ssid"],
                wifi_passcode:  $scope.network_passcode,
            };

            ConfigServer.enable_wifi(wifi_info).then(function(response) {
                console.log(response.data);
            });
        }

        $scope.scan();
    }
]);

// Service to hit the config API
app.service("ConfigServer", ["$http",
    function($http) {
        return {
            scan_wifi: function() {
                return $http.get("/api/scan_wifi");
            },
            enable_wifi: function(wifi_info) {
                return $http.post("/api/enable_wifi", wifi_info);
            }
        };
    }]
);

// Show/hide/clear the password prompt
app.directive("rwcPasswordEntry", function($timeout) {
    return {
        restrict: "E",
        scope: {
            visible:  "=",
            passcode: "=",
            reset:    "&",
            submit:   "&",
        },
        replace: true,
        template: [
            "<div class='rwc-password-entry-container' ng-class='{\"hide-me\": !visible}'>",
            "    <div class='box'>",
            "         <input type = 'password' placeholder = 'Passcode...' ng-model = 'passcode' />",
            "         <div class = 'btn btn-cancel' ng-click = 'reset(null)'>Cancel</div>",
            "         <div class = 'btn btn-ok' ng-click = 'submit()'>Submit</div>",
            "    </div>",
            "</div>"
        ].join("\n"),
        link: function(scope, element, attributes) {},
    };
});
