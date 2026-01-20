<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLegCasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('case_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('case_sub_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('case_type_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('leg_cases', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_deleted')->default(false); 
            $table->string('slug');
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->float('fees')->nullable();
            $table->decimal('total_expenses', 10, 2)->nullable()->default(0);
            $table->decimal('total_payments', 10, 2)->nullable()->default(0);
             $table->float('expenses')->nullable();
            $table->foreignId('case_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('case_sub_type_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->string('litigants_name')->nullable();
            $table->string('litigants_address')->nullable();
            $table->string('litigants_phone')->nullable();
            $table->string('litigants_lawyer_name')->nullable();
            $table->string('litigants_lawyer_phone')->nullable();
            $table->enum('client_capacity', ['مدعى عليه', 'مجنى عليه', 'مدعى', 'متهم'])->default('مدعى');
            $table->enum('status', ['قيد التجهيز', 'متداولة', 'منتهية', 'معلقة'])->default('قيد التجهيز');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {

        Schema::dropIfExists('leg_cases');
        Schema::dropIfExists('case_sub_types');
        Schema::dropIfExists('case_types');
    }
}
