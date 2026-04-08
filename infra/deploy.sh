#!/bin/bash
set -e

cd /var/www/green-api
git pull origin main
nginx -s reload
