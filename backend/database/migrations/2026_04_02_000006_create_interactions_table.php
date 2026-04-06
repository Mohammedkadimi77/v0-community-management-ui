<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publication_id')->constrained('publications')->cascadeOnDelete();
            $table->foreignId('utilisateur_id')->nullable()->constrained('utilisateurs')->nullOnDelete();
            $table->enum('type_interaction', ['like', 'partage', 'sauvegarde', 'clic_lien', 'vue', 'reaction']);
            $table->integer('valeur')->default(1);
            $table->timestamps();

            $table->index('publication_id');
            $table->index('type_interaction');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interactions');
    }
};
