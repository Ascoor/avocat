    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateProceduresTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::create('procedure_types', function (Blueprint $table) {
                $table->id();
                $table->string('name')->unique();  // Add unique constraint
                $table->timestamps();
            });

            Schema::create('procedure_place_types', function (Blueprint $table) {
                $table->id();
                $table->string('name')->unique();  // Add unique constraint
                $table->timestamps();
            });

            Schema::create('procedures', function (Blueprint $table) {
                $table->id();
                $table->foreignId('procedure_type_id')->constrained('procedure_types')->onDelete('cascade');
                $table->foreignId('leg_case_id')->constrained()->onDelete('cascade');
                $table->string('procedure_place_name')->nullable();
                $table->unsignedBigInteger('procedure_place_type_id')->nullable(); // Change data type
                $table->foreignId('lawyer_id')->nullable()->constrained('lawyers')->onDelete('set null');
                $table->longText('job');
                $table->longText('result')->nullable();
                $table->longText('note')->nullable();
                $table->enum('status', ['تمت', 'لم ينفذ', 'جاري التنفيذ'])->default('جاري التنفيذ');
                $table->unsignedBigInteger('event_id')->nullable();
                $table->foreign('event_id')->references('id')->on('events')->onDelete('set null');
                $table->date('date_start')->nullable();
                $table->date('date_end')->nullable();
                $table->decimal('cost1', 10, 2)->nullable()->default(0); // Add cost1 column
                $table->decimal('cost2', 10, 2)->nullable()->default(0); // Add cost2 column
                $table->decimal('cost3', 10, 2)->nullable()->default(0); // Add cost3 column
                $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
                $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
                $table->timestamps();
            });
        }

        public function down(): void
        {
            Schema::dropIfExists('procedures');
            Schema::dropIfExists('procedure_types');
            Schema::dropIfExists('procedure_place_types');
        }
    }
