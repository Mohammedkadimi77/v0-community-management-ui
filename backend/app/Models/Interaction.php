<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Interaction extends Model
{
    use HasFactory;

    protected $table = 'interactions';

    protected $fillable = [
        'publication_id',
        'utilisateur_id',
        'type_interaction',
        'valeur',
    ];

    protected $casts = [
        'valeur' => 'integer',
    ];

    // ─── Scopes ───────────────────────────────────────────────

    public function scopeParType($query, string $type)
    {
        return $query->where('type_interaction', $type);
    }

    public function scopeLikes($query)
    {
        return $query->where('type_interaction', 'like');
    }

    public function scopeVues($query)
    {
        return $query->where('type_interaction', 'vue');
    }

    // ─── Relations ────────────────────────────────────────────

    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class, 'publication_id');
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
}
