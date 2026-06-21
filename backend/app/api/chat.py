import os
from fastapi import APIRouter
from app.core.schemas import ChatRequest, ChatResponse
from app.services.gemini_service import generate_chat_response
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv

load_dotenv()

# CRITICAL FIX 3: Turn off strict slashes at the router level
# This means both "/api/chat" and "/api/chat/" will map successfully without throwing a 405
router = APIRouter()

# 1. Initialize Google Embeddings 
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# 2. Connect to Cloud Vector Database
index_name = "beacon-ai-index"
vectorstore = PineconeVectorStore(index_name=index_name, embedding=embeddings)

def query_documents(query: str, n_results: int = 2) -> str:
    results = vectorstore.similarity_search(query, k=n_results)
    return "\n---\n".join([doc.page_content for doc in results])

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    retrieved_context = query_documents(request.message)
    response = await generate_chat_response(request.message, request.session_id, retrieved_context)
    return response