<?php

namespace App\Domains\Marketplace\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Marketplace\Models\Service;
use App\Domains\Marketplace\Requests\StoreServiceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Liste les services du prestataire connecté
     */
    public function myServices(Request $request): JsonResponse
    {
        $services = Service::where('provider_id', $request->user()->id)
            ->with('category')
            ->get();

        return response()->json($services);
    }

    /**
     * Création d'un nouveau service
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        $user = $request->user();

        // Vérification KYC obligatoire avant de publier un service
        if ($user->profile->kyc_status !== 'approved') {
            return response()->json([
                'message' => 'Action non autorisée. Votre compte doit être validé (KYC approuvé) avant de pouvoir créer des services.'
            ], 403);
        }

        $data = $request->validated();
        
        // Génération automatique du slug à partir du titre
        $data['slug'] = Str::slug($data['title']) . '-' . uniqid();
        $data['provider_id'] = $request->user()->id;
        $data['status'] = 'active'; // On l'active par défaut pour le MVP

        // Note: La gestion de l'upload des images sur le Cloud (AWS/S3 ou local) 
        // sera intégrée dans un Service dédié plus tard.
        
        $service = Service::create($data);

        return response()->json([
            'message' => 'Service créé avec succès.',
            'service' => $service->load('category')
        ], 201);
    }

    /**
     * Suspendre ou réactiver un service
     */
    public function toggleStatus(Request $request, Service $service): JsonResponse
    {
        // Vérification de sécurité (Policy inline)
        if ($service->provider_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $service->status = $service->status === 'active' ? 'paused' : 'active';
        $service->save();

        return response()->json([
            'message' => "Le statut du service est maintenant: {$service->status}",
            'service' => $service
        ]);
    }
}
