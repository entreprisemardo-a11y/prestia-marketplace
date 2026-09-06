<?php

namespace App\Domains\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Domains\Users\Models\User;
use App\Domains\Marketplace\Models\Service;
use App\Domains\Engagement\Models\Review;

class Order extends Model
{
    use HasUuids, SoftDeletes;

    protected $fillable = ['client_id', 'provider_id', 'service_id', 'status', 'total_amount', 'requirements'];

    public function client() { return $this->belongsTo(User::class, 'client_id'); }
    public function provider() { return $this->belongsTo(User::class, 'provider_id'); }
    public function service() { return $this->belongsTo(Service::class); }
    public function review() { return $this->hasOne(Review::class); }
}
