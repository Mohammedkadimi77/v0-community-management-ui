<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Autorise l'acces uniquement aux roles passes au middleware.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $utilisateur = $request->user();

        if (! $utilisateur) {
            return response()->json([
                'message' => 'Non authentifie.',
            ], 401);
        }

        if ($roles !== [] && ! in_array($utilisateur->role, $roles, true)) {
            return response()->json([
                'message' => 'Acces refuse pour ce role.',
            ], 403);
        }

        return $next($request);
    }
}
