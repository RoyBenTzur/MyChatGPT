import { useState, useEffect } from "react";
import { Conversation } from "../../Models/Conversation";
import { conversationService } from "../../Services/conversationService";
import ConversationItem from "../ConversationItem/ConversationItem";
import "./Sidebar.css";

interface SidebarProps {
    currentConversationId: number | null;
    onSelectConversation: (id: number) => void;
    onNewChat: () => void;
    refreshKey: number;  // increment to trigger a re-fetch
}

function Sidebar({
    currentConversationId,
    onSelectConversation,
    onNewChat,
    refreshKey,
}: SidebarProps) {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    // Reload the list whenever a conversation is added or refreshKey changes:
    useEffect(() => {
        const loadConversations = async (): Promise<void> => {
            try {
                const data = await conversationService.getAllConversations();
                setConversations(data);
            } catch (err) {
                console.error("Failed to load conversations:", err);
            }
        };
        loadConversations();
    }, [refreshKey]);

    // Remove from list and clear chat if the active conversation was deleted:
    const handleDelete = async (id: number): Promise<void> => {
        try {
            await conversationService.deleteConversation(id);
            setConversations((prev) => prev.filter((c) => c.id !== id));
            if (currentConversationId === id) {
                onNewChat();  // Clear main chat area.
            }
        } catch (err) {
            console.error("Failed to delete conversation:", err);
        }
    };

    return (
        <div className="sidebar">
            <button className="new-chat-btn" onClick={onNewChat}>
                + New Chat
            </button>
            <div className="conversations-list">
                {conversations.map((c) => (
                    <ConversationItem
                        key={c.id}
                        conversation={c}
                        isSelected={c.id === currentConversationId}
                        onSelect={onSelectConversation}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
