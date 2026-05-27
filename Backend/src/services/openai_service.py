from openai import OpenAI
from typing import List
from config import config


class OpenAIService:
    # Ctor:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=config.openai_api_key)
        self.model = "gpt-4o-mini"

    # Send the full message history to OpenAI and return the assistant reply:
    def get_reply(self, messages: List[dict]) -> str:
        # Prepend a system prompt so the assistant has clear context:
        system = [{"role": "system", "content": "You are a helpful AI assistant."}]
        response = self.client.chat.completions.create(
            model=self.model,
            messages=system + messages,  # Full history for context.
        )
        return response.choices[0].message.content  # Extract reply text.
