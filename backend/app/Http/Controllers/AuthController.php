<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $payload = $request->all();
        $payload['nom'] = $payload['nom'] ?? $payload['last_name'] ?? null;
        $payload['prenom'] = $payload['prenom'] ?? $payload['first_name'] ?? null;
        $payload['mot_de_passe'] = $payload['mot_de_passe'] ?? $payload['password'] ?? null;
        $payload['mot_de_passe_confirmation'] = $payload['mot_de_passe_confirmation'] ?? $payload['password_confirmation'] ?? null;

        $validator = Validator::make($payload, [
            'nom'           => 'required|string|max:100',
            'prenom'        => 'required|string|max:100',
            'email'         => 'required|email|unique:utilisateurs,email',
            'mot_de_passe'  => 'required|string|min:8|confirmed',
            'role'          => 'sometimes|in:community_manager,redacteur,lecteur',
            'avatar_url'    => 'nullable|string|url',
            'actif'         => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $validated['role'] = $validated['role'] ?? 'lecteur';

        $utilisateur = Utilisateur::create([
            ...$validated,
            'mot_de_passe' => Hash::make($validated['mot_de_passe']),
        ]);

        $token = $utilisateur->createToken('api-token')->plainTextToken;

        return response()->json([
            'message'     => 'Compte créé avec succès.',
            'utilisateur' => $utilisateur,
            'user'        => $utilisateur,
            'token'       => $token,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $payload = $request->all();
        $payload['mot_de_passe'] = $payload['mot_de_passe'] ?? $payload['password'] ?? null;

        $validator = Validator::make($payload, [
            'email'        => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les donnees sont invalides.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $utilisateur = Utilisateur::where('email', $payload['email'])
            ->where('actif', true)
            ->first();

        if (! $utilisateur || ! Hash::check($payload['mot_de_passe'], $utilisateur->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $token = $utilisateur->createToken('api-token')->plainTextToken;

        return response()->json([
            'message'     => 'Connexion réussie.',
            'utilisateur' => $utilisateur,
            'user'        => $utilisateur,
            'token'       => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->load([
            'publications' => fn ($q) => $q->latest()->limit(5),
        ]));
    }
}
