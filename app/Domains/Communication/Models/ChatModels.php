<?php

namespace App\Domains\Communication\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Domains\Users\Models\User;
use App\Domains\Marketplace\Models\Service;

class Conversation extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['client_id', 'provider_id', 'service_id'];

    public function client() { return $this->belongsTo(User::class, 'client_id'); }
    public function provider() { return $this->belongsTo(User::class, 'provider_id'); }
    public function service() { return $this->belongsTo(Service::class); }
    public function messages() { return $this->hasMany(Message::class); }
}

class Message extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['conversation_id', 'sender_id', 'content', 'is_read', 'attachments'];
    protected $casts = ['attachments' => 'array', 'is_read' => 'boolean'];

    public function conversation() { return $this->belongsTo(Conversation::class); }
    public function sender() { return $this->belongsTo(User::class, 'sender_id'); }
}
