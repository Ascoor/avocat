<?php

namespace Tests\Feature;

use App\Models\CaseType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class OfficeSettingsTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsOfficeManager(int $officeId = 7): User
    {
        Permission::findOrCreate('officeSettings.manage', 'web');

        $user = User::factory()->create(['office_id' => $officeId]);
        $user->givePermissionTo('officeSettings.manage');
        Sanctum::actingAs($user);

        return $user;
    }

    public function test_index_resolves_system_and_office_overrides(): void
    {
        $this->actingAsOfficeManager(7);

        $system = CaseType::query()->create([
            'name' => 'مدني',
            'office_id' => null,
            'is_system' => true,
            'is_active' => true,
            'sort_order' => 1,
        ]);

        CaseType::query()->create([
            'name' => 'مدني - مكتب',
            'office_id' => 7,
            'is_system' => false,
            'parent_id' => $system->id,
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $this->getJson('/api/v1/offices/7/settings/case_types')
            ->assertOk()
            ->assertJsonPath('data.0.name', 'مدني - مكتب')
            ->assertJsonPath('data.0.resolved_source', 'office_override');
    }

    public function test_store_requires_office_scope_permission_match(): void
    {
        $this->actingAsOfficeManager(3);

        $this->postJson('/api/v1/offices/5/settings/case_types', ['name' => 'نزاع'])
            ->assertForbidden();
    }

    public function test_destroy_deactivates_when_in_use(): void
    {
        $this->actingAsOfficeManager(7);

        $row = CaseType::query()->create([
            'name' => 'عمالي',
            'office_id' => 7,
            'is_system' => false,
            'is_active' => true,
        ]);

        \DB::table('case_sub_types')->insert([
            'name' => 'فرعي مستخدم',
            'case_type_id' => $row->id,
            'office_id' => 7,
            'is_system' => false,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->deleteJson("/api/v1/offices/7/settings/case_types/{$row->id}")
            ->assertOk()
            ->assertJsonPath('deactivated', true);
    }
}
