#!/bin/bash
set -e

sudo git -C /var/www/green-api pull origin main
sudo nginx -s reload
