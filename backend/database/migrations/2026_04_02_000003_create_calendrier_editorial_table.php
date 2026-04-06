<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendrier_editorial', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('utilisateurs')->restrictOnDelete();
            $table->foreignId('plateforme_id')->constrained('plateformes')->restrictOnDelete();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->string('theme', 150)->nullable();
            $table->enum('type_contenu', ['carrousel', 'reels', 'story', 'post_statique', 'video', 'live'])->default('post_statique');
            $table->date('date_publication');
            $table->time('heure_publication')->default('09:00:00');
            $table->enum('statut', ['idee', 'en_cours', 'valide', 'programme', 'publie', 'annule'])->default('idee');
            $table->text('notes_internes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendrier_editorial');
    }
};
