#!/bin/bash

if ! command -v docker &> /dev/null; then
    echo "Docker no está instalado! Instálalo para poder continuar."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "Git no está instalado! Instálalo para poder continuar."
    exit 1
fi

git clone --recurse-submodules https://github.com/MarkosMartinez/Reto-Markos-2DAW3.git /home/$USER/Reto-Markos-2DAW3

cd /home/$USER/Reto-Markos-2DAW3
docker-compose up -d mysql

echo 'Preparando la base de datos...'
sleep 10

docker-compose up -d
sleep 5

echo 'La aplicacion esta lista para usarse en http://localhost:8080'