import { Link, useLocation } from "react-router-dom";
import "./NavMenu.css";

function NavMenu() {
    const location = useLocation();

    return (
        <nav className="nav-menu">
            <div className="nav-brand">MyChatGPT</div>
            <div className="nav-links">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                >
                    About
                </Link>
            </div>
        </nav>
    );
}

export default NavMenu;
