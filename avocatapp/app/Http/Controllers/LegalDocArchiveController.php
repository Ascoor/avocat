<?php

namespace App\Http\Controllers;

use App\Models\DocSubType;
use App\Models\DocType;
use App\Models\LegalDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use Spatie\PdfToImage\Pdf;

class LegalDocArchiveController extends Controller
{
    public function uploadLegalDoc(Request $request)
    {
        // تحقق من صحة البيانات المرسلة
        $request->validate([
            'file' => 'required|mimes:doc,docx|max:2048', // التحقق من نوع الملف وحجمه
            'docTypeId' => 'required|exists:doc_types,id', // التحقق من وجود نوع المستند
            'docSubTypeId' => 'required|exists:doc_sub_types,id', // التحقق من وجود نوع الفرعي للمستند
            'legalDocDescription' => 'required', // التحقق من وجود نوع الفرعي للمستند
        ]);

        // العثور على نوع المستند ونوعه الفرعي
        $docType = DocType::find($request->docTypeId);
        $docSubType = DocSubType::find($request->docSubTypeId);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();

            // حفظ الملف الـ Word
            $wordPath = $file->storeAs(
                'legal_docs/' . $docType->name . '/' . $docSubType->name,
                $fileName,
                'public'
            );

            // تحديث الملف الـ Word إذا كان ذلك مطلوبًا
            // Ex: $wordDocument->getSections()[0]->addText('New Text');
            $wordDocument = IOFactory::load(storage_path('app/public/' . $wordPath));
            // القاموس المستخدم للتحديثات المطلوبة يمكن أن يضاف هنا

            $wordDocument->save(storage_path('app/public/' . $wordPath));

            // تحويل الملف الـ Word إلى ملف PDF
            $pdfPath = str_replace(['.doc', '.docx'], '.pdf', $wordPath);
            $pdfPath = storage_path('app/public/' . $pdfPath);

            $wordDocument->save($pdfPath, 'PDF');

            $htmlPath = str_replace(['.doc', '.docx'], '.html', $wordPath);
            $htmlPath = storage_path('app/public/' . $htmlPath);
            \PhpOffice\PhpWord\Settings::setPdfRendererPath('/path/to/mpdf');
            \PhpOffice\PhpWord\Settings::setPdfRendererName('MPDF');
            $wordDocument->save($htmlPath, 'HTML');
            
            // إنشاء لقطات مصغرة لكل صفحة في ملف PDF
            $thumbnails = [];
            $pdf = new Pdf($pdfPath);
            $pageCount = $pdf->getNumberOfPages();
            for ($page = 1; $page <= $pageCount; $page++) {
                $thumbnailPath = 'legal_docs/thumbnails/' . pathinfo($pdfPath)['filename'] . "_page_$page.jpg";
                $pdf->setPage($page)
                    ->setOutputFormat('jpg')
                    ->saveImage(storage_path('app/public/' . $thumbnailPath));
                $thumbnails[] = asset('storage/' . $thumbnailPath);
            }
            
            // حفظ المعلومات في قاعدة البيانات
            $legalDoc = LegalDoc::create([
                // ...[باقي البيانات كما هي]...
                'doc_type_id' => $request->input('docTypeId'),
                'doc_sub_type_id' => $request->input('docSubTypeId'),
                'path' => $pdfPath, // مسار PDF
                'html_path' => $htmlPath, // مسار HTML
                'thumbnails' => json_encode($thumbnails), // مسارات اللقطات المصغرة
                'description' => $request->input('legalDocDescription'),
            ]);
            
            $pdfUrl = asset('storage/' . $pdfPath);
           
            // إعادة الاستجابة مع روابط الملفات
            return response()->json([
                'message' => 'تم رفع الملف بنجاح',
                'pdf_url' => $pdfUrl,
                'html_url' => asset('storage/' . $htmlPath), // رابط HTML
                'thumbnails' => $thumbnails, // روابط اللقطات المصغرة
            ]);
        }
    }
    } 