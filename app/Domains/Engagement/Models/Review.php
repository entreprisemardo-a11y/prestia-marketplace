<?php

namespace App\Domains\Engagement\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Review extends Model
{
    use HasUuids;
    protected $fillable = ['order_id', 'client_id', 'provider_id', 'rating', 'comment', 'provider_reply'];
}
