#!/bin/bash


cd /Task-Manager

sudo apt-get update
sudo apt install nodejs
sudo apt install npm

npm init
npm install express
npm install pm2 -g