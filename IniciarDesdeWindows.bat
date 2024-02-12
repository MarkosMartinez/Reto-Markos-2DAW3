@echo off
mkdir mysql
docker-compose up -d mysql
timeout /t 15 /nobreak
docker-compose up -d
