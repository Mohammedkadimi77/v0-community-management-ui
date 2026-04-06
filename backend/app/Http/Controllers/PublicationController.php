<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicationController extends Controller
{
    private function rolePeutVoirTout(?string $role): bool
    {
        return in_array($role, ['admin', 'community_manager'], true);
    }

    private function rolePeutVoirPublication(Request $request, Publication $publication): bool
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        if ($this->rolePeutVoirTout($role)) {
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

    public function index(Request $request): JsonResponse
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        $query = Publication::with(['utilisateur', 'plateforme'])
            ->latest();

        if (! $this->rolePeutVoirTout($role) && $role === 'redacteur') {
            $query->where('utilisateur_id', $utilisateur->id);
        }

        if ($role === 'lecteur') {
            $query->where(function ($subQuery) use ($utilisateur) {
                $subQuery->where('utilisateur_id', $utilisateur->id)
                    ->orWhereIn('statut', ['approuve', 'publie', 'archive']);
            });
        }

        if ($request->filled('plateforme_id')) {
            $query->parPlateforme($request->plateforme_id);
        }

        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->filled('type_contenu')) {
            $query->parType($request->type_contenu);
        }

        $publications = $query->paginate(15);

        return response()->json($publications);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'plateforme_id'  => 'required|exists:plateformes,id',
            'calendrier_id'  => 'nullable|exists:calendrier_editorial,id',
            'contenu'        => 'required|string',
            'url_media'      => 'nullable|url|max:500',
            'url_post'       => 'nullable|url|max:500',
            'type_contenu'   => 'required|in:carrousel,reels,story,post_statique,video,live',
            'statut'         => 'sometimes|in:brouillon,en_revision,approuve,publie,archive',
            'hashtags'       => 'nullable|array',
            'hashtags.*'     => 'string|max:100',
            'publie_le'      => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $publication = Publication::create([
            ...$validated,
            'utilisateur_id' => $request->user()->id,
        ]);

        return response()->json(
            $publication->load(['utilisateur', 'plateforme']),
            201
        );
    }

    public function show(Publication $publication): JsonResponse
    {
        if (! $this->rolePeutVoirPublication(request(), $publication)) {
            abort(403, 'Acces non autorise a cette publication.');
        }

        $publication->load(['utilisateur', 'plateforme', 'commentaires.reponses', 'calendrier']);

        return response()->json([
            'publication'      => $publication,
            'stats' => [
                'nb_likes'         => $publication->nb_likes,
                'nb_vues'          => $publication->nb_vues,
                'taux_engagement'  => $publication->taux_engagement,
                'nb_commentaires'  => $publication->commentaires()->approuves()->count(),
            ],
        ]);
    }

    public function update(Request $request, Publication $publication): JsonResponse
    {
        $this->authorize('update', $publication);

        $validator = Validator::make($request->all(), [
            'contenu'       => 'sometimes|string',
            'url_media'     => 'nullable|url|max:500',
            'url_post'      => 'nullable|url|max:500',
            'type_contenu'  => 'sometimes|in:carrousel,reels,story,post_statique,video,live',
            'statut'        => 'sometimes|in:brouillon,en_revision,approuve,publie,archive',
            'hashtags'      => 'nullable|array',
            'hashtags.*'    => 'string|max:100',
            'publie_le'     => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $publication->update($validated);

        return response()->json($publication->load(['utilisateur', 'plateforme']));
    }

    public function destroy(Publication $publication): JsonResponse
    {
        $this->authorize('delete', $publication);

        $publication->delete();

        return response()->json(['message' => 'Publication supprimée.']);
    }

    public function stats(Publication $publication): JsonResponse
    {
        if (! $this->rolePeutVoirPublication(request(), $publication)) {
            abort(403, 'Acces non autorise aux statistiques de cette publication.');
        }

        $interactions = $publication->interactions()
            ->selectRaw('type_interaction, SUM(valeur) as total')
            ->groupBy('type_interaction')
            ->pluck('total', 'type_interaction');

        return response()->json([
            'publication_id'  => $publication->id,
            'likes'           => $interactions['like'] ?? 0,
            'partages'        => $interactions['partage'] ?? 0,
            'sauvegardes'     => $interactions['sauvegarde'] ?? 0,
            'clics_lien'      => $interactions['clic_lien'] ?? 0,
            'vues'            => $interactions['vue'] ?? 0,
            'reactions'       => $interactions['reaction'] ?? 0,
            'nb_commentaires' => $publication->commentaires()->approuves()->count(),
            'taux_engagement' => $publication->taux_engagement,
        ]);
    }
}
