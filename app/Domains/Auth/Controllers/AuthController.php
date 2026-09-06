<?php

namespace App\Domains\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Auth\Requests\RegisterRequest;
use App\Domains\Auth\Requests\LoginRequest;
use App\Domains\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        // 1. Génération du code OTP
        $verificationCode = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // 2. Création de l'utilisateur avec le code
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'email_verification_code' => $verificationCode,
            'email_code_expires_at' => Carbon::now()->addMinutes(30),
        ]);

        // 3. Création automatique de son profil (vide pour l'instant)
        $user->profile()->create([]);

        // 4. Simulation d'envoi d'email
        Log::info("Code de vérification pour {$user->email} : {$verificationCode}");

        // 5. Génération du Token d'accès (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie. Veuillez vérifier votre email.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load('profile')
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        // Vérification des identifiants
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants fournis sont incorrects.'],
            ]);
        }

        // Nom de l'appareil pour identifier le token
        $deviceName = $request->device_name ?? 'web_browser';
        $token = $user->createToken($deviceName)->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->load('profile')
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        // Révocation du token actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.'
        ], 200);
    }

    public function me(Request $request): JsonResponse
    {
        // Retourne l'utilisateur connecté avec son profil
        return response()->json(
            $request->user()->load('profile')
        );
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $user = $request->user();

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email déjà vérifié.'], 400);
        }

        if ($user->email_verification_code !== $request->code) {
            return response()->json(['message' => 'Code de vérification invalide.'], 400);
        }

        if (Carbon::now()->isAfter($user->email_code_expires_at)) {
            return response()->json(['message' => 'Le code de vérification a expiré.'], 400);
        }

        $user->update([
            'email_verified_at' => Carbon::now(),
            'email_verification_code' => null,
            'email_code_expires_at' => null,
        ]);

        return response()->json([
            'message' => 'Email vérifié avec succès.',
            'user' => $user->load('profile')
        ]);
    }
}
