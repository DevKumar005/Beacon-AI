from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat

app = FastAPI(title="BEACON AI Backend Engine", version="1.0.0")

# Explicitly declare permitted URLs instead of using "*"
origins = [
    "http://localhost:5173",    # Member 2's local development server
    "http://127.0.0.1:5173",    # Local loopback address fallback
    # Add Member 2's Vercel production URL here once they deploy it!
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Applied the permitted list here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api", tags=["Core Chat Routing Engine"])

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "BEACON-AI Base Server Engine running"}