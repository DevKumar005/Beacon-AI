import os
import shutil
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv

load_dotenv()

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

CHROMA_PATH = os.path.join(BACKEND_DIR, "chroma_db")
DATA_PATH = os.path.join(PROJECT_ROOT, "data", "eligibility_docs")

def main():
    if not os.path.exists(DATA_PATH):
        print(f"❌ ERROR: Cannot find the data folder at {DATA_PATH}")
        return

    if os.path.exists(CHROMA_PATH):
        print("🧹 Cleaning out old vector documents from collection...")
        shutil.rmtree(CHROMA_PATH)
    
    loader = DirectoryLoader(DATA_PATH, glob="*.txt", loader_cls=TextLoader)
    documents = loader.load()
    print(f"📖 Found {len(documents)} policy files. Executing clean database load...")
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    print(f"📄 Processing documents: Created {len(chunks)} segments.")
    
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_PATH)
    
    print(f"✅ Ingestion complete! Current clean vector count: {db._collection.count()}")

if __name__ == "__main__":
    main()