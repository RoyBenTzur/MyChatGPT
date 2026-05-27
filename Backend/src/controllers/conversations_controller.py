from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.dtos import ConversationResponse, MessageResponse
from services.conversation_service import ConversationService
from utils.database import get_db

router = APIRouter()


# Get all conversations ordered newest first (sidebar list):
@router.get("/conversations", response_model=List[ConversationResponse])
def get_conversations(db: Session = Depends(get_db)) -> List[ConversationResponse]:
    service = ConversationService(db)
    conversations = service.get_all_conversations()
    return [
        ConversationResponse(
            id=c.id,
            title=c.title,
            created_at=str(c.created_at),
        )
        for c in conversations
    ]


# Get all messages for a specific conversation:
@router.get("/conversations/{id}/messages", response_model=List[MessageResponse])
def get_messages(id: int, db: Session = Depends(get_db)) -> List[MessageResponse]:
    service = ConversationService(db)
    messages = service.get_conversation_messages(id)
    return [
        MessageResponse(
            id=m.id,
            role=m.role,
            content=m.content,
            created_at=str(m.created_at),
        )
        for m in messages
    ]


# Delete a conversation and cascade-delete its messages:
@router.delete("/conversations/{id}")
def delete_conversation(id: int, db: Session = Depends(get_db)) -> dict:
    service = ConversationService(db)
    success = service.delete_conversation(id)
    if not success:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"message": "Conversation deleted successfully"}
