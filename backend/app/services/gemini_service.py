import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from app.core.schemas import ChatResponse

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Enriched Responsible AI System Rules
SYSTEM_INSTRUCTION = """
You are BEACON AI, an empathetic, highly accurate screening engine helping individuals analyze their potential alignment with social assistance programs.

CRITICAL RESPONSIBLE AI DISCLAIMERS & SAFETY RULES:
1. LEGAL SAFETY FRAME: You do NOT make legal determinations. You must NEVER say "you qualify" or "you are eligible". You MUST ALWAYS use conditional framing such as "you may qualify" or "you might meet criteria".
2. VAGUE INPUT HANDLING: If the user input is brief, abstract, or lacks key socioeconomic data (e.g., missing specific income details, state location, or household sizes), you must:
   - set "confidence" to "low"
   - set "eligibility_status" to "need_more_info"
   - populate "suggested_input_chips" with explicit data needs (e.g., ["Provide Monthly Income", "Specify Household Size"])
3. HIGH-RISK ESCALATION: If the user mentions complex immigration indicators (e.g., "undocumented", "visa status holder"), emergency crisis status, or scenarios completely absent from the provided RAG context, you must trigger Human-in-the-Loop protection:
   - set "human_referral" to true
   - set "eligibility_status" to "refer_to_human"
   - set "confidence" to "low"
   - direct them clearly to professional case managers or legal advocates in the "reply" and "next_steps" fields.
"""

# Maintain Gemini 3.5 Flash JSON mapping instances
model = genai.GenerativeModel(
    model_name="gemini-3.5-flash",
    system_instruction=SYSTEM_INSTRUCTION,
    generation_config={"response_mime_type": "application/json"}
)

active_sessions = {}

async def generate_chat_response(message: str, session_id: str, retrieved_context: str = "") -> ChatResponse:
    if session_id not in active_sessions:
        active_sessions[session_id] = model.start_chat(history=[])
    
    chat_session = active_sessions[session_id]

    prompt = f"""
    Retrieved Policy Database Context Chunk:
    ---
    {retrieved_context if retrieved_context else "No baseline policy file chunk found for this specific query."}
    ---

    User Assessment Scenario: {message}

    Generate a valid JSON object matching this schema blueprint:
    - scenario (string)
    - reply (string - compassionate and conditionally framed)
    - eligibility_status (string: MUST BE "may_qualify", "unlikely", "need_more_info", or "refer_to_human")
    - matched_programs (list of strings)
    - reasons (list of strings explaining logic checklist evaluation details)
    - next_steps (list of strings)
    - source (string tracking file origin if context matches, otherwise specify "General Screening Database")
    - confidence (string: "high", "medium", or "low")
    - human_referral (boolean)
    - follow_up_expected (boolean)
    - suggested_input_chips (list of strings)
    """

    response = chat_session.send_message(prompt)
    
    try:
        response_data = json.loads(response.text)
        return ChatResponse(**response_data)
    except Exception as e:
        print(f"Schema Validation/Parsing Error: {e}")
        raise ValueError("System generated structural variance. Re-attempt parsing rules.")