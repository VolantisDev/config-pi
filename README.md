# rpi-web-config

A Node application which makes connecting your SoC to your wifi network easier.

These directions are for Archlinux but can be adapted to other OSes.

## Requirements

- Archlinux (or adapt these instructions for your OS)

## Install

```sh
$sudo pacman -Sy bower
$sudo mkdir -p /opt/rpi-web-config
$cd /opt/rpi-web-config
$sudo git clone https://github.com/bmcclure/node-rpi-web-config.git .
$npm update
$bower install
$sudo npm start
```

## Configuration

Create a file at /etc/rpi-web-config/config in the format:

```ini
# a comment
server.port=8888
# another comment
wifi_interface=wlan0
```

## Usage

```sh
$cd /opt/rpi-web-config
$sudo node server.js < /dev/null &
```
