<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CalendrierEditorial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CalendrierController extends Controller
{
    private function rolePeutVoirTout(?string $role): bool
    {
        return in_array($role, ['admin', 'community_manager'], true);
    }

    private function rolePeutVoirCalendrier(Request $request, CalendrierEditorial $calendrier): bool
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        if ($this->rolePeutVoirTout($role)) {
            return true;
        }

        if ($role === 'redacteur') {
            return $calendrier->utilisateur_id === $utilisateur->id;
        }

        if ($role === 'lecteur') {
            if ($calendrier->utilisateur_id === $utilisateur->id) {
                return true;
            }

            return in_array($calendrier->statut, ['valide', 'programme', 'publie'], true);
        }

        return false;
    }

    private function rolePeutModifierCalendrier(Request $request, CalendrierEditorial $calendrier): bool
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        if ($this->rolePeutVoirTout($role)) {
            return true;
        }

        return $role === 'redacteur' && $calendrier->utilisateur_id === $utilisateur->id;
    }

    public function index(Request $request): JsonResponse
    {
        $utilisateur = $request->user();
        $role = $utilisateur?->role;

        $query = CalendrierEditorial::with(['utilisateur', 'plateforme', 'publication'])
            ->orderBy('date_publication')
            ->orderBy('heure_publication');

        if (! $this->rolePeutVoirTout($role) && $role === 'redacteur') {
            $query->where('utilisateur_id', $utilisateur->id);
        }

        if ($role === 'lecteur') {
            $query->where(function ($subQuery) use ($utilisateur) {
                $subQuery->where('utilisateur_id', $utilisateur->id)
                    ->orWhereIn('statut', ['valide', 'programme', 'publie']);
            });
        }

        if ($request->filled('plateforme_id')) {
            $query->parPlateforme($request->plateforme_id);
        }

        if ($request->filled('statut')) {
            $query->parStatut($request->statut);
        }

        if ($request->boolean('a_venir')) {
            $query->aVenir();
        }

        if ($request->boolean('prochains_30j')) {
            $query->prochains30Jours();
        }

        if ($request->filled('mois') && $request->filled('annee')) {
            $query->whereMonth('date_publication', $request->mois)
                  ->whereYear('date_publication', $request->annee);
        }

        $calendriers = $query->paginate(20);

        return response()->json($calendriers);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'plateforme_id'    => 'required|exists:plateformes,id',
            'titre'            => 'required|string|max:255',
            'description'      => 'nullable|string',
            'theme'            => 'nullable|string|max:150',
            'type_contenu'     => 'required|in:carrousel,reels,story,post_statique,video,live',
            'date_publication' => 'required|date|after_or_equal:today',
            'heure_publication'=> 'nullable|date_format:H:i',
            'statut'           => 'sometimes|in:idee,en_cours,valide,programme,publie,annule',
            'notes_internes'   => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $calendrier = CalendrierEditorial::create([
            ...$validated,
            'utilisateur_id' => $request->user()->id,
        ]);

        return response()->json(
            $calendrier->load(['utilisateur', 'plateforme']),
            201
        );
    }

    public function show(CalendrierEditorial $calendrier): JsonResponse
    {
        if (! $this->rolePeutVoirCalendrier(request(), $calendrier)) {
            abort(403, 'Acces non autorise a cette entree de calendrier.');
        }

        return response()->json(
            $calendrier->load(['utilisateur', 'plateforme', 'publication'])
        );
    }

    public function update(Request $request, CalendrierEditorial $calendrier): JsonResponse
    {
        if (! $this->rolePeutModifierCalendrier($request, $calendrier)) {
            abort(403, 'Acces non autorise pour modifier cette entree de calendrier.');
        }

        $validator = Validator::make($request->all(), [
            'plateforme_id'    => 'sometimes|exists:plateformes,id',
            'titre'            => 'sometimes|string|max:255',
            'description'      => 'nullable|string',
            'theme'            => 'nullable|string|max:150',
            'type_contenu'     => 'sometimes|in:carrousel,reels,story,post_statique,video,live',
            'date_publication' => 'sometimes|date',
            'heure_publication'=> 'nullable|date_format:H:i',
            'statut'           => 'sometimes|in:idee,en_cours,valide,programme,publie,annule',
            'notes_internes'   => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        $calendrier->update($validated);

        return response()->json($calendrier->load(['utilisateur', 'plateforme']));
    }

    public function destroy(CalendrierEditorial $calendrier): JsonResponse
    {
        if (! $this->rolePeutModifierCalendrier(request(), $calendrier)) {
            abort(403, 'Acces non autorise pour supprimer cette entree de calendrier.');
        }

        $calendrier->delete();

        return response()->json(['message' => 'Entrée supprimée du calendrier.']);
    }
}
