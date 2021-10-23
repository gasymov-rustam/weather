import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import './Header.css'

export default function Header() {
  const [{citiesWeather}] = useData();
  console.log(citiesWeather);
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to={`/city/${citiesWeather.length !== 0 ? citiesWeather[0].name : 'Kiev'}`}>City</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/blabla">404</Link>
        </nav>
      </div>
    </header>
  );
}
