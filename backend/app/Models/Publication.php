<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Publication extends Model
{
    use HasFactory;

    protected $table = 'publications';

    protected $fillable = [
        'utilisateur_id',
        'plateforme_id',
        'calendrier_id',
        'contenu',
        'url_media',
        'url_post',
        'type_contenu',
        'statut',
        'hashtags',
        'publie_le',
    ];

    protected $casts = [
        'hashtags'  => 'array',
        'publie_le' => 'datetime',
    ];

    // ─── Scopes ───────────────────────────────────────────────

    public function scopePubliees($query)
    {
        return $query->where('statut', 'publie');
    }

    public function scopeParPlateforme($query, int $plateformeId)
    {
        return $query->where('plateforme_id', $plateformeId);
    }

    public function scopeParType($query, string $type)
    {
        return $query->where('type_contenu', $type);
    }

    // ─── Accesseurs ───────────────────────────────────────────

    public function getApercuContenuAttribute(): string
    {
        return Str::limit($this->contenu, 100);
    }

    public function getEstPublieeAttribute(): bool
    {
        return $this->statut === 'publie';
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

    public function calendrier(): BelongsTo
    {
        return $this->belongsTo(CalendrierEditorial::class, 'calendrier_id');
    }

    public function commentaires(): HasMany
    {
        return $this->hasMany(Commentaire::class, 'publication_id');
    }

    public function interactions(): HasMany
    {
        return $this->hasMany(Interaction::class, 'publication_id');
    }

    // ─── Stats rapides ────────────────────────────────────────

    public function getNbLikesAttribute(): int
    {
        return $this->interactions()->where('type_interaction', 'like')->sum('valeur');
    }

    public function getNbVuesAttribute(): int
    {
        return $this->interactions()->where('type_interaction', 'vue')->sum('valeur');
    }

    public function getTauxEngagementAttribute(): float
    {
        $vues = $this->nb_vues;
        if ($vues === 0) return 0;

        $engagements = $this->interactions()
            ->whereIn('type_interaction', ['like', 'partage', 'reaction'])
            ->sum('valeur');

        $engagements += $this->commentaires()->where('statut', 'approuve')->count();

        return round(($engagements / $vues) * 100, 2);
    }
}
