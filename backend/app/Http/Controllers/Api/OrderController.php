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

        $merged = [];
        foreach($validated['items'] as $item){
            $productId = $item['product_id'];
            $quantity =  $item['quantity'];
            if(isset($merged[$productId])){
                $merged[$productId]['quantity'] += $quantity;
            }else{
                $merged[$productId] = [
                    'quantity' => $quantity
                ];
            }
        }

        $order = DB::transaction(function () use ($validated, $request, $merged) {
            $amountPaid = $validated['amount_paid'];
            $total = 0;
            $products = [];
            foreach ($merged as $productId => $item) {
                $product = Product::where('id', $productId)->lockForUpdate()->firstOrFail();
                $quantity = $item['quantity'];

                if ($product->stock < $quantity) {
                    throw ValidationException::withMessages([
                        'items' => "Stok produk {$product->name} tidak mencukupi."
                    ]);
                }

                $subtotal = $product->price * $quantity;
                $total += $subtotal;

                $products[$productId] = $product;
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

            foreach ($merged as $productId => $item) {
                $product = Product::where('id', $productId)->lockForUpdate()->firstOrFail();
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

        $order->load("orderDetails.product");

        return response()->json([
            'message' => 'Checkout berhasil',
            'data' => $order
        ], 201);
    }
}
