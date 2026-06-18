from pydantic import BaseModel, Field
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's input scenario or question")
    session_id: Optional[str] = Field(None, description="To track history conversational context")

class ChatResponse(BaseModel):
    scenario: str
    reply: str
    eligibility_status: str = Field(..., description="Must be: may_qualify, unlikely, need_more_info, or refer_to_human")
    matched_programs: List[str]
    reasons: List[str]
    next_steps: List[str]
    source: str
    confidence: str = Field(..., description="high, medium, or low")
    human_referral: bool
    follow_up_expected: bool
    suggested_input_chips: List[str]