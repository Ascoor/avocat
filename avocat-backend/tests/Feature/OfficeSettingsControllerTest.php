<?php

namespace Tests\Feature;

use App\Models\Court;
use App\Models\CourtLevel;
use App\Models\CourtType;
use App\Models\Division;
use App\Models\Office;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class OfficeSettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    private function actingOfficeAdmin(int $officeId): User
    {
        $user = User::factory()->create(['office_id' => $officeId]);
        Permission::findOrCreate('officeSettings.manage', 'web');
        $user->givePermissionTo('officeSettings.manage');
        Sanctum::actingAs($user);

        return $user;
    }

    public function test_office_admin_can_crud_procedure_types_in_scope(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $created = $this->postJson("/api/v1/offices/{$office->id}/settings/procedure_types", [
            'name' => 'Action',
            'sort_order' => 10,
        ]);

        $created->assertCreated()->assertJsonPath('data.office_id', $office->id);
        $id = $created->json('data.id');

        $this->putJson("/api/v1/offices/{$office->id}/settings/procedure_types/{$id}", [
            'name' => 'إجراء محدث',
            'is_active' => true,
        ])->assertOk()->assertJsonPath('data.name', 'إجراء محدث');

        $this->getJson("/api/v1/offices/{$office->id}/settings/procedure_types")
            ->assertOk()
            ->assertJsonPath('meta.entity', 'procedure_types');

        $this->deleteJson("/api/v1/offices/{$office->id}/settings/procedure_types/{$id}")
            ->assertOk()
            ->assertJsonPath('deleted', true)
            ->assertJsonPath('deactivated', false);
    }

    public function test_access_is_forbidden_for_different_office(): void
    {
        $officeA = Office::create(['name' => 'Office A']);
        $officeB = Office::create(['name' => 'Office B']);
        $this->actingOfficeAdmin($officeA->id);

        $this->getJson("/api/v1/offices/{$officeB->id}/settings/procedure_types")
            ->assertForbidden();
    }

    public function test_names_are_unique_case_insensitive_per_office(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $this->postJson("/api/v1/offices/{$office->id}/settings/procedure_types", [
            'name' => 'Action',
        ])->assertCreated();

        $this->postJson("/api/v1/offices/{$office->id}/settings/procedure_types", [
            'name' => 'action',
        ])->assertStatus(422);
    }

    public function test_in_use_entity_is_disabled_instead_of_deleted(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $courtType = CourtType::create(['name' => 'Type']);
        $courtLevel = CourtLevel::create([
            'name' => 'Level',
            'office_id' => $office->id,
            'is_system' => false,
        ]);

        Court::create([
            'name' => 'Court',
            'court_type_id' => $courtType->id,
            'court_level_id' => $courtLevel->id,
        ]);

        $this->deleteJson("/api/v1/offices/{$office->id}/settings/court_levels/{$courtLevel->id}")
            ->assertStatus(409)
            ->assertJsonPath('deactivated', true)
            ->assertJsonPath('deleted', false)
            ->assertJsonPath('data.is_active', false);
    }

    public function test_lookup_routes_resolve_office_scope_from_authenticated_user(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $created = $this->postJson('/api/v1/lookups/procedure_types', [
            'name' => 'Lookup Procedure',
            'sort_order' => 1,
        ]);

        $created
            ->assertCreated()
            ->assertJsonPath('data.office_id', $office->id)
            ->assertJsonPath('meta.office_id', $office->id)
            ->assertJsonPath('meta.entity', 'procedure_types');

        $id = $created->json('data.id');

        $this->getJson('/api/v1/lookups/procedure_types')
            ->assertOk()
            ->assertJsonPath('meta.office_id', $office->id)
            ->assertJsonPath('meta.entity', 'procedure_types');

        $this->putJson("/api/v1/lookups/procedure_types/{$id}", [
            'name' => 'Lookup Procedure Updated',
        ])->assertOk()->assertJsonPath('data.name', 'Lookup Procedure Updated');

        $this->deleteJson("/api/v1/lookups/procedure_types/{$id}")
            ->assertOk()
            ->assertJsonPath('deleted', true);
    }

    public function test_court_in_use_by_division_is_deactivated_on_delete(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $courtType = CourtType::create([
            'name' => 'Type',
            'office_id' => $office->id,
            'is_system' => false,
        ]);
        $courtLevel = CourtLevel::create([
            'name' => 'Level',
            'office_id' => $office->id,
            'is_system' => false,
        ]);
        $court = Court::create([
            'name' => 'Court',
            'court_type_id' => $courtType->id,
            'court_level_id' => $courtLevel->id,
            'office_id' => $office->id,
            'is_system' => false,
        ]);

        Division::create([
            'name' => 'Division',
            'court_id' => $court->id,
            'office_id' => $office->id,
            'is_system' => false,
        ]);

        $this->deleteJson("/api/v1/offices/{$office->id}/settings/courts/{$court->id}")
            ->assertStatus(409)
            ->assertJsonPath('deactivated', true)
            ->assertJsonPath('deleted', false)
            ->assertJsonPath('data.is_active', false);
    }

    public function test_divisions_support_crud_and_abac_scope(): void
    {
        $officeA = Office::create(['name' => 'Office A']);
        $officeB = Office::create(['name' => 'Office B']);
        $this->actingOfficeAdmin($officeA->id);

        $courtType = CourtType::create([
            'name' => 'Type',
            'office_id' => $officeA->id,
            'is_system' => false,
        ]);
        $courtLevel = CourtLevel::create([
            'name' => 'Level',
            'office_id' => $officeA->id,
            'is_system' => false,
        ]);
        $court = Court::create([
            'name' => 'Court',
            'court_type_id' => $courtType->id,
            'court_level_id' => $courtLevel->id,
            'office_id' => $officeA->id,
            'is_system' => false,
        ]);

        $created = $this->postJson("/api/v1/offices/{$officeA->id}/settings/divisions", [
            'name' => 'Division A',
            'court_id' => $court->id,
            'sort_order' => 1,
        ]);

        $created->assertCreated()->assertJsonPath('data.court_id', $court->id);

        $divisionId = $created->json('data.id');

        $this->putJson("/api/v1/offices/{$officeA->id}/settings/divisions/{$divisionId}", [
            'name' => 'Division B',
            'court_id' => $court->id,
            'is_active' => true,
        ])->assertOk()->assertJsonPath('data.name', 'Division B');

        $this->getJson("/api/v1/offices/{$officeA->id}/settings/divisions")
            ->assertOk()
            ->assertJsonPath('meta.entity', 'divisions');

        $this->getJson("/api/v1/offices/{$officeB->id}/settings/divisions")
            ->assertForbidden();

        $this->deleteJson("/api/v1/offices/{$officeA->id}/settings/divisions/{$divisionId}")
            ->assertOk()
            ->assertJsonPath('deleted', true);
    }

}
