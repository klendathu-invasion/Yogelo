#!/bin/bash
cd /root/poke_server_$@
git checkout $@
docker-compose down
rm -f tmp/pids/server.pid
git pull -r
docker-compose up -d
