<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalendrierController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\PlateformeController;
use App\Http\Controllers\PublicationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Community Management
|--------------------------------------------------------------------------
|
| Toutes les routes sont préfixées par /api (config/app.php)
| Authentification : Laravel Sanctum (Bearer Token)
|
*/

// ─── Authentification (public) ────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);
});

// ─── Routes protégées (Sanctum) ───────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth — profil & déconnexion
    Route::prefix('auth')->group(function () {
        Route::get('me',     [AuthController::class, 'me']);
        Route::post('logout',[AuthController::class, 'logout']);
    });

    // ── Lecture (isolee par utilisateur dans les controllers) ──
    Route::get('plateformes', [PlateformeController::class, 'index'])->name('plateformes.index');
    Route::get('plateformes/{plateforme}', [PlateformeController::class, 'show'])->name('plateformes.show');

    Route::get('calendrier', [CalendrierController::class, 'index'])->name('calendrier.index');
    Route::get('calendrier/{calendrier}', [CalendrierController::class, 'show'])->name('calendrier.show');

    Route::get('publications', [PublicationController::class, 'index'])->name('publications.index');
    Route::get('publications/{publication}', [PublicationController::class, 'show'])->name('publications.show');
    Route::get('publications/{publication}/stats', [PublicationController::class, 'stats'])->name('publications.stats');
    Route::get('publications/{publication}/commentaires', [CommentaireController::class, 'index'])
        ->name('publications.commentaires.index');

    // Aliases anglais pour le frontend
    Route::get('platforms', [PlateformeController::class, 'index'])->name('platforms.index');
    Route::get('platforms/{plateforme}', [PlateformeController::class, 'show'])->name('platforms.show');

    Route::get('calendar', [CalendrierController::class, 'index'])->name('calendar.index');
    Route::get('calendar/{calendrier}', [CalendrierController::class, 'show'])->name('calendar.show');

    Route::get('posts', [PublicationController::class, 'index'])->name('posts.index');
    Route::get('posts/{publication}', [PublicationController::class, 'show'])->name('posts.show');
    Route::get('posts/{publication}/stats', [PublicationController::class, 'stats'])->name('posts.stats');
    Route::get('posts/{publication}/comments', [CommentaireController::class, 'index'])->name('posts.comments.index');

    // ── Plateformes (ecriture: admin) ───────────────────────
    Route::middleware('role:admin')->group(function () {
        Route::post('plateformes', [PlateformeController::class, 'store'])->name('plateformes.store');
        Route::put('plateformes/{plateforme}', [PlateformeController::class, 'update'])->name('plateformes.update');
        Route::patch('plateformes/{plateforme}', [PlateformeController::class, 'update'])->name('plateformes.patch');
        Route::delete('plateformes/{plateforme}', [PlateformeController::class, 'destroy'])->name('plateformes.destroy');
    });

    // ── Calendrier éditorial (ecriture: equipe) ─────────────
    Route::middleware('role:admin,community_manager,redacteur')->group(function () {
        Route::post('calendrier', [CalendrierController::class, 'store'])->name('calendrier.store');
        Route::put('calendrier/{calendrier}', [CalendrierController::class, 'update'])->name('calendrier.update');
        Route::patch('calendrier/{calendrier}', [CalendrierController::class, 'update'])->name('calendrier.patch');
        Route::delete('calendrier/{calendrier}', [CalendrierController::class, 'destroy'])->name('calendrier.destroy');
    });

    // ── Publications (ecriture: equipe) ─────────────────────
    Route::middleware('role:admin,community_manager,redacteur')->group(function () {
        Route::post('publications', [PublicationController::class, 'store'])->name('publications.store');
        Route::put('publications/{publication}', [PublicationController::class, 'update'])->name('publications.update');
        Route::patch('publications/{publication}', [PublicationController::class, 'update'])->name('publications.patch');
        Route::delete('publications/{publication}', [PublicationController::class, 'destroy'])->name('publications.destroy');
    });

    Route::middleware('role:admin,community_manager,redacteur')->group(function () {
        Route::post('publications/{publication}/commentaires', [CommentaireController::class, 'store'])->name('publications.commentaires.store');
        Route::patch('commentaires/{commentaire}/moderer',  [CommentaireController::class, 'moderer'])->name('commentaires.moderer');
        Route::delete('commentaires/{commentaire}',         [CommentaireController::class, 'destroy'])->name('commentaires.destroy');
        Route::get('commentaires/en-attente',               [CommentaireController::class, 'enAttente'])->name('commentaires.en-attente');
    });

});
