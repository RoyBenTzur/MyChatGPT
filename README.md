# MyChatGPT

MyChatGPT is a full-stack web application that replicates the core experience of ChatGPT. It lets you have real conversations with an AI, where each message is sent to OpenAI's GPT-4o-mini model and the full conversation history is included with every request, so the AI always has context of what was said before.

Every conversation is saved to a MySQL database, meaning your chat history persists between sessions. You can create new conversations, switch between them, and delete ones you no longer need, all from the sidebar.

On the technical side, the frontend is built with React and TypeScript, communicating with a Python FastAPI backend through a REST API. The backend handles all the AI logic, conversation management, and database operations using SQLAlchemy ORM.

The UI was designed with a modern dark aesthetic inspired by tools like Bolt.new. It features a deep black background with a blue ambient glow, glassmorphism effects on the navigation and sidebar, smooth animations, and a floating input card that sits centered on the screen when no conversation is active.

## GitHub Repository

https://github.com/RoyBenTzur/MyChatGPT.git

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Python + FastAPI |
| Database | MySQL with SQLAlchemy ORM |
| AI | OpenAI GPT-4o-mini |
| HTTP client | axios |
| Deployment | Docker + Docker Compose |

---

## Project Structure

```
MyChatGpt/
  docker-compose.yml       # Orchestrates all 3 services
  Backend/
    Dockerfile
    src/
      models/              # SQLAlchemy entity models + Pydantic DTOs
      services/            # ConversationService, OpenAIService
      controllers/         # FastAPI routers
      utils/               # DB engine + session factory
      config.py            # loads .env
      app.py               # entry point
    requirements.txt
    Chat API.postman_collection.json
  Frontend/
    Dockerfile
    nginx.conf             # Routes /api to backend, serves React
    src/
      Models/              # TypeScript interfaces
      Services/            # axios API clients
      Components/          # React components
      Utils/               # AppConfig (API base URL)
    package.json
```

---

## Getting Started

### Option 1 — Docker (recommended)

**Prerequisites:** Docker + Docker Compose installed

```bash
# 1. Clone the repo
git clone https://github.com/RoyBenTzur/MyChatGPT.git
cd MyChatGPT

# 2. Create a .env file at the project root:
#    OPENAI_API_KEY=your_openai_key
#    DB_PASSWORD=your_mysql_password
#    DB_NAME=chat_db

# 3. Start everything
docker-compose up -d --build
```

Open `http://localhost` in your browser. All three services (frontend, backend, database) start automatically.

---

### Option 2 — Local development

**Prerequisites:** Python 3.11+, Node.js 18+, MySQL running locally

#### Backend

```bash
cd Backend

# Create and activate a virtual environment:
python -m venv env
env\Scripts\activate          # Windows
# source env/bin/activate     # Mac / Linux

# Install dependencies:
pip install -r requirements.txt

# Create and configure .env inside Backend/:
#   OPENAI_API_KEY=your_openai_key
#   DB_HOST=localhost
#   DB_USER=root
#   DB_PASSWORD=your_mysql_password
#   DB_NAME=chat_db

# Run the server (from Backend/src/):
cd src
uvicorn app:app --reload --port 8000
```

API available at `http://localhost:8000` — interactive docs at `http://localhost:8000/docs`

#### Frontend

```bash
cd Frontend
npm install
npm start
```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/chat` | Start or continue a conversation |
| `GET` | `/api/conversations` | List all conversations (newest first) |
| `GET` | `/api/conversations/{id}/messages` | Get messages for a conversation |
| `DELETE` | `/api/conversations/{id}` | Delete a conversation (cascades) |

See `Backend/Chat API.postman_collection.json` for ready-to-import Postman tests.

---

## Developer

**Roy Ben-Tzur**  
Full Stack Developer
