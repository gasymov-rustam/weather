import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <NavLink exact to="/" className="links">Home</NavLink>
          <NavLink exact to="/search" className="links">
            Search
          </NavLink>
          {/* <NavLink exact to={`/city/Kyiv`} className="links">
            City
          </NavLink>
          <NavLink to="/city/London" className="links">City london</NavLink>
          <NavLink to="/city/Odessa" className="links">City odessa</NavLink> */}
          <NavLink exact to="/settings" className="links">Settings</NavLink>
          {/* <NavLink to="/blabla" className="links">404</NavLink> */}
        </nav>
      </div>
    </header>
  );
}
