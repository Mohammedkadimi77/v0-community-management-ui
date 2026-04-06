<?php

namespace Tests\Feature\Api;

use App\Models\Plateforme;
use App\Models\Publication;
use App\Models\Utilisateur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CommunityManagementApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_publication_store_returns_json_422_on_invalid_payload(): void
    {
        $user = $this->makeUser();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/publications', [
            'type_contenu' => 'invalid',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors'])
            ->assertJsonPath('message', 'Les donnees sont invalides.');
    }

    public function test_publication_update_is_forbidden_for_non_owner(): void
    {
        $owner = $this->makeUser('owner@example.com');
        $otherUser = $this->makeUser('other@example.com');
        $plateforme = $this->makePlateforme();

        $publication = Publication::create([
            'utilisateur_id' => $owner->id,
            'plateforme_id' => $plateforme->id,
            'contenu' => 'Contenu initial',
            'type_contenu' => 'post_statique',
        ]);

        Sanctum::actingAs($otherUser);

        $this->patchJson("/api/publications/{$publication->id}", [
            'contenu' => 'Tentative de modification',
        ])->assertForbidden();
    }

    public function test_commentaire_store_and_moderer_validation_flow(): void
    {
        $user = $this->makeUser();
        $plateforme = $this->makePlateforme();
        $publication = Publication::create([
            'utilisateur_id' => $user->id,
            'plateforme_id' => $plateforme->id,
            'contenu' => 'Publication test',
            'type_contenu' => 'post_statique',
        ]);

        Sanctum::actingAs($user);

        $commentaireResponse = $this->postJson("/api/publications/{$publication->id}/commentaires", [
            'contenu' => 'Super publication',
            'sentiment' => 'positif',
        ]);

        $commentaireResponse->assertCreated();

        $commentaireId = $commentaireResponse->json('id');

        $this->patchJson("/api/commentaires/{$commentaireId}/moderer", [
            'statut' => 'invalide',
        ])
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors'])
            ->assertJsonPath('message', 'Les donnees sont invalides.');

        $this->assertDatabaseHas('commentaires', [
            'id' => $commentaireId,
            'contenu' => 'Super publication',
            'statut' => 'en_attente',
        ]);
    }

    private function makeUser(string $email = 'test@example.com', string $role = 'community_manager'): Utilisateur
    {
        return Utilisateur::create([
            'nom' => 'Test',
            'prenom' => 'User',
            'email' => $email,
            'mot_de_passe' => Hash::make('password123'),
            'role' => $role,
            'actif' => true,
        ]);
    }

    private function makePlateforme(): Plateforme
    {
        return Plateforme::create([
            'nom' => 'Instagram',
            'slug' => 'instagram',
            'url_base' => 'https://www.instagram.com',
            'couleur_hex' => '#E1306C',
            'actif' => true,
        ]);
    }
}
