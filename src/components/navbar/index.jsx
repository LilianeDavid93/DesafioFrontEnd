import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  //const { user } = useParams();
  return (
    <nav className="navbar">
      <h1>Bem vindo</h1>
      <ul className="list">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
