<?php

use App\Http\Controllers\AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/donate', function () {
    return Inertia::render('donate');
})->name('donate');

Route::post('/donate', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'donor_name' => 'required|string|max:255',
        'donor_email' => 'required|email|max:255',
        'amount' => 'required|numeric|min:0.01',
        'currency' => 'nullable|string|max:3',
        'message' => 'nullable|string|max:1000',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    \App\Models\Donation::create($request->all());

    return back()->with('success', 'Thank you for your donation!');
})->name('donate.store');

// Admin Authentication Routes
Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

// Protected Admin Routes
Route::middleware('admin')->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin');
    })->name('admin');
});
