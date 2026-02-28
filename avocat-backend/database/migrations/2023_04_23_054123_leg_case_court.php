    <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LegCaseCourt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

        public function up()
        {
            Schema::create('leg_case_court', function (Blueprint $table) {
                $table->unsignedBigInteger('leg_case_id');
                $table->unsignedBigInteger('court_id')->nullable();
                $table->string('case_number')->nullable();
                $table->string('case_year')->nullable();

                $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
                $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
            });
        }

        public function down()
        {
            Schema::dropIfExists('leg_case_court');
        }

}
