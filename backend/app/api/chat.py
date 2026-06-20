from fastapi import APIRouter, HTTPException
from app.core.schemas import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def process_chat(payload: ChatRequest):
    try:
        # Milestone 1 Blueprint: Echoing structural contract back to client.
        # This will be replaced with real Gemini + ChromaDB logic next.
        return ChatResponse(
            scenario="Initialization Check",
            reply=f"Receiver message: '{payload.message}'. BEACON backend connected successfully.",
            eligibility_status="need_more_info",
            matched_programs=[],
            reasons=["FastAPI scaffold successfully processed payload configuration"],
            next_steps=["Awaiting live AI orchestration integration layer"],
            source="System Engine Blueprint",
            confidence="high",
            human_referral=False,
            follow_up_expected=True,
            suggested_input_chips=["Test Live Endpoints"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))