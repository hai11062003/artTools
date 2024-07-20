import { Link } from "react-router-dom";
import "./Header.scss";
function Header() {
  return (
    <header className="header">
      <nav className="header_nav">
        <ul>
          <Link to="/">
            <li>Home </li>
          </Link>
          <Link to="/arttools">
            <li>Art Tools </li>
          </Link>
          <Link to="/contact">
            <li>Contact </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
