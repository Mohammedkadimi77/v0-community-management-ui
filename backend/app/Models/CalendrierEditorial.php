<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CalendrierEditorial extends Model
{
    use HasFactory;

    protected $table = 'calendrier_editorial';

    protected $fillable = [
        'utilisateur_id',
        'plateforme_id',
        'titre',
        'description',
        'theme',
        'type_contenu',
        'date_publication',
        'heure_publication',
        'statut',
        'notes_internes',
    ];

    protected $casts = [
        'date_publication' => 'date',
    ];

    // ─── Scopes ───────────────────────────────────────────────

    public function scopeAVenir($query)
    {
        return $query->where('date_publication', '>=', now()->toDateString());
    }

    public function scopeProchains30Jours($query)
    {
        return $query->whereBetween('date_publication', [
            now()->toDateString(),
            now()->addDays(30)->toDateString(),
        ]);
    }

    public function scopeParStatut($query, string $statut)
    {
        return $query->where('statut', $statut);
    }

    public function scopeParPlateforme($query, int $plateformeId)
    {
        return $query->where('plateforme_id', $plateformeId);
    }

    // ─── Relations ────────────────────────────────────────────

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    public function plateforme(): BelongsTo
    {
        return $this->belongsTo(Plateforme::class, 'plateforme_id');
    }

    public function publication(): HasOne
    {
        return $this->hasOne(Publication::class, 'calendrier_id');
    }
}
