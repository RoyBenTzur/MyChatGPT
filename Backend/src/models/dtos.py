from pydantic import BaseModel
from typing import Optional


# --- Request DTOs ---

class ChatRequest(BaseModel):
    conversationId: Optional[int] = None  # null means start a new conversation.
    message: str


# --- Response DTOs ---

class ChatResponse(BaseModel):
    conversationId: int
    reply: str


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: str


class MessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: str
