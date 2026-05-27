import { DisplayMessage } from "../../Models/Message";
import "./MessageBubble.css";

interface MessageBubbleProps {
    message: DisplayMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
    return (
        <div className={`message-bubble ${message.role}`}>
            <div className="bubble-content">{message.content}</div>
        </div>
    );
}

export default MessageBubble;
