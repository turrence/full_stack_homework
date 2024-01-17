FROM python:3

WORKDIR /backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY *.py .

CMD ["hug", "-f",  "main.py"]
EXPOSE 8000