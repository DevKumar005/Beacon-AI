import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from app.core.schemas import ChatResponse

# 1. Initialization & Auth
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 2. Responsible AI System Prompts
SYSTEM_INSTRUCTION = """
You are BEACON AI, an empathetic screening engine helping individuals analyze potential alignment with social assistance programs.

CRITICAL RESPONSIBLE AI & GUARDRAIL RULES:
1. LEGAL FRAME: Never say "you qualify" or "you are eligible". Always use conditional language like "you may qualify".
2. DATA COLLECTION BOUNDARY (Vague Inputs): If the user's message is brief or lacks specific household data (income, size), you MUST set "eligibility_status" to "need_more_info" and "human_referral" to false. Do not trigger a human referral for simple vague questions.
3. HIGH-RISK ESCALATION: If the user mentions complex immigration indicators (e.g., "undocumented"), extreme crisis, or unknown legal edge cases, you MUST set "eligibility_status" to "refer_to_human" and "human_referral" to true.
"""

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
    {retrieved_context if retrieved_context else "No specific document context found."}
    ---

    User Assessment Scenario: {message}

    Return a valid JSON object with exactly these keys and rules:
    - scenario (string: brief summary)
    - reply (string: conversational empathetic response)
    - eligibility_status (string: MUST BE EXACTLY ONE OF THESE: "may_qualify", "unlikely", "need_more_info", or "refer_to_human". If input is vague, use "need_more_info". If input mentions undocumented or crisis, use "refer_to_human". Otherwise, use "may_qualify".)
    - matched_programs (list of strings)
    - reasons (list of strings)
    - next_steps (list of strings)
    - source (string)
    - confidence (string: "high", "medium", or "low")
    - human_referral (boolean: true if eligibility_status is "refer_to_human", otherwise false)
    - follow_up_expected (boolean: true or false)
    - suggested_input_chips (list of strings)
    """

    try:
        # API execution wrapper
        response = chat_session.send_message(prompt)
        raw_text = response.text.strip()
        
        # Strip potential markdown tick artifacts
        if raw_text.startswith("```"):
            raw_text = raw_text.split("```")[1]
            if raw_text.startswith("json"):
                raw_text = raw_text[4:]
        
        response_data = json.loads(raw_text.strip())

        # Direct Sanitization Sync
        if "eligibility_status" in response_data:
            response_data["eligibility_status"] = str(response_data["eligibility_status"]).lower().strip()
        else:
            response_data["eligibility_status"] = "need_more_info"

        # Explicitly enforce the boolean flags based directly on the status text
        if response_data["eligibility_status"] == "refer_to_human":
            response_data["human_referral"] = True
        elif response_data["eligibility_status"] == "need_more_info":
            response_data["human_referral"] = False
            response_data["follow_up_expected"] = True
        else:
            response_data["human_referral"] = False

        # Structural array verification
        for list_key in ["matched_programs", "reasons", "next_steps", "suggested_input_chips"]:
            if list_key not in response_data or not isinstance(response_data[list_key], list):
                response_data[list_key] = []

        return ChatResponse(
            scenario=response_data.get("scenario", "Assessment Request"),
            reply=response_data.get("reply", "Reviewing your details..."),
            eligibility_status=response_data["eligibility_status"],
            matched_programs=response_data["matched_programs"],
            reasons=response_data["reasons"],
            next_steps=response_data["next_steps"],
            source=response_data.get("source", "Screening Engine Database"),
            confidence=response_data.get("confidence", "medium"),
            human_referral=response_data["human_referral"],
            follow_up_expected=response_data.get("follow_up_expected", False),
            suggested_input_chips=response_data["suggested_input_chips"]
        )
        
    except Exception as e:
        print(f"⚠️ Fallback Active: {e}")
        # Default fallback to catch exceptions cleanly
        return ChatResponse(
            scenario="Administrative Processing Safeguard",
            reply="Your case exhibits unique context parameters. We are linking you directly with an intake manager.",
            eligibility_status="refer_to_human",
            matched_programs=[],
            reasons=["API process variance fallback activated safely."],
            next_steps=["Consult your municipal agency support counselor."],
            source="System Safety Fallback Guardrail Engine",
            confidence="low",
            human_referral=True,
            follow_up_expected=True,
            suggested_input_chips=["Find Human Help"]
        )