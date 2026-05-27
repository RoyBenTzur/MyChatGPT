# MyChatGPT

A full-stack ChatGPT clone with persistent conversations, context-aware AI replies, and a clean dark-themed UI.

## GitHub Repository

link: https://github.com/RoyBenTzur/MyChatGPT.git

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Python + FastAPI |
| Database | MySQL with SQLAlchemy ORM |
| AI | OpenAI GPT-4o-mini |
| HTTP client | axios |

---

## Project Structure

```
MyChatGpt/
  Backend/
    src/
      models/        # SQLAlchemy entity models + Pydantic DTOs
      services/      # ConversationService, OpenAIService
      controllers/   # FastAPI routers
      utils/         # DB engine + session factory
      config.py      # loads .env
      app.py         # entry point
    requirements.txt
    .env.example
    Chat API.postman_collection.json
  Frontend/
    src/
      Models/        # TypeScript interfaces
      Services/      # axios API clients
      Components/    # React components
      Utils/         # constants
    package.json
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- MySQL running locally

### Backend

```bash
cd Backend

# Create and activate a virtual environment:
python -m venv env
env\Scripts\activate          # Windows
# source env/bin/activate     # Mac / Linux

# Install dependencies:
pip install -r requirements.txt

# Configure environment:
cp .env.example .env
# Edit .env — fill in your OpenAI key and MySQL credentials

# Run the server (from Backend/src/):
cd src
uvicorn app:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

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
