<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['order_code', 'ingredients', 'status'];

    public const PENDING = 'pending';
    public const DELIVERED = 'delivered';

    protected $casts = [
        'ingredients' => 'json',
    ];
}
