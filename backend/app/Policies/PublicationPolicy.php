<?php

namespace App\Policies;

use App\Models\Publication;
use App\Models\Utilisateur;

class PublicationPolicy
{
    public function update(Utilisateur $utilisateur, Publication $publication): bool
    {
        if (in_array($utilisateur->role, ['admin', 'community_manager'], true)) {
            return true;
        }

        return $utilisateur->id === $publication->utilisateur_id;
    }

    public function delete(Utilisateur $utilisateur, Publication $publication): bool
    {
        if (in_array($utilisateur->role, ['admin', 'community_manager'], true)) {
            return true;
        }

        return $utilisateur->id === $publication->utilisateur_id;
    }
}
