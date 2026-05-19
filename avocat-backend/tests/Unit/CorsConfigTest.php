<?php

namespace Tests\Unit;

use Tests\TestCase;

class CorsConfigTest extends TestCase
{
    public function test_default_cors_origins_include_public_ask_ar_domains(): void
    {
        $allowedOrigins = config('cors.allowed_origins');

        $this->assertContains('https://ask-ar.net', $allowedOrigins);
        $this->assertContains('https://www.ask-ar.net', $allowedOrigins);
    }
}
