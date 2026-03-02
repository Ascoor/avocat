<?php

namespace App\Services;

use App\Models\LegalSession;
use Illuminate\Validation\ValidationException;

class SessionSchedulingService
{
    public function ensureNoConflicts(
        int|string $lawyerId,
        int|string $courtId,
        string $sessionDate,
        ?string $sessionRoll = null,
        ?int $ignoreSessionId = null,
    ): void {
        $lawyerConflict = LegalSession::query()
            ->where('lawyer_id', $lawyerId)
            ->whereDate('session_date', $sessionDate)
            ->when($ignoreSessionId, fn ($query) => $query->where('id', '!=', $ignoreSessionId))
            ->exists();

        if ($lawyerConflict) {
            throw ValidationException::withMessages([
                'session_date' => ['يوجد تعارض: المحامي لديه جلسة أخرى في نفس التاريخ.'],
            ]);
        }

        if (! $sessionRoll) {
            return;
        }

        $courtRollConflict = LegalSession::query()
            ->where('court_id', $courtId)
            ->whereDate('session_date', $sessionDate)
            ->where('session_roll', $sessionRoll)
            ->when($ignoreSessionId, fn ($query) => $query->where('id', '!=', $ignoreSessionId))
            ->exists();

        if ($courtRollConflict) {
            throw ValidationException::withMessages([
                'session_roll' => ['يوجد تعارض: رقم الرول محجوز بالفعل لنفس المحكمة والتاريخ.'],
            ]);
        }
    }
}

