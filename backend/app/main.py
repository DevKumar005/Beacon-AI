from fastapi import FastAPI, Request, Response
from app.api import chat

# CRITICAL FIX 1: strict_slashes=False prevents 307 redirects that drop CORS headers
app = FastAPI(title="BEACON AI Backend Engine", version="1.0.0", strict_slashes=False)

# CRITICAL FIX 2: The Silver Bullet Hack
# Catch all traffic at the ASGI entry point level to force CORS headers onto every single packet
@app.middleware("http")
async def force_global_cors_bypass(request: Request, call_next):
    # 1. If it's a browser preflight OPTIONS request, short-circuit it immediately with a 200 OK
    if request.method == "OPTIONS":
        response = Response(status_code=200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "*"
        response.headers["Access-Control-Max-Age"] = "86400"
        return response

    # 2. For standard POST/GET requests, process the route and forcibly stamp the headers
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

# Include the router downstream of our entry-point interceptor
app.include_router(chat.router, prefix="/api", tags=["Core Chat Routing Engine"])

@app.get("/")
async def health_check():
    return {"status": "healthy", "service": "BEACON-AI Base Server Engine running"}