<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Commentaire;
use App\Models\Publication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentaireController extends Controller
{
    private function rolePeutVoirPublication(Request $request, Publication $publication): bool
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        if (in_array($role, ['admin', 'community_manager'], true)) {
            return true;
        }

        if ($role === 'redacteur') {
            return $publication->utilisateur_id === $utilisateur->id;
        }

        if ($role === 'lecteur') {
            if ($publication->utilisateur_id === $utilisateur->id) {
                return true;
            }

            return in_array($publication->statut, ['approuve', 'publie', 'archive'], true);
        }

        return false;
    }

    public function index(Request $request, Publication $publication): JsonResponse
    {
        if (! $this->rolePeutVoirPublication($request, $publication)) {
            abort(403, 'Acces non autorise aux commentaires de cette publication.');
        }

        $query = $publication->commentaires()
            ->with(['utilisateur', 'reponses.utilisateur'])
            ->racines()
            ->latest();

        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->filled('sentiment')) {
            $query->parSentiment($request->sentiment);
        }

        return response()->json($query->paginate(20));
    }

    public function store(Request $request, Publication $publication): JsonResponse
    {
        if (! $this->rolePeutVoirPublication($request, $publication)) {
            abort(403, 'Acces non autorise pour commenter cette publication.');
        }

        $validator = Validator::make($request->all(), [
            'contenu'         => 'required|string|max:2000',
            'auteur_externe'  => 'nullable|string|max:150',
            'parent_id'       => 'nullable|exists:commentaires,id',
            'sentiment'       => 'nullable|in:positif,neutre,negatif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $commentaire = $publication->commentaires()->create([
            ...$validated,
            'utilisateur_id' => $request->user()?->id,
        ]);

        return response()->json($commentaire->load('utilisateur'), 201);
    }

    public function moderer(Request $request, Commentaire $commentaire): JsonResponse
    {
        $utilisateur = $request->user();
        if (
            $utilisateur
            && ! in_array($utilisateur->role, ['admin', 'community_manager'], true)
            && $commentaire->publication
            && $commentaire->publication->utilisateur_id !== $utilisateur->id
        ) {
            abort(403, 'Acces non autorise pour moderer ce commentaire.');
        }

        $validator = Validator::make($request->all(), [
            'statut'    => 'required|in:approuve,masque,signale,supprime',
            'sentiment' => 'nullable|in:positif,neutre,negatif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $commentaire->update($validator->validated());

        return response()->json($commentaire);
    }

    public function enAttente(): JsonResponse
    {
        $utilisateur = request()->user();

        $commentaires = Commentaire::enAttente()
            ->with(['publication.plateforme', 'utilisateur'])
            ->latest();

        if ($utilisateur && $utilisateur->role !== 'admin') {
            if ($utilisateur->role === 'community_manager') {
                $commentaires = $commentaires->paginate(20);

                return response()->json($commentaires);
            }

            $commentaires->whereHas('publication', function ($query) use ($utilisateur) {
                $query->where('utilisateur_id', $utilisateur->id);
            });
        }

        $commentaires = $commentaires->paginate(20);

        return response()->json($commentaires);
    }

    public function destroy(Commentaire $commentaire): JsonResponse
    {
        $utilisateur = request()->user();
        if (
            $utilisateur
            && ! in_array($utilisateur->role, ['admin', 'community_manager'], true)
            && $commentaire->publication
            && $commentaire->publication->utilisateur_id !== $utilisateur->id
        ) {
            abort(403, 'Acces non autorise pour supprimer ce commentaire.');
        }

        $commentaire->update(['statut' => 'supprime']);

        return response()->json(['message' => 'Commentaire supprimé.']);
    }
}
