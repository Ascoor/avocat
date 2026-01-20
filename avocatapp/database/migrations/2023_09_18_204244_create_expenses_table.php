<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
        */
        public function up()
        {
            Schema::create('expense_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->timestamps();
            });
            Schema::create('expenses', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('service_id')->nullable();
                $table->unsignedBigInteger('leg_case_id')->nullable();
                $table->unsignedBigInteger('created_by')->nullable();
                $table->unsignedBigInteger('legal_session_id')->nullable();
                $table->unsignedBigInteger('expense_category_id');
                                $table->unsignedBigInteger('client_id')->nullable();
                $table->unsignedBigInteger('unclients_id')->nullable();







                $table->string('description')->nullable();
                $table->string('note')->nullable();
                $table->date('expense_date')->nullable();
                $table->json('amount')->nullable();
                $table->foreign('expense_category_id')->references('id')->on('expense_categories')->onDelete('cascade');
                $table->foreign('client_id')->references('id')->on('clients')->onDelete('set null');
                $table->foreign('unclients_id')->references('id')->on('unclients')->onDelete('set null');

                $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
                $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
                $table->foreign('legal_session_id')->references('id')->on('legal_sessions')->onDelete('cascade');
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}
