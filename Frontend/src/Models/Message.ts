// Mirrors the MessageResponse DTO from the backend:
export interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    created_at: string;
}

// Used for local display state — includes the thinking indicator:
export interface DisplayMessage {
    id: number | string;      // string only for the "thinking" placeholder
    role: "user" | "assistant";
    content: string;
    isThinking?: boolean;     // true only for the animated thinking bubble
}
