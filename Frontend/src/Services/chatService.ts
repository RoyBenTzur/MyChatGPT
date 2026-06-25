import axios from "axios";
import { API_BASE_URL } from "../Utils/AppConfig";

// Request shape for POST /api/chat:
interface ChatRequest {
    conversationId: number | null;
    message: string;
}

// Response shape from POST /api/chat:
export interface ChatResponse {
    conversationId: number;
    reply: string;
}

class ChatService {
    // Send a user message and receive the AI reply:
    async sendMessage(
        conversationId: number | null,
        message: string
    ): Promise<ChatResponse> {
        const body: ChatRequest = { conversationId, message };
        const response = await axios.post<ChatResponse>(
            `${API_BASE_URL}/chat`,
            body
        );
        return response.data;
    }
}

// Singleton — one instance shared across the app:
export const chatService = new ChatService();
