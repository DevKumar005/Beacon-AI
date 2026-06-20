import uvicorn
from fastapi import FastAPI
from app.api.chat import router  # <--- CORRECTED IMPORT HERE

app = FastAPI(title="BEACON AI API")

# This maps to http://127.0.0.1:8000/api/chat
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)