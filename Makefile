setup:
	docker-compose build
	docker-compose up -d

run:
	docker-compose exec cocina php artisan migrate:fresh --seed
	docker-compose exec bodega php artisan migrate:fresh --seed
	docker-compose exec -d bodega php artisan queue:work
	

	

