import axios from "axios";
import { Conversation } from "../Models/Conversation";
import { Message } from "../Models/Message";
import { API_BASE_URL } from "../Utils/constants";

class ConversationService {
    // Fetch all conversations ordered newest first:
    async getAllConversations(): Promise<Conversation[]> {
        const response = await axios.get<Conversation[]>(
            `${API_BASE_URL}/conversations`
        );
        return response.data;
    }

    // Fetch all messages for a given conversation:
    async getConversationMessages(id: number): Promise<Message[]> {
        const response = await axios.get<Message[]>(
            `${API_BASE_URL}/conversations/${id}/messages`
        );
        return response.data;
    }

    // Delete a conversation and its messages:
    async deleteConversation(id: number): Promise<void> {
        await axios.delete(`${API_BASE_URL}/conversations/${id}`);
    }
}

// Singleton — one instance shared across the app:
export const conversationService = new ConversationService();
