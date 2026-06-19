import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from app.core.schemas import ChatResponse

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# The Master System Prompt (Responsible AI Guardrails)
SYSTEM_INSTRUCTION = """
You are BEACON AI, an empathetic, highly accurate assistant helping users determine eligibility for social assistance programs (like SNAP, Medicaid, Housing).

CRITICAL RULES:
1. LEGAL GUARDRAIL: You must NEVER say "you qualify" or "you are eligible". You MUST ALWAYS use conditional language like "you may qualify" or "you might be eligible".
2. ESCALATION: If the user indicates mixed immigration status, incomplete data, or complex edge cases, set "human_referral" to true, "confidence" to "low", and "eligibility_status" to "refer_to_human".
3. OUTPUT FORMAT: You must strictly output valid JSON matching the requested schema.
"""

# Initialize Gemini 1.5 Flash with JSON mode
model = genai.GenerativeModel(
    model_name="gemini-3.5-flash",
    system_instruction=SYSTEM_INSTRUCTION,
    generation_config={"response_mime_type": "application/json"}
)

# In-memory dictionary to track conversational context (Session ID -> Chat Object)
# Note: For a hackathon, in-memory is fine. For production, this would be Redis/Postgres.
active_sessions = {}

async def generate_chat_response(message: str, session_id: str, retrieved_context: str = "") -> ChatResponse:
    # 1. Retrieve or create the chat session
    if session_id not in active_sessions:
        active_sessions[session_id] = model.start_chat(history=[])
    
    chat_session = active_sessions[session_id]

    # 2. Inject RAG context (if any) and the explicit JSON schema requirement
    prompt = f"""
    Context Rules Document: {retrieved_context if retrieved_context else "No specific document context retrieved yet."}
    
    User Message: {message}
    
    Respond with a JSON object using exactly these keys:
    - scenario (string: brief summary)
    - reply (string: empathetic conversational response)
    - eligibility_status (string: strictly "may_qualify", "unlikely", "need_more_info", or "refer_to_human")
    - matched_programs (list of strings)
    - reasons (list of strings: why you made this decision)
    - next_steps (list of strings: actionable advice)
    - source (string: cite the context document if used)
    - confidence (string: strictly "high", "medium", or "low")
    - human_referral (boolean)
    - follow_up_expected (boolean)
    - suggested_input_chips (list of strings: 2-3 quick reply buttons for the user)
    """

    # 3. Send to Gemini
    response = chat_session.send_message(prompt)
    
    # 4. Parse and Validate via Pydantic
    try:
        response_data = json.loads(response.text)
        return ChatResponse(**response_data)
    except Exception as e:
        # Fallback if Gemini hallucinates the format
        print(f"JSON Parse Error: {e}")
        raise ValueError("AI failed to return valid structured data.")