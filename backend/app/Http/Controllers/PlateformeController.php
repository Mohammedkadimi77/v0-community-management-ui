<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Plateforme;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlateformeController extends Controller
{
    public function index(): JsonResponse
    {
        $plateformes = Plateforme::active()->orderBy('nom')->get();

        return response()->json($plateformes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom'         => 'required|string|max:100|unique:plateformes,nom',
            'slug'        => 'required|string|max:100|unique:plateformes,slug',
            'url_base'    => 'nullable|url|max:255',
            'couleur_hex' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'icone_url'   => 'nullable|url|max:500',
            'actif'       => 'boolean',
        ]);

        $plateforme = Plateforme::create($validated);

        return response()->json($plateforme, 201);
    }

    public function show(Plateforme $plateforme): JsonResponse
    {
        return response()->json($plateforme->load('publications'));
    }

    public function update(Request $request, Plateforme $plateforme): JsonResponse
    {
        $validated = $request->validate([
            'nom'         => 'sometimes|string|max:100|unique:plateformes,nom,' . $plateforme->id,
            'slug'        => 'sometimes|string|max:100|unique:plateformes,slug,' . $plateforme->id,
            'url_base'    => 'nullable|url|max:255',
            'couleur_hex' => 'nullable|regex:/^#[0-9A-Fa-f]{6}$/',
            'icone_url'   => 'nullable|url|max:500',
            'actif'       => 'boolean',
        ]);

        $plateforme->update($validated);

        return response()->json($plateforme);
    }

    public function destroy(Plateforme $plateforme): JsonResponse
    {
        $plateforme->update(['actif' => false]);

        return response()->json(['message' => 'Plateforme désactivée.']);
    }
}
