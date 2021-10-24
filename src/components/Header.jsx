import { Link } from "react-router-dom";
import { useData } from "../hooks/useData";
import { useHistory } from "react-router";
import CN from "classnames";
import "./Header.css";

export default function Header() {
  const [{ citiesWeather }] = useData();
  const history = useHistory();
  // console.log("/" == history.location.pathname);
  console.log(history);
  // console.log(citiesWeather);
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className={CN("links", { activeLink: "/" === history.location?.pathname })}>Home</Link>
          <Link
            to="/search"
            className={CN("links", { activeLink: "/search" === history.location?.pathname })}
          >{console.log(history.location.pathname)}
            Search
          </Link>
          <Link
            to={`/city/${citiesWeather.length !== 0 ? citiesWeather[0].name : "Kiev"}`}
            className={CN("links", {
              activeLink:
                `/city/${citiesWeather.length !== 0 ? citiesWeather[0].name : "Kiev"}` ===
                history.location?.pathname,
            })}
          >
            City
          </Link>
          <Link to="/settings" className={CN("links", { activeLink: "/settings" === history.location?.pathname })}>{console.log(history.location.pathname)}Settings</Link>
          <Link to="/blabla">404</Link>
        </nav>
      </div>
    </header>
  );
}
