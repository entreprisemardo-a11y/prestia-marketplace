<?php

namespace App\Domains\Communication\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Communication\Models\Conversation;
use App\Domains\Communication\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Obtenir l'historique d'une conversation
     */
    public function index(Request $request, Conversation $conversation): JsonResponse
    {
        // Sécurité : l'utilisateur doit être le client ou le prestataire
        if ($conversation->client_id !== $request->user()->id && $conversation->provider_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $messages = $conversation->messages()->with('sender')->orderBy('created_at', 'asc')->get();

        // Marquer comme lu
        $conversation->messages()->where('sender_id', '!=', $request->user()->id)->update(['is_read' => true]);

        return response()->json($messages);
    }

    /**
     * Envoyer un message avec modération IA/Regex automatique
     */
    public function store(Request $request, Conversation $conversation): JsonResponse
    {
        if ($conversation->client_id !== $request->user()->id && $conversation->provider_id !== $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate(['content' => 'required|string']);

        $content = $request->content;

        // --- MOTEUR DE MODÉRATION AUTOMATIQUE (Regex) ---
        // 1. Masquer les numéros de téléphone (Formats variés, africains et internationaux)
        $content = preg_replace('/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/', '[TÉLÉPHONE MASQUÉ]', $content);
        
        // 2. Masquer les emails
        $content = preg_replace('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', '[EMAIL MASQUÉ]', $content);
        
        // 3. Masquer les liens externes
        $content = preg_replace('/(https?:\/\/[^\s]+)/', '[LIEN MASQUÉ]', $content);

        // Enregistrement du message modéré
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $request->user()->id,
            'content' => $content,
        ]);

        // Ici, on déclencherait l'événement Broadcast pour Pusher/Reverb :
        // broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}
