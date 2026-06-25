# MyChatGPT

A full-stack ChatGPT clone with persistent conversations, context-aware AI replies, and a modern dark-themed UI.

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
