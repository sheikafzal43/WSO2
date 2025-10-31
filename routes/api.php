<?php

use App\Http\Controllers\DonationController;
use App\Services\CurrencyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Donation API routes
Route::get('/donations', [DonationController::class, 'index']);
Route::post('/donations', [DonationController::class, 'store']);

// Currency API routes
Route::get('/currency/rates', function (CurrencyService $currencyService) {
    return response()->json($currencyService->getFormattedRates());
});
