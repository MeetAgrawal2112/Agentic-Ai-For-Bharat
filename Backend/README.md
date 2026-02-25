# Backend (FastAPI)

Quick setup for the FastAPI backend.

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Run the development server:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Health endpoints:

- `GET /` -> simple message
- `GET /health` -> {"status":"ok"}
- `GET /items/{item_id}` -> fetch example item
- `POST /items` -> create an item (JSON body: `id`, `name`, `description`)
