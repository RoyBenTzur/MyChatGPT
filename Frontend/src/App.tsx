import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavMenu from "./Components/NavMenu/NavMenu";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatPage from "./Components/ChatPage/ChatPage";
import AboutPage from "./Components/AboutPage/AboutPage";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import "./App.css";

function App() {
    const location = useLocation();

    // Update the browser tab title on every navigation:
    useEffect(() => {
        const titles: Record<string, string> = {
            "/":      "MyChatGPT",
            "/about": "About — MyChatGPT",
        };
        document.title = titles[location.pathname] ?? "MyChatGPT";
    }, [location.pathname]);

    // ID of the conversation currently open in the main view (null = new chat):
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
    // Incrementing this number tells Sidebar to re-fetch the conversation list:
    const [sidebarRefreshKey, setSidebarRefreshKey] = useState<number>(0);

    // Called by ChatPage after the first message of a new conversation is sent:
    const handleConversationCreated = (): void => {
        setSidebarRefreshKey((prev) => prev + 1);
    };

    // Called by Sidebar's "New Chat" button:
    const handleNewChat = (): void => {
        setCurrentConversationId(null);
    };

    return (
        <div className="app">
            <NavMenu />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="main-layout">
                                <Sidebar
                                    currentConversationId={currentConversationId}
                                    onSelectConversation={setCurrentConversationId}
                                    onNewChat={handleNewChat}
                                    refreshKey={sidebarRefreshKey}
                                />
                                <ChatPage
                                    currentConversationId={currentConversationId}
                                    onConversationCreated={handleConversationCreated}
                                    onConversationIdChange={setCurrentConversationId}
                                />
                            </div>
                        }
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
