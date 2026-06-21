from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat

# 1. Turn off strict trailing slashes globally
app = FastAPI(title="BEACON AI Backend Engine", version="1.0.0", strict_slashes=False)

# 2. Add the baseline middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ABSOLUTE BULLETPROOF BYPASS: Manually intercept all preflight OPTIONS requests
@app.options("/{path:path}")
async def preflight_handler(path: str):
    response = Response()
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

# 4. Include your core endpoints router
app.include_router(chat.router, prefix="/api", tags=["Core Chat Routing Engine"])

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "BEACON-AI Base Server Engine running"}