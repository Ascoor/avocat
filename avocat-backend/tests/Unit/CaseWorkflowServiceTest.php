<?php

namespace Tests\Unit;

use App\Services\CaseWorkflowService;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class CaseWorkflowServiceTest extends TestCase
{
    public function test_allows_valid_transition(): void
    {
        $service = new CaseWorkflowService();

        $this->assertTrue(
            $service->canTransition(CaseWorkflowService::STATUS_PREPARING, CaseWorkflowService::STATUS_IN_PROGRESS)
        );
    }

    public function test_rejects_invalid_transition(): void
    {
        $service = new CaseWorkflowService();

        $this->assertFalse(
            $service->canTransition(CaseWorkflowService::STATUS_PREPARING, CaseWorkflowService::STATUS_COMPLETED)
        );
    }

    public function test_validate_transition_throws_with_clear_error_message(): void
    {
        $service = new CaseWorkflowService();

        $this->expectException(ValidationException::class);

        $service->validateTransition(CaseWorkflowService::STATUS_PREPARING, CaseWorkflowService::STATUS_COMPLETED);
    }
}

