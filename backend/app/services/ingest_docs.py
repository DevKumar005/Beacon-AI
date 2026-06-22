import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

load_dotenv()

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)
DATA_PATH = os.path.join(PROJECT_ROOT, "data", "eligibility_docs")

# Initialize Pinecone Client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = "beacon-ai-index"

def main():
    if not os.path.exists(DATA_PATH):
        print(f"❌ ERROR: Cannot find the data folder at {DATA_PATH}")
        return
    
    # Clean out any conflicting index structure 
    if index_name in pc.list_indexes().names():
        print(f"🧹 Deleting existing index to match new model dimensions...")
        pc.delete_index(index_name)
        
    print(f"☁️ Creating active Pinecone cloud index: {index_name}")
    pc.create_index(
        name=index_name,
        dimension=3072,  # REQUIRED size format for models/gemini-embedding-001
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )
    
    # Load Documents
    loader = DirectoryLoader(DATA_PATH, glob="*.txt", loader_cls=TextLoader)
    documents = loader.load()
    print(f"📖 Found {len(documents)} policy files.")
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    print(f"📄 Processing documents: Created {len(chunks)} segments.")
    
    # 3. Generate Active Gemini Embeddings
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001", 
        google_api_key=os.getenv("GEMINI_API_KEY")
    )
    
    print("🚀 Pushing data to Pinecone Cloud...")
    PineconeVectorStore.from_documents(chunks, embeddings, index_name=index_name)
    print(f"✅ Ingestion complete! Data is safely stored in the cloud.")

if __name__ == "__main__":
    main()