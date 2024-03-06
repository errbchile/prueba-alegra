# imagen de dockerhub que descargara
FROM php:8.3-fpm-alpine

# algunas configuraciones para que funcione el contenedor
RUN docker-php-ext-install pdo pdo_mysql

# instala composer en el contenedor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# da permisos para editar los archivos en esta ruta del container
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www