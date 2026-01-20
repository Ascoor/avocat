FROM python:3.11-slim

WORKDIR /app
COPY search-api/ /app/

RUN pip install --no-cache-dir --upgrade pip \
 && if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi \
 && pip install --no-cache-dir "uvicorn[standard]"

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
