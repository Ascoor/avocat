<?php

namespace App\Providers;

use App\Models\LegCase;
use App\Models\LegalSession;
use App\Policies\LegCasePolicy;
use App\Policies\LegalSessionPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use App\Events\EntityChanged;
use App\Events\AssignmentChanged;
use App\Events\UserPermissionsChanged;
use App\Listeners\NotifySuperAdmins;
use App\Listeners\NotifyAssigneeLawyer;
use App\Listeners\NotifyAffectedUser;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(LegCase::class, LegCasePolicy::class);
        Gate::policy(LegalSession::class, LegalSessionPolicy::class);


        Event::listen(EntityChanged::class, NotifySuperAdmins::class);
        Event::listen(AssignmentChanged::class, NotifyAssigneeLawyer::class);
        Event::listen(UserPermissionsChanged::class, NotifyAffectedUser::class);

        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input('email');

            return Limit::perMinute(5)->by($email.$request->ip());
        });
    }
}
