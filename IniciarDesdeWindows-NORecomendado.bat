@echo off
mkdir mysql
docker-compose up -d mysql
echo Preparando la base de datos...
timeout /t 15 /nobreak
cls
docker-compose up -d
echo Iniciado proyecto...
echo Si es la primera vez que inicias el proyecto, espera 5 minutos para que se complete la instalacion
echo Una vez haya pasado el tiempo, abre el navegador y accede desde: http://localhost:8080
echo Puedes acceder al phpMyAdmin desde: http://localhost:83 con las credenciales: sail:password
pause