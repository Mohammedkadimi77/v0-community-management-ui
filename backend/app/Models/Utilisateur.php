<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role',
        'avatar_url',
        'actif',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    public function getAuthPassword(): string
    {
        return $this->mot_de_passe;
    }

    // ─── Scopes ───────────────────────────────────────────────

    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    public function scopeParRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    // ─── Accesseurs ───────────────────────────────────────────

    public function getNomCompletAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }

    public function getIsAdminAttribute(): bool
    {
        return $this->role === 'admin';
    }

    // ─── Relations ────────────────────────────────────────────

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class, 'utilisateur_id');
    }

    public function calendriers(): HasMany
    {
        return $this->hasMany(CalendrierEditorial::class, 'utilisateur_id');
    }

    public function commentaires(): HasMany
    {
        return $this->hasMany(Commentaire::class, 'utilisateur_id');
    }

    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class, 'utilisateur_id');
    }
}
