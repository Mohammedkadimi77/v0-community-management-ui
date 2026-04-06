<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->restrictOnDelete();
            $table->foreignId('plateforme_id')->constrained('plateformes')->restrictOnDelete();
            $table->foreignId('calendrier_id')->nullable()->constrained('calendrier_editorial')->nullOnDelete();
            $table->text('contenu');
            $table->string('url_media', 500)->nullable();
            $table->string('url_post', 500)->nullable();
            $table->enum('type_contenu', ['carrousel', 'reels', 'story', 'post_statique', 'video', 'live'])->default('post_statique');
            $table->enum('statut', ['brouillon', 'en_revision', 'approuve', 'publie', 'archive'])->default('brouillon');
            $table->json('hashtags')->nullable();
            $table->dateTime('publie_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
