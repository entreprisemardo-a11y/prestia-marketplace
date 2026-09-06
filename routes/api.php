<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Domains\Auth\Controllers\AuthController;
use App\Domains\Marketplace\Controllers\ServiceController;
use App\Domains\Marketplace\Controllers\SearchController;
use App\Domains\Communication\Controllers\ChatController;
use App\Domains\Orders\Controllers\OrderController;
use App\Domains\Users\Controllers\KycController;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Routes protégées par Sanctum (nécessitent un token valide)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
    Route::get('/conversations/{conversation}/messages', [ChatController::class, 'index']);
    Route::post('/conversations/{conversation}/messages', [ChatController::class, 'store']);
    Route::post('/services/{service}/orders', [OrderController::class, 'store']);
    Route::patch('/orders/{order}/transition', [OrderController::class, 'transition']);
});

// Moteur de recherche (Public : les clients n'ont pas besoin d'être connectés pour chercher)
Route::get('/services/search', [SearchController::class, 'search']);
// Routes Prestataires (Protégées)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/kyc/upload', [KycController::class, 'upload']);
    Route::get('/provider/services', [ServiceController::class, 'myServices']);
    Route::post('/provider/services', [ServiceController::class, 'store']);
    Route::patch('/provider/services/{service}/toggle-status', [ServiceController::class, 'toggleStatus']);
});