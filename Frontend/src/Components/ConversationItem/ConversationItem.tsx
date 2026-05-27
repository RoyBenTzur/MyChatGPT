import { Conversation } from "../../Models/Conversation";
import "./ConversationItem.css";

interface ConversationItemProps {
    conversation: Conversation;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

function ConversationItem({
    conversation,
    isSelected,
    onSelect,
    onDelete,
}: ConversationItemProps) {
    // Prevent click from bubbling up to the select handler:
    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        onDelete(conversation.id);
    };

    return (
        <div
            className={`conversation-item ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(conversation.id)}
        >
            <span className="conversation-title">{conversation.title}</span>
            <button
                className="delete-btn"
                onClick={handleDeleteClick}
                title="Delete conversation"
            >
                🗑️
            </button>
        </div>
    );
}

export default ConversationItem;
