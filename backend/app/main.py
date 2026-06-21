from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat

app = FastAPI(title="BEACON AI Backend Engine", version="1.0.0")

# Bulletproof CORS: allow EVERYTHING by disabling credentials requirement
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # Allows every origin unconditionally
    allow_credentials=False,       # CRITICAL: Must be False for wildcard (*) to work on cloud hosts
    allow_methods=["*"],           # Allows all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],           # Allows all custom headers
)

app.include_router(chat.router, prefix="/api", tags=["Core Chat Routing Engine"])

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "BEACON-AI Base Server Engine running"}