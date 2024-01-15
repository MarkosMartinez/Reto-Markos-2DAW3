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

