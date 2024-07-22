#!/bin/bash
cd /home/docker_klendathu/Yogelo
docker-compose down
rm -f tmp/pids/server.pid
git pull -r
docker-compose up -d
