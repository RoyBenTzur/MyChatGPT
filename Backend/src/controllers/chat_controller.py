from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.dtos import ChatRequest, ChatResponse
from services.conversation_service import ConversationService
from services.openai_service import OpenAIService
from utils.database import get_db

router = APIRouter()


# Start a new conversation or continue an existing one:
@router.post("/chat", response_model=ChatResponse)
def post_chat(request: ChatRequest, db: Session = Depends(get_db)) -> ChatResponse:
    conversation_service = ConversationService(db)
    openai_service = OpenAIService()

    # Create a new conversation if no ID was provided:
    if request.conversationId is None:
        conversation = conversation_service.create_conversation(request.message)
    else:
        # Load the existing conversation:
        conversation = conversation_service.get_one_conversation(request.conversationId)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")

    # Persist the incoming user message:
    conversation_service.add_message(conversation.id, "user", request.message)

    # Load the full message history to give OpenAI proper context:
    db_messages = conversation_service.get_conversation_messages(conversation.id)
    history = [{"role": m.role, "content": m.content} for m in db_messages]

    # Call OpenAI and get the assistant reply:
    reply = openai_service.get_reply(history)

    # Persist the assistant reply:
    conversation_service.add_message(conversation.id, "assistant", reply)

    return ChatResponse(conversationId=conversation.id, reply=reply)
