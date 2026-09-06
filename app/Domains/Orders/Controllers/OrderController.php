<?php

namespace App\Domains\Orders\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Orders\Models\Order;
use App\Domains\Marketplace\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Le client initie une commande (Brouillon -> En attente)
     */
    public function store(Request $request, Service $service): JsonResponse
    {
        if ($request->user()->role !== 'client') {
            return response()->json(['message' => 'Seuls les clients peuvent commander.'], 403);
        }

        $order = Order::create([
            'client_id' => $request->user()->id,
            'provider_id' => $service->provider_id,
            'service_id' => $service->id,
            'total_amount' => $service->price, // Simplification MVP
            'requirements' => $request->requirements,
            'status' => 'pending' // Devient immédiatement En Attente
        ]);

        // Ici, on déclencherait une Notification (Push/Email) vers le Prestataire

        return response()->json(['message' => 'Commande envoyée au prestataire.', 'order' => $order], 201);
    }

    /**
     * Machine à États : Le prestataire ou le client change le statut de la commande
     */
    public function transition(Request $request, Order $order): JsonResponse
    {
        $action = $request->input('action'); // ex: 'accept', 'start', 'complete'
        $user = $request->user();
        $isProvider = $user->id === $order->provider_id;
        $isClient = $user->id === $order->client_id;

        // Logique stricte de la State Machine
        if ($action === 'accept' && $order->status === 'pending' && $isProvider) {
            $order->status = 'accepted';
        } 
        elseif ($action === 'start' && $order->status === 'accepted' && $isProvider) {
            // Note: Normalement, on vérifie que le paiement (Transaction) est 'success' avant
            $order->status = 'in_progress';
        } 
        elseif ($action === 'complete' && $order->status === 'in_progress' && $isClient) {
            // Seul le client valide que le travail est vraiment terminé
            $order->status = 'completed';
        } 
        else {
            return response()->json(['message' => 'Transition invalide ou non autorisée depuis le statut actuel.'], 400);
        }

        $order->save();

        return response()->json([
            'message' => 'Statut mis à jour.',
            'status' => $order->status
        ]);
    }
}
