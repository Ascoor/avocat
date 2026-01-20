<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;


class WebScraperController extends Controller
{
    public function loginAndRetrieveSessionToken()
{
    // إعداد العميل Guzzle
    $client = new Client();

    // الخطوة 1: افتح الصفحة التي تحتوي على الزر "الدخول"
    $pageUrl = 'https://ilawyer.innovativedo.com';
    $response1 = $client->get($pageUrl);

    // التحقق من نجاح جلب الصفحة
    if ($response1->getStatusCode() === 200) {
        // تم جلب الصفحة بنجاح

        // الخطوة 2: الآن يمكنك استخدام JavaScript لعرض النموذج
        $script = "
            var modal = document.querySelector('.modal');
            modal.style.display = 'block';
        ";

        // قم بتنفيذ السكربت باستخدام executeScript في العميل Guzzle
        $client->executeScript($script);

        // الآن يتم عرض النموذج دون الحاجة للضغط على الزر "الدخول"

        // يمكنك المضي في الخطوات اللاحقة
    } else {
        // حدث خطأ أثناء جلب الصفحة
        return response()->json(['error' => 'Failed to fetch the page']);
    }

    // الآن يمكنك المضي في الخطوات اللاحقة
}
}
