import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <h1 className="not-found-code">404</h1>
            <p className="not-found-message">Page not found.</p>
            <button className="not-found-btn" onClick={() => navigate("/")}>
                Back to Chat
            </button>
        </div>
    );
}

export default NotFoundPage;
