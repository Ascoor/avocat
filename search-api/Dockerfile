FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=9100

WORKDIR /app
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 9100
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-9100} --proxy-headers --forwarded-allow-ips='*'"]
