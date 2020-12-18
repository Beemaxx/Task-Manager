#!/bin/bash
env-cmd -f ./config/dev.env
pm2 start /node-weather-website/src/index.js