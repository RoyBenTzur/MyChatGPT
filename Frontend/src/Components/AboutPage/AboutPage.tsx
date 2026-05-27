import "./AboutPage.css";

function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-content">
                <h1>About MyChatGPT</h1>

                <section className="about-section">
                    <h2>The System</h2>
                    <p>
                        MyChatGPT is a full-stack ChatGPT clone that delivers
                        context-aware AI conversations stored persistently in a
                        relational database.
                    </p>
                    <ul>
                        <li>
                            <strong>Frontend:</strong> React + TypeScript + Vite
                        </li>
                        <li>
                            <strong>Backend:</strong> Python + FastAPI (REST API)
                        </li>
                        <li>
                            <strong>Database:</strong> MySQL with SQLAlchemy ORM
                        </li>
                        <li>
                            <strong>AI Model:</strong> OpenAI GPT-4o-mini
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Key Features</h2>
                    <ul>
                        <li>
                            Context-aware replies — the server sends the full
                            conversation history to OpenAI on every message
                        </li>
                        <li>
                            Persistent storage — every conversation and message is
                            saved to MySQL
                        </li>
                        <li>
                            Thinking indicator — animated bubble while waiting for
                            the AI reply
                        </li>
                        <li>
                            Sidebar navigation — browse, load, and delete past
                            conversations
                        </li>
                        <li>
                            Secure — the OpenAI API key never leaves the server
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>The Developer</h2>
                    <p>
                        <strong>Roy Ben-Tzur</strong>
                    </p>
                    <p>
                        Full Stack Developer passionate about building intelligent
                        applications that combine powerful AI models with clean,
                        intuitive user experiences.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default AboutPage;
