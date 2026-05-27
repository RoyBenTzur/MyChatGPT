from sqlalchemy.orm import Session
from typing import List, Optional
from models.conversation_model import ConversationModel
from models.message_model import MessageModel


class ConversationService:
    # Ctor:
    def __init__(self, db: Session) -> None:
        self.db = db

    # Get all conversations ordered newest first:
    def get_all_conversations(self) -> List[ConversationModel]:
        return (
            self.db.query(ConversationModel)
            .order_by(ConversationModel.created_at.desc())
            .all()
        )

    # Get a single conversation by its ID:
    def get_one_conversation(self, id: int) -> Optional[ConversationModel]:
        return (
            self.db.query(ConversationModel)
            .filter(ConversationModel.id == id)
            .first()
        )

    # Get all messages for a conversation in chronological order:
    def get_conversation_messages(self, conversation_id: int) -> List[MessageModel]:
        return (
            self.db.query(MessageModel)
            .filter(MessageModel.conversation_id == conversation_id)
            .order_by(MessageModel.created_at.asc())
            .all()
        )

    # Create a new conversation with the given title:
    def create_conversation(self, title: str) -> ConversationModel:
        conversation = ConversationModel(title=title[:40])  # Truncate to ~40 chars.
        self.db.add(conversation)
        self.db.commit()  # Save in DB.
        self.db.refresh(conversation)  # Refresh conversation with DB values.
        return conversation

    # Add a message (user or assistant) to a conversation:
    def add_message(self, conversation_id: int, role: str, content: str) -> MessageModel:
        message = MessageModel(
            conversation_id=conversation_id,
            role=role,
            content=content,
        )
        self.db.add(message)
        self.db.commit()  # Save in DB.
        self.db.refresh(message)  # Refresh message with DB values.
        return message

    # Delete a conversation and cascade-delete its messages:
    def delete_conversation(self, id: int) -> bool:
        conversation = self.get_one_conversation(id)
        if not conversation:
            return False  # Not found.
        self.db.delete(conversation)
        self.db.commit()  # Save in DB.
        return True
