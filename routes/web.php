<?php

use App\Http\Controllers\FeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PengumumanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ✅ Public Routes
Route::get('/', fn () => Inertia::render('landingpage'))->name('landingpage');
Route::get('/umkm', [FeController::class,'umkm'])->name('umkm');
Route::get('/umkm/{umkm:slug}', [FeController::class,'umkmDetail'])->name('umkm.show');
Route::get('/pengumuman', [FeController::class,'pengumuman'])->name('pengumuman');
Route::get('/pemerintah-desa', fn () => Inertia::render('pemerintahDesa'))->name('pemerintah-desa');
Route::get('/welcome', fn () => Inertia::render('welcome'))->name('home');

// ✅ Protected Routes (Login + Verified)
Route::middleware(['auth', 'verified'])->group(function () {
    
    // ✅ Admin & Superadmin Routes
    Route::middleware(['role:admin,superadmin'])->prefix('admin-desa')->name('admin-desa.')->group(function () {

        Route::get('/', fn () => Inertia::render('dashboard'))->name('dashboard'); // optional: admin homepage
        
        Route::prefix('pengumuman')->name('pengumuman.')->group(function() {
            Route::get('/',[PengumumanController::class,'index'])->name('index');
            Route::post('/',[PengumumanController::class,'store'])->name('store');
            Route::put('/{pengumuman}',[PengumumanController::class,'update'])->name('update');
            Route::delete('/{pengumuman}',[PengumumanController::class,'destroy'])->name('destroy');
        });
        
        Route::prefix('artikel')->name('artikel.')->group(function() {
            Route::get('/',[NewsController::class,'index'])->name('index');
            Route::post('/',[NewsController::class,'store'])->name('store');
            Route::post('/{artikel}',[NewsController::class,'update'])->name('update');
            Route::delete('/{artikel}',[NewsController::class,'destroy'])->name('destroy');
        });
    });

    // ✅ Warga Routes
    Route::middleware(['role:warga'])->prefix('dashboard')->name('warga.')->group(function () {
        Route::get('/', fn () => Inertia::render('dashboard'))->name('home');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
