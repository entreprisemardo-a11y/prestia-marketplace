<?php

use Illuminate\Support\Facades\Route;

// Redirige toutes les requêtes web vers l'application React
// C'est React Router qui s'occupera d'afficher la bonne page
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
