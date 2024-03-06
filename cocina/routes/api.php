<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DishController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/orders', [OrderController::class, 'store']);

Route::post('/orders/get-ingredients', [OrderController::class, 'get_ingredients']);
Route::get('/orders/pending-orders', [OrderController::class, 'pending_orders']);
Route::get('/orders/finished-orders', [OrderController::class, 'finished_orders']);
Route::get('/dishes/available-dishes', [DishController::class, 'index']);
