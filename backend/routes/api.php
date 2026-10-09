<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum', 'role:admin']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/products', [ProductController::class, 'index'])->middleware('auth:sanctum');
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::resource('/products', ProductController::class)->except(['create', 'edit', 'index', 'show']);
    Route::post('/products/{product}/restock', [ProductController::class, 'restock']);
});

// Route::middleware('role:cashier')->group(function () {
    
// });