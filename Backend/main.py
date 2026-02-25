from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Agentic AI For Bharat - Backend")

# Simple CORS setup allowing all origins for local development
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


class Item(BaseModel):
	id: int
	name: str
	description: Optional[str] = None


_fake_db = {1: {"id": 1, "name": "example", "description": "An example item"}}


@app.get("/")
async def root():
	return {"message": "Agentic AI Backend is running"}


@app.get("/health")
async def health():
	return {"status": "ok"}


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
	item = _fake_db.get(item_id)
	if not item:
		raise HTTPException(status_code=404, detail="Item not found")
	return item


@app.post("/items", response_model=Item, status_code=201)
async def create_item(item: Item):
	if item.id in _fake_db:
		raise HTTPException(status_code=400, detail="Item already exists")
	_fake_db[item.id] = item.dict()
	return item


if __name__ == "__main__":
	import uvicorn

	uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
