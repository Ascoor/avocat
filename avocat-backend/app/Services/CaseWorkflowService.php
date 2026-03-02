<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;

class CaseWorkflowService
{
    public const STATUS_PREPARING = 'قيد التجهيز';

    public const STATUS_IN_PROGRESS = 'متداولة';

    public const STATUS_COMPLETED = 'منتهية';

    public const STATUS_SUSPENDED = 'معلقة';

    /**
     * @return array<string, array<int, string>>
     */
    public function transitionsMap(): array
    {
        return [
            self::STATUS_PREPARING => [self::STATUS_IN_PROGRESS, self::STATUS_SUSPENDED],
            self::STATUS_IN_PROGRESS => [self::STATUS_COMPLETED, self::STATUS_SUSPENDED],
            self::STATUS_SUSPENDED => [self::STATUS_IN_PROGRESS],
            self::STATUS_COMPLETED => [],
        ];
    }

    /**
     * @return array<int, string>
     */
    public function allowedNextStatuses(string $currentStatus): array
    {
        return $this->transitionsMap()[$currentStatus] ?? [];
    }

    public function canTransition(string $currentStatus, string $nextStatus): bool
    {
        if ($currentStatus === $nextStatus) {
            return true;
        }

        return in_array($nextStatus, $this->allowedNextStatuses($currentStatus), true);
    }

    public function validateTransition(string $currentStatus, string $nextStatus): void
    {
        if ($this->canTransition($currentStatus, $nextStatus)) {
            return;
        }

        $allowed = $this->allowedNextStatuses($currentStatus);
        $allowedMessage = empty($allowed) ? 'لا توجد انتقالات متاحة.' : implode('، ', $allowed);

        throw ValidationException::withMessages([
            'status' => [
                "لا يمكن نقل الحالة من {$currentStatus} إلى {$nextStatus}. الحالات المسموحة: {$allowedMessage}",
            ],
        ]);
    }
}

