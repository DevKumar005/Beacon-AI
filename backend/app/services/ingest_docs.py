import os
from app.services.chroma_service import chroma_client, collection

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    words = text.split()
    chunks = []
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
        print(f"❌ Error: The directory '{docs_dir}' does not exist.")
        return

    files = [f for f in os.listdir(docs_dir) if f.endswith('.txt')]
    if not files:
        print("⚠️ No raw text files found inside data/eligibility_docs/.")
        return

    print("🧹 Cleaning out old vector documents from collection...")
    try:
        chroma_client.delete_collection("eligibility_rules")
    except Exception:
        pass
    
    # Re-fetch or re-create clean collection
    from app.services.chroma_service import sentence_transformer_ef
    clean_collection = chroma_client.get_or_create_collection(
        name="eligibility_rules",
        embedding_function=sentence_transformer_ef
    )

    print(f"📖 Found {len(files)} policy files. Executing clean database load...")

    global_id_counter = 0
    for filename in files:
        file_path = os.path.join(docs_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()

        text_chunks = chunk_text(raw_content)
        print(f"📄 Processing '{filename}': Created {len(text_chunks)} segments.")

        documents = []
        metadatas = []
        ids = []

        for i, chunk in enumerate(text_chunks):
            documents.append(chunk)
            metadatas.append({"source_file": filename})
            ids.append(f"doc_{filename}_{i}_{global_id_counter}")
            global_id_counter += 1

        clean_collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

    print(f"✅ Ingestion complete! Current clean vector count: {clean_collection.count()}")

if __name__ == "__main__":
    run_ingestion()