from fastapi import FastAPI, Request, Header
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import httpx
import os
import uvicorn


# تحميل إعدادات البيئة
load_dotenv()

app = FastAPI(title="Court Case Search API - Modernized")

# إعداد CORS للسماح بالمجالات المحددة
allowed_origins = os.environ.get("FASTAPI_ALLOWED_ORIGINS", "*").split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# إعداد الملفات الثابتة والقوالب
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# الصفحة الرئيسية (نفس المسار القديم)
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("search_form.html", {"request": request})


# نموذج الطلب الجديد (مع توافق للأسماء القديمة)
class SearchRequest(BaseModel):
    degreeId: int
    courtId: int
    caseTypeId: int
    caseYear: int
    caseNumber: int

    @classmethod
    def from_legacy(cls, data: dict):
        """تحويل الطلب القديم إلى الهيكل الجديد"""
        return cls(
            degreeId=int(data.get("degreeId") or data.get("degree") or 0),
            courtId=int(data.get("courtId") or data.get("court") or 0),
            caseTypeId=int(data.get("caseTypeId") or data.get("caseType") or 0),
            caseYear=int(data.get("caseYear") or 0),
            caseNumber=int(data.get("caseNumber") or 0),
        )


# دالة استدعاء API وزارة العدل الجديدة
async def fetch_case_status(data: SearchRequest):
    url = "https://moj.gov.eg/backend/api/courts-services/case-current-status"

    headers = {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Referer": "https://moj.gov.eg/services/courts/10050004",
    }

    async with httpx.AsyncClient(verify=False, timeout=30) as client:
        response = await client.post(url, headers=headers, json=data.dict())
        response.raise_for_status()
        return response.json()


# المسار الرئيسي /search
@app.post("/search")
async def search_case(request: Request, x_request_source: str = Header(None)):
    try:
        body = await request.json()
        data = SearchRequest.from_legacy(body)

        # إرسال الطلب إلى واجهة وزارة العدل
        result = await fetch_case_status(data)

        # النتيجة الصحيحة تأتي داخل content → result
        case_info = result.get("content", {}).get("result")

        if case_info:
            return JSONResponse(status_code=200, content=case_info)

        return JSONResponse(
            status_code=404,
            content={"message": "لم يتم العثور على تفاصيل هذه الدعوى"},
        )

    except httpx.HTTPStatusError as e:
        return JSONResponse(
            status_code=e.response.status_code,
            content={"error": f"فشل الاتصال بخدمة وزارة العدل: {str(e)}"},
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"حدث خطأ داخلي: {str(e)}"},
        )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 9100))
    uvicorn.run("main:app", host="0.0.0.0", port=port, proxy_headers=True)
