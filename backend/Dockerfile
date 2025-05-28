# backend/Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY . .  # This includes vector_index.pkl
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]
