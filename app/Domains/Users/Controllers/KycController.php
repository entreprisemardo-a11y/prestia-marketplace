<?php

namespace App\Domains\Users\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KycController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'id_document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB Max
        ]);

        $user = $request->user();

        if ($user->role !== 'provider') {
            return response()->json(['message' => 'Seuls les prestataires peuvent soumettre des documents KYC.'], 403);
        }

        if ($user->profile->kyc_status === 'approved') {
            return response()->json(['message' => 'Votre identité est déjà vérifiée.'], 400);
        }

        // Store the file
        $path = $request->file('id_document')->store('kyc_documents', 'local');

        $user->profile()->update([
            'kyc_status' => 'pending',
            'id_document_path' => $path,
        ]);

        return response()->json([
            'message' => 'Document soumis avec succès. En attente de validation.',
            'profile' => $user->profile->fresh()
        ]);
    }
}
