<?php

namespace Tests\Feature;

use App\Models\CaseSubType;
use App\Models\CaseType;
use App\Models\Lawyer;
use App\Models\LegCase;
use App\Models\Notification;
use App\Models\Procedure;
use App\Models\ProcedureType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class NotificationSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_case_create_notifies_super_admin_with_url(): void
    {
        $superAdmin = User::factory()->create();
        $actor = User::factory()->create();
        Role::findOrCreate('super_admin', 'web');
        $superAdmin->assignRole('super_admin');

        $type = CaseType::query()->create(['name' => 'Civil']);
        $subType = CaseSubType::query()->create(['name' => 'Primary', 'case_type_id' => $type->id]);

        Sanctum::actingAs($actor);

        $response = $this->postJson('/api/v1/legal-cases', [
            'slug' => 'C-001',
            'title' => 'Case 1',
            'description' => 'Desc',
            'case_type_id' => $type->id,
            'case_sub_type_id' => $subType->id,
            'client_capacity' => 'plaintiff',
            'created_by' => $actor->id,
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('notifications', [
            'user_id' => $superAdmin->id,
            'entity_type' => 'case',
            'action' => 'created',
            'url' => '/dashboard/cases/1',
        ]);
    }

    public function test_permissions_change_notifies_affected_user_with_meta(): void
    {
        $admin = User::factory()->create();
        $target = User::factory()->create();
        $roleA = Role::findOrCreate('editor', 'web');
        $roleB = Role::findOrCreate('reviewer', 'web');

        Sanctum::actingAs($admin);

        $response = $this->putJson('/api/v1/rbac/users/'.$target->id, [
            'roleIds' => [(string) $roleA->id, (string) $roleB->id],
        ]);

        $response->assertOk();

        $notification = Notification::query()->where('user_id', $target->id)->where('type', 'user_permissions_changed')->latest()->first();

        $this->assertNotNull($notification);
        $this->assertSame((int) $target->id, (int) ($notification->meta['affected_user_id'] ?? 0));
    }

    public function test_assignment_reassign_notifies_new_and_previous_lawyer_users(): void
    {
        $actor = User::factory()->create();
        $lawyerUserA = User::factory()->create();
        $lawyerUserB = User::factory()->create();
        $lawyerA = Lawyer::query()->create([
            'name' => 'Lawyer A',
            'birthdate' => '1990-01-01',
            'identity_number' => '10000000000001',
            'law_reg_num' => 'REG-A',
            'lawyer_class' => 'إبتدائي',
            'email' => 'lawyer-a@example.test',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'user_id' => $lawyerUserA->id,
        ]);
        $lawyerB = Lawyer::query()->create([
            'name' => 'Lawyer B',
            'birthdate' => '1990-01-01',
            'identity_number' => '10000000000002',
            'law_reg_num' => 'REG-B',
            'lawyer_class' => 'إبتدائي',
            'email' => 'lawyer-b@example.test',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'user_id' => $lawyerUserB->id,
        ]);

        $caseType = CaseType::query()->create(['name' => 'Civil']);
        $caseSubType = CaseSubType::query()->create(['name' => 'Primary', 'case_type_id' => $caseType->id]);
        $case = LegCase::query()->create([
            'slug' => 'C-2',
            'title' => 'Case 2',
            'description' => 'Desc',
            'case_type_id' => $caseType->id,
            'case_sub_type_id' => $caseSubType->id,
            'client_capacity' => 'x',
            'created_by' => $actor->id,
        ]);

        $procedureType = ProcedureType::query()->create(['name' => 'Main']);

        $procedure = Procedure::query()->create([
            'procedure_type_id' => $procedureType->id,
            'leg_case_id' => $case->id,
            'lawyer_id' => $lawyerA->id,
            'job' => 'job',
            'status' => 'تمت',
            'created_by' => $actor->id,
        ]);

        Sanctum::actingAs($actor);

        $response = $this->putJson('/api/v1/procedures/'.$procedure->id, [
            'procedure_type_id' => $procedureType->id,
            'leg_case_id' => $case->id,
            'lawyer_id' => $lawyerB->id,
            'job' => 'job',
            'status' => 'تمت',
            'updated_by' => $actor->id,
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('notifications', ['user_id' => $lawyerUserB->id, 'action' => 'reassigned']);
        $this->assertDatabaseHas('notifications', ['user_id' => $lawyerUserA->id, 'title' => __('notifications.assignment_removed_title')]);
    }

    public function test_notifications_api_list_mark_read_and_unread_count(): void
    {
        $user = User::factory()->create();
        $eventId = \App\Models\Event::query()->create([
            'user_id' => $user->id,
            'date' => now(),
            'title' => 'seed',
            'description' => 'seed',
        ])->id;

        Notification::query()->create([
            'user_id' => $user->id,
            'event_id' => $eventId,
            'type' => 'x',
            'title' => 't',
            'message' => 'm',
            'entity_type' => 'case',
            'entity_id' => '1',
            'action' => 'created',
            'url' => '/dashboard/cases/1',
            'actor_id' => null,
            'event_uuid' => (string) str()->uuid(),
            'meta' => [],
            'read' => false,
        ]);

        Sanctum::actingAs($user);

        $list = $this->getJson('/api/v1/notifications');
        $list->assertOk()->assertJsonPath('data.0.read', false);

        $notificationId = $list->json('data.0.id');
        $this->postJson('/api/v1/notifications/'.$notificationId.'/read')->assertOk();
        $this->getJson('/api/v1/notifications/unread-count')->assertOk()->assertJsonPath('unread_count', 0);
    }
}
