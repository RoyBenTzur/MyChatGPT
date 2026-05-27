import "./ThinkingIndicator.css";

// Animated "..." bubble shown on the assistant side while waiting for a reply:
function ThinkingIndicator() {
    return (
        <div className="thinking-wrapper">
            <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default ThinkingIndicator;
