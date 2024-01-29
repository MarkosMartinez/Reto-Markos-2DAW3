# LaravelPassport-PHP8.2
Ejecuta tu proyecto de laravel con passport en un contenedor de Docker

## Como usar esta imagen

#### Ejecutando un contenedor (cli):

```
docker run -it --name LaravelPassport -p 8080:8000 -v ./mi-proyecto/:/var/www/html/ markosmartinez/laravelpassport-php8.2:latest
```

- Donde pone '--name LaravelPassport', es el nombre que usara el contenedor.
- Donde pone '-p 8080:8000', el '8080', es el puerto que se usara para acceder al 8000 del contenedor de Laravel.
- Donde pone '-v ./mi-proyecto/:/var/www/html/', es la ruta donde se encuentran los ficheros del proyecto de Laravel y seguido de ':' la ruta en la que se almacenara en el contenedor.
- Donde pone ':latest', es el tag que se usara para descargar la imagen. (_latest por defecto_)

#### Ejecutando el contenedor (docker-compose.yml):
```
version: '3.5'
services:
  laravelpassport:
    image: markosmartinez/laravelpassport-php8.2
    container_name: LaravelPassport
    volumes:
      - ./mi-proyecto/:/var/www/html/
    environment:
      # Por defecto el modo utilizado es 'USAR_WORKER: 0'
      USAR_WORKER: 0
    ports:
     # Por defecto el puerto utilizado en laravel es el '8000'
      - "81:8000"
    depends_on:
      - mysql
```

- Donde pone 'container_name: LaravelPasspor', es el nombre que usara el contenedor.
- Donde pone 'volumes: - ./mi-proyecto/:/var/www/html/', es la ruta donde se encuentran los ficheros del proyecto de Laravel y seguido de ':' la ruta en la que se almacenara en el contenedor.
- Donde pone 'environment: USAR_WORKER: 0', cambia el modo de funcionamiento de 'php artisan serve' a 'php artisan schedule:work' para hacer funcionar los 'schedule's
- Donde pone 'ports: - 8080:8000', el '8080', es el puerto que se usara para acceder al 8000 del contenedor de Laravel.
(_8000 por defecto_)
- Donde pone 'depends_on: - mysql', especifica que el contenedor no se iniciara hasta que el MySQL arranque.

## Source Code (v1.4):
### Dockerfile:
```
FROM php:8.2-cli

# Instalar dependencias del sistema
RUN apt-get update && \
    apt-get install -y sudo curl libpng-dev libonig-dev libxml2-dev zip unzip

# Instalar la extensiones de PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo
WORKDIR /var/www/html

# Definir la variable del "worker" a 0 por defecto
ENV USAR_WORKER=0

# Exponer el puerto 8000
EXPOSE 8000

# Comando a ejecutar cada vez que arranca la imagen
CMD ["sh", "-c", "if [ -z \"$(ls -A /var/www/html/vendor)\" ]; then composer install --ignore-platform-reqs --no-scripts --no-plugins --no-dev --optimize-autoloader --no-interaction; else echo \"Paquetes ya instalados! Omitiendo instalacion...\"; fi && if [ $USAR_WORKER -eq 1 ]; then php artisan migrate && php artisan schedule:work; else if php artisan migrate | grep -q 'Nothing to migrate'; then php artisan serve --host=0.0.0.0 --port=8000; else php artisan passport:install --force && php artisan serve --host=0.0.0.0 --port=8000; fi; fi"]

```
