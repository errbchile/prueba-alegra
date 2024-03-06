<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with('ingredient')->orderBy('id', 'desc')->get();

        return response()->json([
            'purchases' => $purchases,
        ]);
    }
}
