<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Tests\TestCase;

class ProcedureSearchControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');

        Schema::create('leg_cases', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->string('title')->nullable();
            $table->boolean('is_deleted')->default(false);
            $table->timestamps();
        });

        Schema::create('lawyers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
        });

        Schema::create('courts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
        });

        Schema::create('procedures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leg_case_id')->nullable();
            $table->foreignId('lawyer_id')->nullable();
            $table->string('job')->nullable();
            $table->string('status')->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->timestamps();
        });

        Schema::create('leg_case_court', function (Blueprint $table) {
            $table->foreignId('leg_case_id');
            $table->foreignId('court_id');
        });

        Schema::create('leg_case_client', function (Blueprint $table) {
            $table->foreignId('leg_case_id');
            $table->foreignId('client_id');
        });

        DB::table('leg_cases')->insert([
            ['id' => 1, 'slug' => 'CASE-001', 'title' => 'Case A', 'is_deleted' => 0],
            ['id' => 2, 'slug' => 'CASE-002', 'title' => 'Case B', 'is_deleted' => 0],
        ]);

        DB::table('lawyers')->insert([['id' => 1, 'name' => 'Lawyer']]);
        DB::table('clients')->insert([['id' => 1, 'name' => 'Client']]);
        DB::table('courts')->insert([['id' => 1, 'name' => 'Court']]);
        DB::table('leg_case_court')->insert([['leg_case_id' => 1, 'court_id' => 1]]);
        DB::table('leg_case_client')->insert([['leg_case_id' => 1, 'client_id' => 1]]);

        DB::table('procedures')->insert([
            ['id' => 1, 'leg_case_id' => 1, 'lawyer_id' => 1, 'job' => 'P1', 'status' => 'تمت', 'date_start' => '2024-01-01', 'created_at' => '2024-01-01 00:00:00', 'updated_at' => '2024-01-01 00:00:00'],
            ['id' => 2, 'leg_case_id' => 2, 'lawyer_id' => 1, 'job' => 'P2', 'status' => 'جاري التنفيذ', 'date_start' => '2024-02-01', 'created_at' => '2024-02-01 00:00:00', 'updated_at' => '2024-02-01 00:00:00'],
        ]);
    }

    public function test_it_filters_by_case_slug(): void
    {
        $this->withoutMiddleware();

        $response = $this->getJson('/api/v1/procedures-search?filters[case_slug]=CASE-001');

        $response->assertOk();
        $response->assertJsonPath('meta.total', 1);
        $response->assertJsonPath('data.0.leg_case_id', 1);
    }

    public function test_it_uses_sort_allowlist_fallback(): void
    {
        $this->withoutMiddleware();

        $response = $this->getJson('/api/v1/procedures-search?sort_by=unknown_field&sort_dir=asc');

        $response->assertStatus(422);
    }

    public function test_it_returns_pagination_meta(): void
    {
        $this->withoutMiddleware();

        $response = $this->getJson('/api/v1/procedures-search?page=1&per_page=1');

        $response->assertOk();
        $response->assertJsonPath('meta.page', 1);
        $response->assertJsonPath('meta.per_page', 1);
        $response->assertJsonPath('meta.total', 2);
        $response->assertJsonPath('meta.last_page', 2);
    }
}
