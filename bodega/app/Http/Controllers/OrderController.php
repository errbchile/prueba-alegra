<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Purchase;
use App\Models\Ingredient;
use App\Jobs\ProcessOrder;


class OrderController extends Controller
{
    public function create(Request $request)
    {
        $ingredient_names = ['tomato', 'lemon', 'potato', 'rice', 'ketchup', 'lettuce', 'onion', 'cheese', 'meat', 'chicken'];

        $request->validate([
            'order_code' => 'required',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.name' => ['required', 'string', 'in:' . implode(',', $ingredient_names)],
            'ingredients.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'order_code' => $request->order_code,
            'ingredients' => $request->ingredients,
            'status' => Order::PENDING,
        ]);

        ProcessOrder::dispatch($order);

        return response()->json([
            'message' => "order received",
            'order' => $order->id
        ], 201);
    }

    public function get_statistics()
    {
        $total_available = [];
        $ingredient_names = ['tomato', 'lemon', 'potato', 'rice', 'ketchup', 'lettuce', 'onion', 'cheese', 'meat', 'chicken'];
        foreach ($ingredient_names as $index => $ingredient_name) {
            $ingredient = Ingredient::where('name', $ingredient_name)->first();
            $total_available[$index] = [];
            $total_available[$index]['id'] = $ingredient->id;
            $total_available[$index]['name'] = $ingredient_name;
            $total_available[$index]['total_available'] = Ingredient::where('name', $ingredient_name)->sum('quantity');
            $total_available[$index]['total_bought'] = Purchase::where('ingredient_id', $ingredient->id)->sum('quantity');
        }

        $total_used_ingredients = Purchase::sum('quantity');
        $total_ingredients_in_inventory = Ingredient::sum('quantity');

        return response()->json([
            'total_used_ingredients' => $total_used_ingredients,
            'total_ingredients_in_inventory' => $total_ingredients_in_inventory,
            'total_available' => $total_available,
        ]);
    }
}
