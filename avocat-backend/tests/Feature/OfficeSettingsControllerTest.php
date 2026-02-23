<?php

namespace Tests\Feature;

use App\Models\Court;
use App\Models\CourtLevel;
use App\Models\CourtType;
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

    public function test_case_sub_types_can_be_filtered_by_case_type_and_are_unique_per_case_type(): void
    {
        $office = Office::create(['name' => 'Office A']);
        $this->actingOfficeAdmin($office->id);

        $caseTypeOne = $this->postJson("/api/v1/offices/{$office->id}/settings/case_types", [
            'name' => 'Type 1',
        ])->assertCreated()->json('data.id');

        $caseTypeTwo = $this->postJson("/api/v1/offices/{$office->id}/settings/case_types", [
            'name' => 'Type 2',
        ])->assertCreated()->json('data.id');

        $this->postJson("/api/v1/offices/{$office->id}/settings/case_sub_types", [
            'name' => 'محكمة الجنح',
            'case_type_id' => $caseTypeOne,
        ])->assertCreated();

        $this->postJson("/api/v1/offices/{$office->id}/settings/case_sub_types", [
            'name' => 'محكمة الجنح',
            'case_type_id' => $caseTypeTwo,
        ])->assertCreated();

        $this->postJson("/api/v1/offices/{$office->id}/settings/case_sub_types", [
            'name' => 'محكمة الجنح',
            'case_type_id' => $caseTypeOne,
        ])->assertStatus(422)
            ->assertJsonValidationErrors('name');

        $this->getJson("/api/v1/offices/{$office->id}/settings/case_sub_types?case_type_id={$caseTypeOne}")
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'محكمة الجنح');

        $this->getJson("/api/v1/offices/{$office->id}/settings/case_sub_types")
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }

}
