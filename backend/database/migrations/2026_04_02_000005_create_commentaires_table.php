<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commentaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publication_id')->constrained('publications')->cascadeOnDelete();
            $table->foreignId('utilisateur_id')->nullable()->constrained('utilisateurs')->nullOnDelete();
            $table->string('auteur_externe', 150)->nullable();
            $table->text('contenu');
            $table->foreignId('parent_id')->nullable()->constrained('commentaires')->nullOnDelete();
            $table->enum('statut', ['en_attente', 'approuve', 'masque', 'signale', 'supprime'])->default('en_attente');
            $table->enum('sentiment', ['positif', 'neutre', 'negatif'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commentaires');
    }
};
