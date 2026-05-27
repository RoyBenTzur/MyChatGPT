from contextlib import asynccontextmanager
from typing import AsyncGenerator
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import config
from utils.database import create_database, engine, Base
from controllers.chat_controller import router as chat_router
from controllers.conversations_controller import router as conversations_router

# Import models so SQLAlchemy registers them with Base.metadata:
from models.conversation_model import ConversationModel  # noqa: F401
from models.message_model import MessageModel  # noqa: F401


# Lifespan: runs startup logic before the server accepts requests:
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Create DB schema and tables if they don't exist yet:
    create_database()
    Base.metadata.create_all(bind=engine)  # Idempotent — safe to call every startup.
    yield
    # (No teardown needed.)


# Create the FastAPI application:
app = FastAPI(title="MyChatGPT API", lifespan=lifespan)

# Allow requests from the Vite dev server:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers under the /api prefix:
app.include_router(chat_router, prefix="/api")
app.include_router(conversations_router, prefix="/api")


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=config.port, reload=True)
