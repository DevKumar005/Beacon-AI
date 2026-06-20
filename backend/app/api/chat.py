import os
from fastapi import APIRouter
from app.core.schemas import ChatRequest, ChatResponse
from app.services.gemini_service import generate_chat_response
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# 1. Start with empty variables so the server boots in 0.5 seconds
embeddings = None
db = None

# 2. "Lazy Load" the model only when it is actually needed
def get_db():
    global embeddings, db
    if db is None:
        print("⏳ First request detected: Loading heavy embedding model into memory...")
        from langchain_community.embeddings import HuggingFaceEmbeddings
        from langchain_community.vectorstores import Chroma
        
        CHROMA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "chroma_db")
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)
        print("✅ Model loaded successfully!")
    return db

def query_documents(query: str, n_results: int = 2) -> str:
    # Safely fetch the database (will load it if it's the first time)
    database = get_db()
    results = database.similarity_search(query, k=n_results)
    return "\n---\n".join([doc.page_content for doc in results])

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    retrieved_context = query_documents(request.message)
    response = await generate_chat_response(request.message, request.session_id, retrieved_context)
    return response