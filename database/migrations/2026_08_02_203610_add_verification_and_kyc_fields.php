<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email_verification_code')->nullable();
            $table->timestamp('email_code_expires_at')->nullable();
        });

        Schema::table('profiles', function (Blueprint $table) {
            $table->enum('kyc_status', ['unverified', 'pending', 'approved', 'rejected'])->default('unverified');
            $table->string('id_document_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['email_verification_code', 'email_code_expires_at']);
        });

        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['kyc_status', 'id_document_path']);
        });
    }
};
