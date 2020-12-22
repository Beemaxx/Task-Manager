#!/bin/bash


cd /Task-Manager


yum apt-get update
yum apt install nodejs
yum apt install npm

npm init
npm install express
npm install pm2 -g