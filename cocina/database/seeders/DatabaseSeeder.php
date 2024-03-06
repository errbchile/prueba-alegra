<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dish;
use App\Models\Ingredient;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $dish_names = [
            'Lasagna',
            'Spaghetti Carbonara',
            'Chicken Alfredo',
            'Margherita Pizza',
            'Caesar Salad',
            'Beef Tacos'
        ];

        foreach ($dish_names as $dish_name) {
            $dish = Dish::create(['name' => $dish_name]);
        }

        $dishes = Dish::all();

        $ingredient_names = [
            'tomato',
            'lemon',
            'potato',
            'rice',
            'ketchup',
            'lettuce',
            'onion',
            'cheese',
            'meat',
            'chicken'
        ];
        // Acá nos aseguramos de que los diez ingredientes sean 
        // usados en al menos una receta
        foreach ($ingredient_names as $name) {
            $ingredient = Ingredient::create(['name' => $name]);

            $random_dish = $dishes->random();
            $random_dish->ingredients()->attach($ingredient, ['quantity' => rand(1, 10)]);
        }

        // Acá nos aseguramos de que no hayan recetas vacias y 
        // Que los ingredientes no se dupliquen en una misma receta
        foreach ($dishes as $dish) {
            $not_duplicated_ingredients = Ingredient::whereNotIn('id', $dish->ingredients->pluck('id'))->get();

            $random_ingredient = $not_duplicated_ingredients->random();

            $dish->ingredients()->attach($random_ingredient, ['quantity' => rand(1, 10)]);
        }
    }
}
