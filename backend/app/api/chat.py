import uuid
from fastapi import APIRouter, HTTPException
from app.core.schemas import ChatRequest, ChatResponse
from app.services.gemini_service import generate_chat_response
from app.services.chroma_service import query_documents

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def process_chat(payload: ChatRequest):
    try:
        # 1. Assign a session ID if the frontend didn't provide one
        session_id = payload.session_id or str(uuid.uuid4())
        # 2. Query ChromaDB for relevant RAG context based on user message
        retrieved_context = query_documents(payload.message)
        # 3. Generate the response using Gemini
        ai_response = await generate_chat_response(
            message=payload.message,
            session_id=session_id,
            retrieved_context=retrieved_context
        )
        return ai_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))