# backend/Dockerfile
FROM python:3.9-alpine
WORKDIR /app
# This includes vector_index.pkl
COPY . .  
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]
