import os
from app.services.chroma_service import collection

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """Splits text into overlapping chunks so sentences don't get cut in half."""
    words = text.split()
    chunks = []
    
    # Simple word-based sliding window strategy
    i = 0
    while i < len(words):
        chunk_words = words[i:i + chunk_size]
        chunks.append(" ".join(chunk_words))
        i += chunk_size - overlap
        if i >= len(words) or len(chunk_words) < chunk_size:
            break
            
    return chunks

def run_ingestion():
    docs_dir = "../data/eligibility_docs"
    
    if not os.path.exists(docs_dir):
        print(f"❌ Error: The directory '{docs_dir}' does not exist yet. Ask Member 3 to push it, or create it locally to test.")
        return

    files = [f for f in os.listdir(docs_dir) if f.endswith('.txt')]
    if not files:
        print("⚠️ No raw text files found inside data/eligibility_docs/. Add a dummy file to test.")
        return

    print(f"📖 Found {len(files)} policy files. Starting vector database injection...")

    global_id_counter = 0
    for filename in files:
        file_path = os.path.join(docs_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()

        # Split document text into chunks
        text_chunks = chunk_text(raw_content)
        print(f"📄 Processing '{filename}': Broken down into {len(text_chunks)} segments.")

        # Batch write data into ChromaDB
        documents = []
        metadatas = []
        ids = []

        for i, chunk in enumerate(text_chunks):
            documents.append(chunk)
            metadatas.append({"source_file": filename})
            ids.append(f"doc_{filename}_{i}_{global_id_counter}")
            global_id_counter += 1

        # Push to ChromaDB collection using our default all-MiniLM-L6-v2 embedding pipeline
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

    print(f"✅ Ingestion complete! Total items added to local database vector store: {collection.count()}")

if __name__ == "__main__":
    run_ingestion()