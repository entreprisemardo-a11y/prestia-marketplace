<?php

namespace App\Domains\Marketplace\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Seuls les prestataires (providers) peuvent créer des services
        return $this->user() && $this->user()->role === 'provider';
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'price_type' => ['required', 'in:fixed,hourly,negotiable'],
            'images' => ['nullable', 'array', 'max:5'], // Max 5 images pour le MVP
            'images.*' => ['image', 'mimes:jpeg,png,jpg,webp', 'max:2048'], // 2MB max par image
        ];
    }
}
