import chromadb
from chromadb.utils import embedding_functions

# Initialize a local persistent ChromaDB client inside the backend folder
chroma_client = chromadb.PersistentClient(path="./chroma_db")

# Use the lightweight MiniLM embedding model as requested
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

# Create or load the document collection
collection = chroma_client.get_or_create_collection(
    name="eligibility_rules",
    embedding_function=sentence_transformer_ef
)

def query_documents(query_text: str, n_results: int = 2) -> str:
    """Queries the local vector DB for relevant eligibility rules."""
    if collection.count() == 0:
        return ""
    
    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )
    
    if results['documents'] and results['documents'][0]:
        # Combine the retrieved text chunks into a single context string
        return "\n".join(results['documents'][0])
    return ""