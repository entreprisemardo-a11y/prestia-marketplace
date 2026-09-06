<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Table des Commandes
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('client_id')->constrained('users');
            $table->foreignUuid('provider_id')->constrained('users');
            $table->foreignUuid('service_id')->constrained('services');
            
            // Machine à états stricte
            $table->enum('status', ['draft', 'pending', 'accepted', 'in_progress', 'completed', 'archived'])->default('draft');
            
            $table->decimal('total_amount', 12, 2);
            $table->text('requirements')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // 2. Table des Transactions (Paiements)
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->string('payment_method'); // ex: mtn_money, orange_money, moov
            $table->string('reference_id')->unique()->nullable(); // Référence du fournisseur externe
            $table->timestamps();
        });

        // 3. Table des Avis (Engagement)
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->unique()->constrained()->cascadeOnDelete(); // Un seul avis par commande
            $table->foreignUuid('client_id')->constrained('users');
            $table->foreignUuid('provider_id')->constrained('users');
            $table->decimal('rating', 3, 2);
            $table->text('comment')->nullable();
            $table->text('provider_reply')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('orders');
    }
};
