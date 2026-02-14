<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLegalAdsTable extends Migration
{
public function up()
{
    Schema::create('legal_ad_types', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
        Schema::create('legal_ads', function (Blueprint $table) {
            $table->id();
            $table->longText('description');
            $table->longText('results')->nullable();
            $table->date('send_date');
            $table->date('receive_date')->nullable();
            $table->string('lawyer_send_id');
            $table->unsignedBigInteger('legal_ad_type_id');
            $table->string('lawyer_receive_id')->nullable();
            $table->enum('status', ['قيد التجهيز', 'تم التسليم', 'تم الإستلام'])->default('قيد التجهيز');
            $table->unsignedBigInteger('leg_case_id');
            $table->unsignedBigInteger('court_id');
            $table->decimal('cost1', 10, 2)->nullable()->default(0);
            $table->decimal('cost2', 10, 2)->nullable()->default(0);
            $table->decimal('cost3', 10, 2)->nullable()->default(0);
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('legal_ad_type_id')->references('id')->on('legal_ad_types');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('leg_case_id')->references('id')->on('leg_cases');
            $table->foreign('court_id')->references('id')->on('courts');
        });
}


    /*
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('legal_ads_types');
        Schema::dropIfExists('legal_ads');

    }
}
