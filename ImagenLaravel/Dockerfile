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

# Exponer el puerto 8000
EXPOSE 8000

# Comando para hacer la instalacion, el migrate, crear el cliente e iniciar el servicio de Laravel
CMD ["sh", "-c", "if [ -z \"$(ls -A /var/www/html/vendor)\" ]; then composer install --ignore-platform-reqs --no-scripts --no-plugins --no-dev --optimize-autoloader --no-interaction; else echo \"Paquetes ya instalados! Omitiendo instalacion...\"; fi && if php artisan migrate | grep -q 'Nothing to migrate'; then php artisan serve --host=0.0.0.0 --port=8000; else php artisan passport:install --force && php artisan serve --host=0.0.0.0 --port=8000; fi"]
