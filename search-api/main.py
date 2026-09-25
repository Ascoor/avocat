from fastapi import FastAPI, Request, Header
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel, PositiveInt, ValidationError
import httpx
import os
import uvicorn


# تحميل إعدادات البيئة
load_dotenv()

app = FastAPI(title="Court Case Search API - Modernized")

# إعداد CORS للسماح بالمجالات المحددة
allowed_origins = [
    origin.strip()
    for origin in os.environ.get(
        "FASTAPI_ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:8080",
    ).split(",")
    if origin.strip()
]
if "*" in allowed_origins:
    raise RuntimeError(
        "FASTAPI_ALLOWED_ORIGINS must list explicit origins when credentials are enabled"
    )
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
    degreeId: PositiveInt
    courtId: PositiveInt
    caseTypeId: PositiveInt
    caseYear: PositiveInt
    caseNumber: PositiveInt

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

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(url, headers=headers, json=data.model_dump())
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

    except httpx.HTTPStatusError:
        return JSONResponse(
            status_code=502,
            content={"error": "فشل الاتصال بخدمة وزارة العدل"},
        )
    except (ValidationError, ValueError, TypeError):
        return JSONResponse(
            status_code=422,
            content={"error": "بيانات البحث غير صالحة"},
        )
    except httpx.RequestError:
        return JSONResponse(
            status_code=502,
            content={"error": "تعذر الاتصال بخدمة وزارة العدل"},
        )
    except Exception:
        return JSONResponse(
            status_code=500,
            content={"error": "حدث خطأ داخلي"},
        )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 9100))
    host = os.environ.get("HOST", "127.0.0.1")
    uvicorn.run("main:app", host=host, port=port, proxy_headers=True)
