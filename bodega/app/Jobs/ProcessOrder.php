<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;
use App\Models\Ingredient;
use App\Models\Purchase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;


    /**
     * Create a new job instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach ($this->order->ingredients as $ingredient_needed) {
            $this->handle_single_ingredient($ingredient_needed);
        }
        // deliver ingredients
        $this->deliver_ingredients();
    }

    private function handle_single_ingredient($ingredient_needed)
    {
        $ingredient = Ingredient::where('name', $ingredient_needed['name'])->first();

        $need_more_ingredients = $ingredient->quantity < $ingredient_needed['quantity'];
        if ($need_more_ingredients) {
            $how_much_more = $ingredient_needed['quantity'] - $ingredient->quantity;
            $this->take_ingredient_quantity($ingredient, $ingredient->quantity);
            $this->search_more_ingredient($ingredient, $how_much_more);
        } else {
            $this->take_ingredient_quantity($ingredient, $ingredient_needed['quantity']);
        }
    }

    private function take_ingredient_quantity($ingredient, $quantity)
    {
        $new_quantity = $ingredient->quantity - $quantity;
        $ingredient->quantity = $new_quantity;
        $ingredient->save();
    }

    private function search_more_ingredient($ingredient, $quantity_needed): void
    {
        $quantity_bought = $this->buy_more_ingredient($ingredient, $quantity_needed);

        $remaining = $quantity_bought - $quantity_needed;
        // update inventory
        $ingredient->quantity = $remaining;
        $ingredient->save();
    }

    private function buy_more_ingredient($ingredient, $quantity_needed)
    {
        $quantity_bought = 0;
        while ($quantity_bought < $quantity_needed) {
            $url = env('API_MARKET_URL') . "?ingredient={$ingredient->name}";

            $response = Http::withHeaders([
                'Accept' => 'application/json',
            ])->get($url);

            if ($response->successful()) {

                if ($response['quantitySold'] < 1) {
                    continue;
                }

                $quantity_bought += $response['quantitySold'];
                $this->register_purchase($ingredient, $response['quantitySold']);
            }
        }
        return $quantity_bought;
    }

    private function register_purchase($ingredient, $quantity_bought)
    {
        $purchase = new Purchase();
        $purchase->ingredient_id = $ingredient->id;
        $purchase->quantity = $quantity_bought;
        $purchase->save();
    }

    private function deliver_ingredients()
    {
        $body = [
            'order_code' => $this->order->order_code,
            'ingredients' => $this->order->ingredients,
        ];
        Log::info($body);
        $url = env('API_COCINA_URL') . '/api/orders/get-ingredients';
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->post($url, $body);

        Log::info($response->json());
        $this->order->status = Order::DELIVERED;
        $this->order->save();
        Log::info("order delivered and finished");
    }
}
