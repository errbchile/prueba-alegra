build:
	docker-compose build
	docker-compose up -d

setup:
	docker-compose exec cocina composer install
	docker-compose exec cocina php artisan key:generate
	docker-compose exec bodega composer install
	docker-compose exec bodega php artisan key:generate
	docker-compose exec frontend npm install
	docker-compose exec cocina php artisan migrate:fresh --seed
	docker-compose exec bodega php artisan migrate:fresh --seed
	docker-compose exec -d bodega php artisan queue:work

freshrun:
	docker-compose exec cocina php artisan migrate:fresh --seed
	docker-compose exec bodega php artisan migrate:fresh --seed
	docker-compose exec -d bodega php artisan queue:work

run:
	docker-compose exec cocina php artisan migrate
	docker-compose exec bodega php artisan migrate
	docker-compose exec -d bodega php artisan queue:work