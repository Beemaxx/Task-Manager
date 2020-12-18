#!/bin/bash
env-cmd -f ./config/dev.env 
pm2 start /Task-Manager/src/index.js