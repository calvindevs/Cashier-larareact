<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'amount_paid' => ['required', 'integer', 'min:1']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        $order = DB::transaction(function () use ($validated, $request) {
            $amountPaid = $validated['amount_paid'];
            $total = 0;
            foreach ($validated['items'] as $item) {
                $product = Product::where('id', $item['product_id'])->lockForUpdate()->firstOrFail();
                $productPrice = $product->price;
                $productStock = $product->stock;
                $quantity = $item['quantity'];

                if ($productStock < $quantity) {
                    throw ValidationException::withMessages([
                        'items' => "Stok produk {$product->name} tidak mencukupi."
                    ]);
                }

                $subtotal = $productPrice * $quantity;
                $total += $subtotal;
            }

            if ($amountPaid < $total) {
                throw ValidationException::withMessages([
                    'amount_paid' => "Uang pembayaran tidak mencukupi"
                ]);
            }

            $change = $amountPaid - $total;
            $order = Order::create([
                'user_id' => $request->user()->id,
                'subtotal' => $total,
                'amount_paid' => $amountPaid,
                'change' => $change
            ]);
            
            foreach ($validated['items'] as $item) {
                $product = Product::where('id', $item['product_id'])->lockForUpdate()->firstOrFail();
                $quantity = $item['quantity'];
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                ]);
                $product->decrement('stock', $quantity);
            }

            return $order;
        });

        return response()->json([
            'message' => 'Checkout berhasil',
            'data' => $order
        ], 201);
    }
}
