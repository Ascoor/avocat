<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\DocumentTab;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_manage_document_tabs(): void
    {
        $this->actingAs(User::factory()->create(), 'sanctum');

        $create = $this->postJson('/api/v1/document-tabs', [
            'name_ar' => 'القضايا',
            'name_en' => 'Cases',
            'tab_type' => 'leg_case',
        ]);

        $create->assertCreated()->assertJsonFragment(['name_en' => 'Cases']);

        $tabId = $create->json('id');

        $this->getJson('/api/v1/document-tabs')
            ->assertOk()
            ->assertJsonFragment(['id' => $tabId]);

        $this->putJson('/api/v1/document-tabs/'.$tabId, [
            'name_ar' => 'قضايا محدثة',
        ])->assertOk()->assertJsonFragment(['name_ar' => 'قضايا محدثة']);

        $this->deleteJson('/api/v1/document-tabs/'.$tabId)
            ->assertOk();
    }

    public function test_documents_endpoint_filters_by_tab_id(): void
    {
        $this->actingAs(User::factory()->create(), 'sanctum');

        $firstTab = DocumentTab::create([
            'name_ar' => 'القضايا',
            'name_en' => 'Cases',
            'tab_type' => 'leg_case',
        ]);

        $secondTab = DocumentTab::create([
            'name_ar' => 'الخدمات',
            'name_en' => 'Services',
            'tab_type' => 'service',
        ]);

        Document::create([
            'name' => 'Case Doc',
            'file_path' => 'documents/case.pdf',
            'document_tab_id' => $firstTab->id,
        ]);

        Document::create([
            'name' => 'Service Doc',
            'file_path' => 'documents/service.pdf',
            'document_tab_id' => $secondTab->id,
        ]);

        $this->getJson('/api/v1/documents?document_tab_id='.$firstTab->id)
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['name' => 'Case Doc'])
            ->assertJsonMissing(['name' => 'Service Doc']);
    }
}
