<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'body',
        'url_gambar',
        'category',
        'phone_number'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'category' => 'string',
    ];

    /**
     * Get the user that owns the news.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function getRouteKeyName()
{
    return 'slug';
}
}
