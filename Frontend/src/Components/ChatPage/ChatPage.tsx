import { useState, useEffect, useRef } from "react";
import { DisplayMessage, Message } from "../../Models/Message";
import { conversationService } from "../../Services/conversationService";
import { chatService } from "../../Services/chatService";
import MessageBubble from "../MessageBubble/MessageBubble";
import ThinkingIndicator from "../ThinkingIndicator/ThinkingIndicator";
import "./ChatPage.css";

interface ChatPageProps {
    currentConversationId: number | null;
    onConversationCreated: () => void;    // notify parent to refresh sidebar
    onConversationIdChange: (id: number) => void;
}

function ChatPage({
    currentConversationId,
    onConversationCreated,
    onConversationIdChange,
}: ChatPageProps) {
    const [messages, setMessages] = useState<DisplayMessage[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load messages when user selects a conversation from the sidebar:
    useEffect(() => {
        const loadMessages = async (): Promise<void> => {
            try {
                const data: Message[] = await conversationService.getConversationMessages(
                    currentConversationId!
                );
                const display: DisplayMessage[] = data.map((m) => ({
                    id: m.id,
                    role: m.role,
                    content: m.content,
                }));
                setMessages(display);
            } catch (err) {
                console.error("Failed to load messages:", err);
            }
        };

        if (currentConversationId !== null) {
            loadMessages();
        } else {
            setMessages([]);
            setInput("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            textareaRef.current?.focus();
        }
    }, [currentConversationId]);

    // Focus the textarea on initial page load:
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // Keep the view scrolled to the latest message:
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Auto-resize textarea as the user types:
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    // Send on Enter (Shift+Enter inserts a newline):
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Send the user's message and display the reply:
    const handleSend = async (): Promise<void> => {
        const text = input.trim();
        if (!text || isLoading) return;

        // Immediately show the user message and an animated thinking bubble:
        const userMsg: DisplayMessage = {
            id: Date.now(),
            role: "user",
            content: text,
        };
        setMessages((prev) => [
            ...prev,
            userMsg,
            { id: "thinking", role: "assistant", content: "", isThinking: true },
        ]);

        setInput("");
        // Reset textarea height after clearing:
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(currentConversationId, text);

            // Replace thinking bubble with the real reply:
            setMessages((prev) => [
                ...prev.filter((m) => m.id !== "thinking"),
                { id: Date.now() + 1, role: "assistant", content: response.reply },
            ]);

            // If this was a brand-new conversation, update the parent state:
            if (currentConversationId === null) {
                onConversationIdChange(response.conversationId);
                onConversationCreated();  // Refresh sidebar list.
            }
        } catch (err) {
            // Remove thinking bubble on error so the UI doesn't hang:
            setMessages((prev) => prev.filter((m) => m.id !== "thinking"));
            console.error("Failed to send message:", err);
        } finally {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    };

    return (
        <div className="chat-page">
            <div className="messages-container">
                {messages.length === 0 && (
                    <div className="empty-chat">
                        <h2>How can I <span className="accent-word">help</span> you today?</h2>
                        <p>Ask me anything — I remember our conversation.</p>
                    </div>
                )}
                {messages.map((m) =>
                    m.isThinking ? (
                        <ThinkingIndicator key={m.id} />
                    ) : (
                        <MessageBubble key={m.id} message={m} />
                    )
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <div className="input-wrapper">
                    <textarea
                        ref={textareaRef}
                        className="chat-input"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Message MyChatGPT…"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        title="Send message"
                    >
                        ↑
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
