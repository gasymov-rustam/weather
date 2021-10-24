import { NavLink } from "react-router-dom";
import { useData } from "../hooks/useData";
import "./Header.css";

export default function Header() {
  const [{ citiesWeather }] = useData();
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <NavLink exact to="/" className="links">Home</NavLink>
          <NavLink exact to="/search" className="links">
            Search
          </NavLink>
          <NavLink exact to={`/city/${citiesWeather.length !== 0 ? citiesWeather[0].name : "Kiev"}`} className="links">
            City
          </NavLink>
          <NavLink exact to="/settings" className="links">Settings</NavLink>
          <NavLink to="/blabla" className="links">404</NavLink>
        </nav>
      </div>
    </header>
  );
}
