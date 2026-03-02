<?php

namespace Tests\Unit;

use App\Models\CaseSubType;
use App\Models\CaseType;
use App\Models\Court;
use App\Models\CourtLevel;
use App\Models\CourtType;
use App\Models\Lawyer;
use App\Models\LegalSession;
use App\Models\LegalSessionType;
use App\Models\LegCase;
use App\Models\User;
use App\Services\SessionSchedulingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class SessionSchedulingServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_throws_validation_when_lawyer_has_conflicting_session_on_same_date(): void
    {
        $data = $this->seedSessionDependencies();
        LegalSession::query()->create([
            'legal_session_type_id' => $data['sessionType']->id,
            'leg_case_id' => $data['legCase']->id,
            'court_id' => $data['court']->id,
            'session_date' => '2026-05-01',
            'lawyer_id' => $data['lawyer']->id,
            'created_by' => $data['user']->id,
            'session_roll' => 'A1',
        ]);

        $service = new SessionSchedulingService();

        $this->expectException(ValidationException::class);
        $service->ensureNoConflicts($data['lawyer']->id, $data['court']->id, '2026-05-01', 'B2');
    }

    public function test_throws_validation_when_court_roll_conflicts_on_same_date(): void
    {
        $data = $this->seedSessionDependencies();
        $otherLawyer = Lawyer::query()->create([
            'name' => 'Lawyer B',
            'birthdate' => '1990-01-01',
            'identity_number' => '10000000000099',
            'law_reg_num' => 'REG-99',
            'lawyer_class' => 'إبتدائي',
            'email' => 'lawyer-b@example.test',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'user_id' => User::factory()->create()->id,
        ]);

        LegalSession::query()->create([
            'legal_session_type_id' => $data['sessionType']->id,
            'leg_case_id' => $data['legCase']->id,
            'court_id' => $data['court']->id,
            'session_date' => '2026-05-01',
            'lawyer_id' => $data['lawyer']->id,
            'created_by' => $data['user']->id,
            'session_roll' => 'R-10',
        ]);

        $service = new SessionSchedulingService();

        $this->expectException(ValidationException::class);
        $service->ensureNoConflicts($otherLawyer->id, $data['court']->id, '2026-05-01', 'R-10');
    }

    /**
     * @return array<string, mixed>
     */
    private function seedSessionDependencies(): array
    {
        $user = User::factory()->create();
        $caseType = CaseType::query()->create(['name' => 'Civil']);
        $caseSubType = CaseSubType::query()->create(['name' => 'Primary', 'case_type_id' => $caseType->id]);
        $legCase = LegCase::query()->create([
            'slug' => 'CASE-1',
            'title' => 'Case',
            'description' => 'Desc',
            'case_type_id' => $caseType->id,
            'case_sub_type_id' => $caseSubType->id,
            'client_capacity' => 'plaintiff',
            'created_by' => $user->id,
        ]);
        $sessionType = LegalSessionType::query()->create(['name' => 'جلسة']);
        $courtType = CourtType::query()->create(['name' => 'نوع']);
        $courtLevel = CourtLevel::query()->create(['name' => 'مستوى']);
        $court = Court::query()->create([
            'name' => 'Court 1',
            'court_type_id' => $courtType->id,
            'court_level_id' => $courtLevel->id,
        ]);
        $lawyer = Lawyer::query()->create([
            'name' => 'Lawyer A',
            'birthdate' => '1990-01-01',
            'identity_number' => '10000000000001',
            'law_reg_num' => 'REG-1',
            'lawyer_class' => 'إبتدائي',
            'email' => 'lawyer-a@example.test',
            'gender' => 'ذكر',
            'religion' => 'مسلم',
            'user_id' => $user->id,
        ]);

        return compact('user', 'legCase', 'sessionType', 'court', 'lawyer');
    }
}

