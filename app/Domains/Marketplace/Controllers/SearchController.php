<?php

namespace App\Domains\Marketplace\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Marketplace\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Moteur de recherche avancé avec filtres et géolocalisation (Haversine)
     */
    public function search(Request $request): JsonResponse
    {
        // On récupère uniquement les services actifs
        $query = Service::active()
            ->with(['category', 'provider.profile']); // Eager loading pour éviter le problème N+1

        // 1. Filtre par Mot Clé (Titre ou Description)
        if ($request->filled('q')) {
            $searchTerm = '%' . $request->q . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'ilike', $searchTerm)
                  ->orWhere('description', 'ilike', $searchTerm); // ilike = insensible à la casse (PostgreSQL)
            });
        }

        // 2. Filtre par Catégorie
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // 3. Filtre par Prix Max
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // 4. Géolocalisation (Calcul Haversine) "Près de moi"
        // Si l'utilisateur fournit sa latitude/longitude et un rayon (en km)
        if ($request->filled('lat') && $request->filled('lng')) {
            $latitude = (float) $request->lat;
            $longitude = (float) $request->lng;
            $radius = $request->filled('radius') ? (float) $request->radius : 50; // Rayon par défaut: 50km

            // Formule mathématique de Haversine pour calculer la distance
            $haversine = "(6371 * acos(cos(radians($latitude)) 
                         * cos(radians(profiles.latitude)) 
                         * cos(radians(profiles.longitude) - radians($longitude)) 
                         + sin(radians($latitude)) 
                         * sin(radians(profiles.latitude))))";

            // On fait une jointure pour accéder aux coordonnées du prestataire
            $query->join('users', 'services.provider_id', '=', 'users.id')
                  ->join('profiles', 'users.id', '=', 'profiles.user_id')
                  ->select('services.*') // Ne garder que les champs du service
                  ->selectRaw("{$haversine} AS distance")
                  ->whereRaw("{$haversine} < ?", [$radius])
                  ->orderBy('distance', 'asc'); // Trier du plus proche au plus éloigné
        } else {
            // S'il n'y a pas de géolocalisation, on trie par note (popularité)
            $query->orderBy('rating', 'desc');
        }

        // Pagination optimisée
        $services = $query->paginate(15);

        return response()->json($services);
    }
}
