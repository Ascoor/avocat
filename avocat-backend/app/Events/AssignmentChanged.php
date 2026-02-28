<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AssignmentChanged
{
    use Dispatchable, SerializesModels;

    /**
     * @param  array<string,mixed>  $payload
     */
    public function __construct(public array $payload)
    {
    }
}
