<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plateforme extends Model
{
    use HasFactory;

    protected $table = 'plateformes';

    protected $fillable = [
        'nom',
        'slug',
        'url_base',
        'couleur_hex',
        'icone_url',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    // ─── Scopes ───────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('actif', true);
    }

    // ─── Relations ────────────────────────────────────────────

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class, 'plateforme_id');
    }

    public function calendriers(): HasMany
    {
        return $this->hasMany(CalendrierEditorial::class, 'plateforme_id');
    }
}
